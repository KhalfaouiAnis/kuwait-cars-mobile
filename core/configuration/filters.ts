import {
  BASIC_PROVINCES,
  CAR_COLORS,
  CAR_CYLENDERS,
  FUEL_TYPE_OPTIONS,
  REGIONS,
  TRANSMISSION_OPTIONS,
  YEARS,
  YES_NO_OPTIONS,
} from "../constants";
import { SelectAdapters } from "../utils/select-adapters";

export type FilterField =
  | "brand"
  | "region"
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

export enum FilterUIStrategy {
  PRICE = "PRICE",
  MILEAGE = "MILEAGE",
  DROPDOWN = "DROPDOWN",
}

export const AD_FILTER_OPTIONS_CONFIG: Record<
  AdTypeField,
  Partial<Record<FilterField, any>>
> = {
  used_cars: {
    region: {
      options: REGIONS,
      family: "Ionicons",
      icon: "car-sport-outline",
      label: "advancedSearch.brand_model",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    model: {
      options: REGIONS,
      family: "Ionicons",
      icon: "car-sport-outline",
      label: "advancedSearch.model",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    year: {
      options: YEARS,
      family: "Ionicons",
      icon: "calendar-outline",
      label: "advancedSearch.year",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    price: {
      min: 0,
      max: 1000000,
      family: "AntDesign",
      icon: "dollar",
      label: "advancedSearch.budget",
      strategy: FilterUIStrategy.PRICE,
    },
    province: {
      family: "Ionicons",
      options: BASIC_PROVINCES,
      icon: "location-outline",
      label: "advancedSearch.location",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    cylinders: {
      family: "Ionicons",
      options: CAR_CYLENDERS,
      icon: "car-sport-outline",
      label: "advancedSearch.cylinders",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    exterior_color: {
      family: "Ionicons",
      options: CAR_COLORS,
      label: "advancedSearch.color",
      icon: "color-palette-outline",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    under_warranty: {
      family: "Ionicons",
      options: YES_NO_OPTIONS,
      icon: "car-sport-outline",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
      label: "advancedSearch.under_warranty",
    },
    transmission: {
      icon: "control",
      family: "AntDesign",
      options: TRANSMISSION_OPTIONS,
      label: "advancedSearch.transmission",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    fuel_type: {
      options: FUEL_TYPE_OPTIONS,
      icon: "gas-station-outline",
      label: "advancedSearch.fuel_type",
      family: "MaterialCommunityIcons",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    mileage: {
      min: 0,
      max: 1000000,
      icon: "signal-distance-variant",
      family: "MaterialCommunityIcons",
      label: "advancedSearch.kms_driven",
      strategy: FilterUIStrategy.MILEAGE,
    },
  },
  motorcycles: {
    region: {
      options: REGIONS,
      family: "Ionicons",
      icon: "car-sport-outline",
      label: "advancedSearch.brand_model",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    year: {
      options: YEARS,
      family: "Ionicons",
      icon: "calendar-outline",
      label: "advancedSearch.year",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    price: {
      min: 0,
      max: 1000000,
      icon: "dollar",
      family: "AntDesign",
      label: "advancedSearch.budget",
      strategy: FilterUIStrategy.PRICE,
    },
    province: {
      family: "Ionicons",
      icon: "location-outline",
      options: BASIC_PROVINCES,
      label: "advancedSearch.location",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
  },
  classic_cars: {
    province: {
      family: "Ionicons",
      icon: "location-outline",
      options: BASIC_PROVINCES,
      label: "advancedSearch.location",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    price: {
      min: 0,
      max: 1000000,
      icon: "dollar",
      family: "AntDesign",
      label: "advancedSearch.budget",
      strategy: FilterUIStrategy.PRICE,
    },
  },
  damaged_cars: {
    province: {
      family: "Ionicons",
      icon: "location-outline",
      options: BASIC_PROVINCES,
      label: "advancedSearch.location",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    region: {
      options: REGIONS,
      family: "Ionicons",
      icon: "car-sport-outline",
      label: "advancedSearch.brand_model",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
  },
  parts_accessories: {
    province: {
      family: "Ionicons",
      options: BASIC_PROVINCES,
      icon: "location-outline",
      label: "advancedSearch.location",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
    region: {
      options: REGIONS,
      family: "Ionicons",
      icon: "car-sport-outline",
      label: "advancedSearch.brand_model",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
  },
  common: {
    province: {
      family: "Ionicons",
      icon: "location-outline",
      options: BASIC_PROVINCES,
      label: "advancedSearch.location",
      strategy: FilterUIStrategy.DROPDOWN,
      adapter: SelectAdapters.fromPrimitive,
    },
  },
};
