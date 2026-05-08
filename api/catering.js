import postgres from "postgres";

function getDatabaseUrl() {
  return (
    process.env.SUPABASE_POSTGRES_URL ||
    process.env.SUPABASE_POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    ""
  );
}

function createSqlClient() {
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    return null;
  }

  return postgres(databaseUrl, {
    idle_timeout: 5,
    max: 1,
    prepare: false,
  });
}

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

function normalizeRequest(body) {
  return {
    eventType: String(body.eventType || "").trim(),
    name: String(body.name || "").trim(),
    phone: String(body.phone || "").trim(),
    email: String(body.email || "").trim(),
    date: String(body.date || "").trim(),
    time: String(body.time || "").trim(),
    guests: String(body.guests || "").trim(),
    location: String(body.location || "").trim(),
    serviceStyle: String(body.serviceStyle || "").trim(),
    message: String(body.message || "").trim(),
  };
}

async function publishToWebhook(request) {
  const webhookUrl = process.env.CATERING_WEBHOOK_URL;

  if (!webhookUrl) {
    return false;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...request, submittedAt: new Date().toISOString() }),
  });

  return response.ok;
}

async function persistRequest(request) {
  const sql = createSqlClient();

  if (!sql) {
    return false;
  }

  try {
    await sql`
      create table if not exists public.catering_requests (
        id bigserial primary key,
        event_type text not null,
        name text not null,
        phone text not null,
        email text,
        event_date date,
        event_time text,
        guests text,
        location text,
        service_style text,
        message text,
        submitted_at timestamptz not null default now()
      )
    `;

    await sql`
      insert into public.catering_requests (
        event_type,
        name,
        phone,
        email,
        event_date,
        event_time,
        guests,
        location,
        service_style,
        message
      )
      values (
        ${request.eventType},
        ${request.name},
        ${request.phone},
        ${request.email || null},
        ${request.date || null},
        ${request.time || null},
        ${request.guests || null},
        ${request.location || null},
        ${request.serviceStyle || null},
        ${request.message || null}
      )
    `;

    await sql.end({ timeout: 1 });
    return true;
  } catch (error) {
    console.warn("Catering request persistence failed.", error);
    await sql.end({ timeout: 1 });
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const request = normalizeRequest(parseJsonBody(req.body));

  if (!request.name || !request.phone || !request.eventType) {
    res.status(400).json({ error: "Name, phone, and event type are required." });
    return;
  }

  const webhookPublished = await publishToWebhook(request).catch(() => false);
  const persisted = webhookPublished || (await persistRequest(request));

  res.status(202).json({
    persisted,
    source: webhookPublished ? "webhook" : persisted ? "database" : "client-fallback",
  });
}
