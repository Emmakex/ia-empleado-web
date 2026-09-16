import type { Locale } from "./i18n";

export const BOOKING_TIME_ZONE = "Europe/Madrid";
export const BOOKING_WINDOW_DAYS = 90;
export const BOOKING_SLOT_TIMES = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
] as const;

export type BookingSlotTime = (typeof BOOKING_SLOT_TIMES)[number];

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function dateKeyInMadrid(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: BOOKING_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) throw new Error("booking_date_format_failed");
  return `${year}-${month}-${day}`;
}

function parseDateKey(value: string): Date | undefined {
  if (!DATE_PATTERN.test(value)) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  if (
    parsed.getUTCFullYear() !== year
    || parsed.getUTCMonth() !== month - 1
    || parsed.getUTCDate() !== day
  ) {
    return undefined;
  }
  return parsed;
}

function addDaysToDateKey(dateKey: string, days: number): string {
  const parsed = parseDateKey(dateKey);
  if (!parsed) throw new Error("booking_date_key_invalid");
  parsed.setUTCDate(parsed.getUTCDate() + days);
  return parsed.toISOString().slice(0, 10);
}

export function getBookingDateBounds(now = new Date()) {
  const today = dateKeyInMadrid(now);
  return {
    min: addDaysToDateKey(today, 1),
    max: addDaysToDateKey(today, BOOKING_WINDOW_DAYS),
  };
}

export function isBookingDateAllowed(value: string, now = new Date()): boolean {
  const parsed = parseDateKey(value);
  if (!parsed) return false;

  const { min, max } = getBookingDateBounds(now);
  if (value < min || value > max) return false;

  const weekday = parsed.getUTCDay();
  return weekday !== 0 && weekday !== 6;
}

export function isBookingSlotTime(value: string): value is BookingSlotTime {
  return (BOOKING_SLOT_TIMES as readonly string[]).includes(value);
}

export function formatBookingPreference(
  locale: Locale,
  date: string,
  time: string,
): string {
  const parsed = parseDateKey(date);
  if (!parsed) return `${date} · ${time} · ${BOOKING_TIME_ZONE}`;

  const formattedDate = new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);

  return `${formattedDate} · ${time} · ${BOOKING_TIME_ZONE}`;
}
