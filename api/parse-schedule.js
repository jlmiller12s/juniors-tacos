import { parseScheduleText, sanitizeSchedule } from "../src/scheduleTools.js";

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

async function parseWithWebhook(text) {
  const webhookUrl = process.env.SCHEDULE_AI_WEBHOOK_URL;

  if (!webhookUrl) {
    return null;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      schema: {
        schedule: [
          {
            day: "Tue",
            date: "YYYY-MM-DD",
            place: "Location name",
            address: "Street address or Address TBD",
            time: "11 AM-2 PM",
            note: "Optional note",
          },
        ],
      },
    }),
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  const schedule = Array.isArray(payload) ? payload : payload.schedule;

  return Array.isArray(schedule) ? sanitizeSchedule(schedule) : null;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = parseJsonBody(req.body);
  const text = String(body.text || "").trim();

  if (!text) {
    res.status(400).json({ error: "Schedule text is required" });
    return;
  }

  try {
    const aiSchedule = await parseWithWebhook(text);

    if (aiSchedule?.length) {
      res.status(200).json({ schedule: aiSchedule, source: "ai-webhook" });
      return;
    }
  } catch (error) {
    console.warn("AI schedule webhook failed, using local parser.", error);
  }

  res.status(200).json({
    schedule: parseScheduleText(text),
    source: "local-parser",
    needsReview: true,
  });
}
