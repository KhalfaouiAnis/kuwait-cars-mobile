import { create } from "zustand";
import {
  OVERALL_MAX_MILEAGE,
  OVERALL_MAX_PRICE,
  OVERALL_MIN_MILEAGE,
  OVERALL_MIN_PRICE,
} from "../constants";

export type MultiFilterKeys =
  | "region"
  | "brand"
  | "model"
  | "year"
  | "exterior_color";
export type SingleFilterKeys = "ad_type" | "ad_category" | "mileage" | "price";

export type SortingItem = {
  field: "created_at" | "price";
  direction: "asc" | "desc";
};

export type CombinedFilterKeys = MultiFilterKeys & SingleFilterKeys;

const FILTER_DEPENDENCIES: Record<string, string[]> = {
  brand: [],
  model: [],
};

export interface FilterState {
  ad_type?: string | null;
  ad_category?: string | null;
  brand?: string[];
  model?: string[];
  year?: string[];
  exterior_color?: string[];
  mileage?: [number, number];
  price?: [number, number];

  q: string;
  region?: string[];

  sorting: SortingItem;
}

const initialFilters: FilterState = {
  ad_type: null,
  ad_category: null,
  brand: [],
  model: [],
  year: [],
  exterior_color: [],
  mileage: [OVERALL_MIN_MILEAGE, OVERALL_MAX_MILEAGE],
  price: [OVERALL_MIN_PRICE, OVERALL_MAX_PRICE],
  sorting: {
    field: "created_at",
    direction: "desc",
  },
  q: "",
  region: [],
};

interface SearchActions {
  setSorting: (
    field: "price" | "created_at",
    direction: "asc" | "desc"
  ) => void;
  setExternalFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
  toggleDraftMultiFilter: (key: MultiFilterKeys, value: string) => void;
  setDraftFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
  resetDraftFilter: (key: keyof FilterState) => void;

  syncDraftToApplied: () => void; // Call when opening modal
  applyFilters: () => void; // Call on "Apply" button

  resetAll: () => void;
}

interface SearchStore extends SearchActions {
  appliedFilters: FilterState;
  draftFilters: FilterState;
}

const useSearchStore = create<SearchStore>()((set) => ({
  appliedFilters: { ...initialFilters },
  draftFilters: { ...initialFilters },
  setSorting: (field, direction) =>
    set((state) => ({
      ...state,
      appliedFilters: {
        ...state.appliedFilters,
        sorting: { direction, field },
      },
    })),
  setExternalFilter: (key, value) =>
    set((state) => ({
      appliedFilters: { ...state.appliedFilters, [key]: value },
      draftFilters: { ...state.draftFilters, [key]: value },
    })),
  toggleDraftMultiFilter: (key, value) =>
    set((state) => {
      const current = state.draftFilters[key] as string[];

      const updated = current.includes(value)
        ? current.filter((val) => val !== value)
        : [...current, value];

      // const dependents = FILTER_DEPENDENCIES[key] || [];
      // const clearedDependents = dependents.reduce(
      //   (acc, depKey) => ({
      //     ...acc,
      //     [depKey]: initialFilters[depKey as keyof FilterState],
      //   }),
      //   {}
      // );

      return {
        draftFilters: {
          ...state.draftFilters,
          [key]: updated,
          // ...clearedDependents,
        },
      };
    }),

  setDraftFilter: (key, value) =>
    set((state) => {
      // const dependents = FILTER_DEPENDENCIES[key] || [];
      // const clearedDependents = dependents.reduce(
      //   (acc, depKey) => ({
      //     ...acc,
      //     [depKey]: initialFilters[depKey as keyof FilterState],
      //   }),
      //   {}
      // );
      return {
        draftFilters: {
          ...state.draftFilters,
          [key]: value,
          // ...clearedDependents,
        },
      };
    }),

  resetDraftFilter: (key) =>
    set((state) => ({
      draftFilters: { ...state.draftFilters, [key]: initialFilters[key] },
    })),

  // --- Lifecycle Actions ---

  // 1. When user opens a modal: Prepare draft to match what is currently active
  syncDraftToApplied: () =>
    set((state) => ({
      draftFilters: { ...state.appliedFilters },
    })),

  // 2. When user hits "Apply": Push drafts to the source of truth (Triggers API)
  applyFilters: () =>
    set((state) => ({
      appliedFilters: { ...state.draftFilters },
    })),

  // 3. Complete Reset
  resetAll: () =>
    set({
      appliedFilters: { ...initialFilters },
      draftFilters: { ...initialFilters },
    }),
}));

export default useSearchStore;
