import { defaultSchedule, sanitizeSchedule } from "../src/scheduleTools.js";

function parseJsonBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  return body;
}

async function readScheduleFromSource() {
  const sourceUrl = process.env.SCHEDULE_SOURCE_URL;

  if (!sourceUrl) {
    return defaultSchedule;
  }

  const response = await fetch(sourceUrl, { cache: "no-store" });

  if (!response.ok) {
    return defaultSchedule;
  }

  const payload = await response.json();
  return sanitizeSchedule(Array.isArray(payload) ? payload : payload.schedule);
}

async function publishSchedule(schedule) {
  const publishUrl = process.env.SCHEDULE_PUBLISH_WEBHOOK_URL;

  if (!publishUrl) {
    return { persisted: false, reason: "Persistent schedule storage is not configured yet." };
  }

  const response = await fetch(publishUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ schedule }),
  });

  if (!response.ok) {
    return { persisted: false, reason: "Schedule storage webhook rejected the update." };
  }

  return { persisted: true };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    const schedule = await readScheduleFromSource();
    res.status(200).json({ schedule, source: process.env.SCHEDULE_SOURCE_URL ? "external-source" : "default" });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const configuredToken = process.env.SCHEDULE_ADMIN_TOKEN;
  const requestToken = req.headers["x-admin-token"];

  if (!configuredToken) {
    res.status(501).json({ error: "Schedule admin storage is not configured yet." });
    return;
  }

  if (requestToken !== configuredToken) {
    res.status(401).json({ error: "Invalid admin passcode." });
    return;
  }

  const body = parseJsonBody(req.body);
  const schedule = sanitizeSchedule(body.schedule);

  if (!schedule.length) {
    res.status(400).json({ error: "At least one schedule stop is required." });
    return;
  }

  const publishResult = await publishSchedule(schedule);

  if (!publishResult.persisted) {
    res.status(501).json({ error: publishResult.reason });
    return;
  }

  res.status(200).json({ schedule, persisted: true });
}
