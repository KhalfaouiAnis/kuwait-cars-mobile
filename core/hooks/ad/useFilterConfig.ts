import {
  BASIC_PROVINCES,
  CAR_COLORS,
  CAR_CYLENDERS,
  TRANSMISSION_OPTIONS,
  YEARS,
} from "@/core/constants";
import { CAR_BRAND_TYPES } from "@/core/constants/ad";
import { FilterOption } from "@/core/types";
import { useFlattenBrands, useFlattenModels } from "@/core/utils";

export const useUsedCarsFilterConfig = () => {
  return {
    brand: {
      title: "brand",
      showSearch: true,
      parentKey: "region",
      showRegionHelper: true,
      options: useFlattenBrands(CAR_BRAND_TYPES[0]),
    },
    model: {
      title: "model",
      parentKey: null,
      showSearch: true,
      showRegionHelper: false,
      options: useFlattenModels(CAR_BRAND_TYPES[0]),
    },
    year: {
      title: "year",
      parentKey: null,
      showSearch: true,
      showRegionHelper: false,
      options: YEARS as FilterOption[],
    },
    cylinders: {
      parentKey: null,
      showSearch: false,
      title: "cylinders",
      showRegionHelper: false,
      options: CAR_CYLENDERS as FilterOption[],
    },
    transmission: {
      parentKey: null,
      showSearch: false,
      title: "transmission",
      showRegionHelper: false,
      options: TRANSMISSION_OPTIONS as FilterOption[],
    },
    location: {
      parentKey: null,
      showSearch: false,
      title: "location",
      showRegionHelper: false,
      options: BASIC_PROVINCES as FilterOption[],
    },
  } as const;
};

export const useMotorcyclesFilterConfig = () => {
  return {
    brand: {
      title: "brand",
      parentKey: "region",
      showRegionHelper: true,
      showSearch: true,
      options: useFlattenBrands(CAR_BRAND_TYPES[1]),
    },
    year: {
      title: "year",
      parentKey: null,
      showRegionHelper: false,
      showSearch: true,
      options: YEARS as FilterOption[],
    },
    exterior_color: {
      title: "color",
      showRegionHelper: false,
      showSearch: true,
      parentKey: null,
      options: CAR_COLORS as FilterOption[],
    },
  } as const;
};
