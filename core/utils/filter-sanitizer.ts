import { OVERALL_MAX_MILEAGE, OVERALL_MAX_PRICE } from "../constants";
import { FilterState } from "../store/search.store";

export const sanitizeFiltersForApi = (filters: FilterState) => {
  const sanitized: Record<string, any> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (key === "q" || key === "region") return;

    if (Array.isArray(value) && !["price", "mileage"].includes(key)) {
      if (value.length > 0) sanitized[key] = value;
      return;
    }

    if (key === "price") {
      const [min, max] = value as [number, number];
      if (min !== 0 || max !== OVERALL_MAX_PRICE) {
        sanitized[key] = value;
      }
      return;
    }

    if (key === "mileage") {
      const [min, max] = value as [number, number];
      if (min !== 0 || max !== OVERALL_MAX_MILEAGE) {
        sanitized[key] = value;
      }
      return;
    }

    if (value !== null && value !== "") {
      sanitized[key] = value;
    }
  });

  return sanitized;
};
