import {
  differenceInCalendarMonths,
  format,
  formatDistanceToNow,
  lastDayOfYear,
} from "date-fns";
import { ar, enUS } from "date-fns/locale";

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

const locales = { enUS, ar };

export function formatPassedTime(
  date: string | number | Date,
  targetLocale = "ar"
) {
  return formatDistanceToNow(date, {
    addSuffix: true,
    // locale: locales[targetLocale],
  });
}

export const formatSmartDate = (date: Date | string | number): string => {
  const now = new Date();
  const monthsUntilYearEnd = differenceInCalendarMonths(lastDayOfYear(now), now);
  const pattern = monthsUntilYearEnd > 4 ? "MMMM d" : "MMMM d, yyyy";

  return format(new Date(date), pattern);
};
