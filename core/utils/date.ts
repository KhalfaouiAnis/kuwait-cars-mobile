import { formatDistanceToNow } from "date-fns";
import { ar, enUS } from "date-fns/locale";

export const generateYears = (
  startYear: number = 1980,
  endYear: number = new Date().getFullYear()
) => {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year.toString());
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
