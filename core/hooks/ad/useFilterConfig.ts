import { CAR_COLORS, YEARS } from "@/core/constants";
import { CAR_BRAND_TYPES } from "@/core/constants/ad";
import { FilterOption } from "@/core/types";
import { useFlattenBrands, useFlattenModels } from "@/core/utils";

export const useUsedCarsFilterConfig = () => {
  return {
    brand: {
      title: "brand",
      parentKey: "region",
      showRegionHelper: true,
      showSearch: true,
      options: useFlattenBrands(CAR_BRAND_TYPES[0]),
    },
    model: {
      title: "model",
      parentKey: null,
      showRegionHelper: false,
      showSearch: true,
      options: useFlattenModels(CAR_BRAND_TYPES[0]),
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
