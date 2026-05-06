export const defaultSchedule = [
  {
    id: "thu-pickup",
    day: "Thu",
    place: "Pickup ordering",
    address: "5 Auchly Lane, Saint Peters, MO 63376",
    time: "10:30 AM-7:30 PM",
    note: "Clover pickup",
  },
  {
    id: "fri-pickup",
    day: "Fri",
    place: "Pickup ordering",
    address: "5 Auchly Lane, Saint Peters, MO 63376",
    time: "10:30 AM-7:30 PM",
    note: "Clover pickup",
  },
  {
    id: "sat-pickup",
    day: "Sat",
    place: "Pickup ordering",
    address: "5 Auchly Lane, Saint Peters, MO 63376",
    time: "10:30 AM-7:30 PM",
    note: "Clover pickup",
  },
  {
    id: "online-clover",
    day: "Online",
    place: "Clover checkout",
    address: "Pickup only. Delivery and curbside are currently disabled in Clover.",
    time: "10 min lead",
    note: "Online ordering",
  },
];

const weekdayMap = {
  mon: { label: "Mon", index: 1 },
  monday: { label: "Mon", index: 1 },
  tue: { label: "Tue", index: 2 },
  tues: { label: "Tue", index: 2 },
  tuesday: { label: "Tue", index: 2 },
  wed: { label: "Wed", index: 3 },
  weds: { label: "Wed", index: 3 },
  wednesday: { label: "Wed", index: 3 },
  thu: { label: "Thu", index: 4 },
  thur: { label: "Thu", index: 4 },
  thurs: { label: "Thu", index: 4 },
  thursday: { label: "Thu", index: 4 },
  fri: { label: "Fri", index: 5 },
  friday: { label: "Fri", index: 5 },
  sat: { label: "Sat", index: 6 },
  saturday: { label: "Sat", index: 6 },
  sun: { label: "Sun", index: 0 },
  sunday: { label: "Sun", index: 0 },
};

const dayPattern = Object.keys(weekdayMap)
  .sort((a, b) => b.length - a.length)
  .join("|");

const dayRegex = new RegExp(`\\b(${dayPattern})\\b`, "i");
const timeRegex =
  /(\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)?)\s*(?:-|to|until|through)\s*(\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)?)/i;

function getNextDateForWeekday(weekdayIndex, baseDate = new Date()) {
  const date = new Date(baseDate);
  const daysUntil = (weekdayIndex - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + daysUntil);
  return date.toISOString().slice(0, 10);
}

function getSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 34);
}

function formatTimeToken(value) {
  const compact = value
    .replace(/\s+/g, "")
    .replace(/\./g, "")
    .replace(/am$/i, " AM")
    .replace(/pm$/i, " PM");

  return compact.replace(/^(\d{1,2})(AM|PM)$/i, "$1 $2").toUpperCase();
}

function formatTimeRange(match) {
  if (!match) {
    return "Time TBD";
  }

  return `${formatTimeToken(match[1])}-${formatTimeToken(match[2])}`;
}

function splitNaturalLanguageStops(text) {
  const normalized = text
    .replace(/\r/g, "\n")
    .replace(/[•*]/g, "\n")
    .replace(/;/g, "\n")
    .replace(new RegExp(`\\b(${dayPattern})\\b`, "gi"), "\n$1");

  return normalized
    .split(/\n+/)
    .map((segment) => segment.trim())
    .filter((segment) => dayRegex.test(segment));
}

function extractPlace(segment, dayWord, timeMatch) {
  let working = segment
    .replace(new RegExp(`\\b${dayWord}\\b`, "i"), "")
    .replace(timeMatch?.[0] || "", "")
    .replace(/\b(we'?ll be|we will be|will be|this week|on|from|at)\b/gi, " ")
    .replace(/\s+/g, " ")
    .replace(/^[,.:/-]+|[,.:/-]+$/g, "")
    .trim();

  let address = "";
  const addressMatch = working.match(/\baddress\s*[:/-]\s*(.+)$/i);

  if (addressMatch) {
    address = addressMatch[1].trim();
    working = working.replace(addressMatch[0], "").trim();
  }

  const separatorMatch = working.match(/^(.+?)\s+-\s+(.+)$/);

  if (separatorMatch && /\d|\b(MO|IL|STL|Saint|St\.?)\b/i.test(separatorMatch[2])) {
    working = separatorMatch[1].trim();
    address = separatorMatch[2].trim();
  }

  return {
    place: working || "Location TBD",
    address: address || "Address TBD",
  };
}

export function sanitizeSchedule(schedule = []) {
  return schedule
    .map((stop, index) => ({
      id: stop.id || `stop-${index + 1}`,
      day: stop.day || "Day TBD",
      date: stop.date || "",
      place: stop.place || "Location TBD",
      address: stop.address || "Address TBD",
      time: stop.time || "Time TBD",
      note: stop.note || "",
    }))
    .filter((stop) => stop.place.trim() || stop.address.trim());
}

export function parseScheduleText(text, baseDate = new Date()) {
  const segments = splitNaturalLanguageStops(text);

  if (!segments.length) {
    return [
      {
        id: "needs-review",
        day: "Review",
        date: "",
        place: "Could not find a weekday",
        address: "Try including a day, place, and time.",
        time: "Needs review",
        note: "AI/admin review needed",
      },
    ];
  }

  return segments.map((segment, index) => {
    const dayMatch = segment.match(dayRegex);
    const dayKey = dayMatch?.[1]?.toLowerCase() || "";
    const dayInfo = weekdayMap[dayKey] || { label: "Day TBD", index: baseDate.getDay() };
    const timeMatch = segment.match(timeRegex);
    const { place, address } = extractPlace(segment, dayMatch?.[1] || "", timeMatch);
    const date = dayInfo.label === "Day TBD" ? "" : getNextDateForWeekday(dayInfo.index, baseDate);
    const noteParts = [];

    if (!timeMatch) {
      noteParts.push("Confirm time");
    }

    if (address === "Address TBD") {
      noteParts.push("Confirm address");
    }

    return {
      id: `${dayInfo.label.toLowerCase()}-${getSlug(place) || "stop"}-${index + 1}`,
      day: dayInfo.label,
      date,
      place,
      address,
      time: formatTimeRange(timeMatch),
      note: noteParts.join(" / "),
    };
  });
}
