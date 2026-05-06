import postgres from "postgres";
import { defaultSchedule, sanitizeSchedule } from "../src/scheduleTools.js";

const tableName = "schedule_stops";

function getDatabaseUrl() {
  return (
    process.env.SUPABASE_POSTGRES_URL ||
    process.env.SUPABASE_POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    ""
  );
}

function getSupabaseRestConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "";

  return { key, url };
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

function mapScheduleRows(rows) {
  return sanitizeSchedule(
    rows.map((row) => ({
      id: row.id,
      day: row.day,
      date: row.date || "",
      place: row.place,
      address: row.address,
      time: row.time,
      note: row.note || "",
    })),
  );
}

async function readScheduleFromPostgres(sql) {
  const rows = await sql`
    select
      id,
      day,
      to_char(date, 'YYYY-MM-DD') as date,
      place,
      address,
      time,
      note
    from public.schedule_stops
    order by sort_order asc, day asc, time asc
  `;

  return mapScheduleRows(rows);
}

async function readScheduleFromRest() {
  const { key, url } = getSupabaseRestConfig();

  if (!key || !url) {
    return null;
  }

  const response = await fetch(
    `${url.replace(/\/$/, "")}/rest/v1/${tableName}?select=id,day,date,place,address,time,note&order=sort_order.asc`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  return mapScheduleRows(await response.json());
}

async function readScheduleFromSource() {
  const sql = createSqlClient();

  if (sql) {
    try {
      const schedule = await readScheduleFromPostgres(sql);
      await sql.end({ timeout: 1 });
      return { schedule: schedule.length ? schedule : defaultSchedule, source: "supabase-postgres" };
    } catch (error) {
      console.warn("Supabase Postgres schedule read failed.", error);
      await sql.end({ timeout: 1 });
    }
  }

  const restSchedule = await readScheduleFromRest();

  if (restSchedule?.length) {
    return { schedule: restSchedule, source: "supabase-rest" };
  }

  return { schedule: defaultSchedule, source: "default" };
}

async function publishSchedule(schedule) {
  const sql = createSqlClient();

  if (!sql) {
    return { persisted: false, reason: "Supabase Postgres environment variables are not connected yet." };
  }

  try {
    await sql.begin(async (transaction) => {
      await transaction`delete from public.schedule_stops`;

      for (const [index, stop] of schedule.entries()) {
        await transaction`
          insert into public.schedule_stops
            (id, day, date, place, address, time, note, sort_order, updated_at)
          values
            (
              ${stop.id},
              ${stop.day},
              ${stop.date || null},
              ${stop.place},
              ${stop.address},
              ${stop.time},
              ${stop.note || null},
              ${index + 1},
              now()
            )
        `;
      }
    });

    await sql.end({ timeout: 1 });
    return { persisted: true };
  } catch (error) {
    console.warn("Supabase Postgres schedule publish failed.", error);
    await sql.end({ timeout: 1 });
    return { persisted: false, reason: "Supabase rejected the schedule update." };
  }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    const { schedule, source } = await readScheduleFromSource();
    res.status(200).json({ schedule, source });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const configuredToken = process.env.SCHEDULE_ADMIN_TOKEN;
  const requestToken = req.headers["x-admin-token"];

  if (!configuredToken) {
    res.status(501).json({ error: "Add SCHEDULE_ADMIN_TOKEN in Vercel before shared publishing." });
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
