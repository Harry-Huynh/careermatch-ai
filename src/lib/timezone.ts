import { fromZonedTime } from "date-fns-tz";

export const APP_TIME_ZONE = "America/Toronto";

function getTorontoDateParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: APP_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Unable to calculate Toronto date parts.");
  }

  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
    yearText: year,
    monthText: month,
    dayText: day,
  };
}

export function formatTorontoDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: APP_TIME_ZONE,
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatTorontoShortDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: APP_TIME_ZONE,
    month: "short",
    day: "numeric",
  }).format(date);
}

export function getTorontoDayRangeUtc(date = new Date()) {
  const { yearText, monthText, dayText } = getTorontoDateParts(date);

  const startLocal = `${yearText}-${monthText}-${dayText}T00:00:00.000`;
  const endLocal = `${yearText}-${monthText}-${dayText}T23:59:59.999`;

  return {
    startUtc: fromZonedTime(startLocal, APP_TIME_ZONE),
    endUtc: fromZonedTime(endLocal, APP_TIME_ZONE),
  };
}

export function getTorontoMonthRangeUtc(date = new Date()) {
  const { year, month } = getTorontoDateParts(date);

  const startLocal = `${year}-${String(month).padStart(2, "0")}-01T00:00:00.000`;

  const nextMonth =
    month === 12
      ? {
          year: year + 1,
          month: 1,
        }
      : {
          year,
          month: month + 1,
        };

  const endLocal = `${nextMonth.year}-${String(nextMonth.month).padStart(
    2,
    "0",
  )}-01T00:00:00.000`;

  return {
    startUtc: fromZonedTime(startLocal, APP_TIME_ZONE),
    endUtc: fromZonedTime(endLocal, APP_TIME_ZONE),
  };
}
