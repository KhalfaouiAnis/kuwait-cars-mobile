import {
  CAR_COLORS,
  CAR_CYLENDERS,
  FUEL_TYPE_OPTIONS,
  PURE_PROVINCES,
  TRANSMISSION_OPTIONS,
  YEARS,
  YES_NO_OPTIONS,
} from "../constants";
import { SelectAdapters } from "../utils/select-adapters";

export type FilterField =
  | "brand"
  | "model"
  | "year"
  | "fuel_type"
  | "cylinders"
  | "transmission"
  | "under_warranty"
  | "province"
  | "exterior_color"
  | "mileage"
  | "price";

export type AdTypeField =
  | "used_cars"
  | "motorcycles"
  | "classic_cars"
  | "damaged_cars"
  | "parts_accessories"
  | "common";

export const AD_FILTER_CONFIG: Record<string, FilterField[]> = {
  used_cars: [
    "brand",
    "model",
    "year",
    "price",
    "province",
    "cylinders",
    "exterior_color",
    "under_warranty",
    "transmission",
    "mileage",
    "fuel_type",
  ],
  motorcycles: ["brand", "price", "year", "province"],
  classic_cars: ["price", "province"],
  parts_accessories: ["province", "brand"],
  damaged_cars: ["province", "brand"],
  common: ["province"],
};

export enum FilterComponentType {
  SELECT = "select",
  RANGE = "range",
}

export enum FilterUIStrategy {
  DROPDOWN = "dropdown", // Near the button
  MODAL_CENTER = "modal_center", // Top middle/Special
}

export const AD_FILTER_OPTIONS_CONFIG: Record<
  AdTypeField,
  Partial<Record<FilterField, any>>
> = {
  used_cars: {
    brand: {
      options: YEARS,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    model: {
      options: YEARS,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    year: {
      options: YEARS,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    price: {
      strategy: FilterUIStrategy.MODAL_CENTER,
      min: 0,
      max: 1000000,
    },
    province: {
      options: PURE_PROVINCES,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromObject("province"),
    },
    cylinders: {
      options: CAR_CYLENDERS,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    exterior_color: {
      options: CAR_COLORS,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    under_warranty: {
      options: YES_NO_OPTIONS,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    transmission: {
      options: TRANSMISSION_OPTIONS,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    fuel_type: {
      options: FUEL_TYPE_OPTIONS,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    mileage: {
      strategy: FilterUIStrategy.MODAL_CENTER,
      min: 0,
      max: 1000000,
    },
  },
  motorcycles: {
    year: {
      options: YEARS,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    province: {
      options: PURE_PROVINCES,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromObject("province"),
    },
  },
  classic_cars: {
    province: {
      options: PURE_PROVINCES,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromObject("province"),
    },
  },
  damaged_cars: {
    province: {
      options: PURE_PROVINCES,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromObject("province"),
    },
  },
  parts_accessories: {
    province: {
      options: PURE_PROVINCES,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromObject("province"),
    },
  },
  common: {
    province: {
      options: PURE_PROVINCES,
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromObject("province"),
    },
  },
};
