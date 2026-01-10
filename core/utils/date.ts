import {
  differenceInCalendarMonths,
  format,
  formatDistanceToNow,
  lastDayOfYear,
} from "date-fns";
import { ar, enUS, es, fr, hi, uz } from "date-fns/locale";
import { LanguageCode } from "../types";

export const generateYears = (
  startYear: number = 1985,
  endYear: number = new Date().getFullYear()
) => {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }
  return years;
};

const locales = { en: enUS, ar, fr, es, hi, ur: uz };

export function formatPassedTime(
  date: string | number | Date,
  targetLocale = "ar"
) {
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: locales[targetLocale as LanguageCode],
  });
}

export const formatSmartDate = (
  date: Date | string | number,
  targetLocale: LanguageCode = "ar"
): string => {
  const now = new Date();
  const monthsUntilYearEnd = differenceInCalendarMonths(
    lastDayOfYear(now),
    now
  );
  const pattern = monthsUntilYearEnd > 4 ? "MMMM d" : "MMMM d, yyyy";

  return format(new Date(date), pattern, {
    locale: locales[targetLocale],
  });
};
