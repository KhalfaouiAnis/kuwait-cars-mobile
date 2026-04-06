import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  OVERALL_MAX_MILEAGE,
  OVERALL_MAX_PRICE,
  OVERALL_MIN_MILEAGE,
  OVERALL_MIN_PRICE,
} from "../constants";
import { zustandStorage } from "./storage";

export type MultiFilterKeys =
  | "region"
  | "brand"
  | "model"
  | "year"
  | "cylinders"
  | "transmission"
  | "province"
  | "fuel_type"
  | "under_warranty"
  | "exterior_color";
export type SingleFilterKeys = "ad_type" | "ad_category" | "mileage" | "price";

export type SortingItem = {
  field: "created_at" | "price";
  direction: "asc" | "desc";
};

export type CombinedFilterKeys = MultiFilterKeys & SingleFilterKeys;

export interface FilterState {
  ad_type?: string | null;
  ad_category?: string | null;
  brand?: string[];
  model?: string[];
  year?: string[];
  fuel_type?: string[];
  cylinders?: string[];
  province?: string[];
  under_warranty?: string[];
  transmission?: string[];
  price?: [number, number];
  mileage?: [number, number];
  exterior_color?: string[];

  q: string;
  region?: string[];

  sorting: SortingItem;
}

const initialFilters: FilterState = {
  ad_category: null,
  ad_type: null,
  brand: [],
  model: [],
  year: [],
  exterior_color: [],
  transmission: [],
  cylinders: [],
  fuel_type: [],
  province: [],
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
    direction: "asc" | "desc",
  ) => void;
  setExternalFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  toggleDraftMultiFilter: (key: MultiFilterKeys, value: string) => void;
  setDraftFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  resetDraftFilter: (key: keyof FilterState) => void;

  syncDraftToApplied: () => void;
  applyFilters: (source?: "advanced_search") => void;

  clearHistory: () => void;
  setHasHydrated: () => void;
  resetAll: () => void;
}

interface SearchStore extends SearchActions {
  lastAdvancedSearch: Partial<FilterState> | null;
  appliedFilters: FilterState;
  draftFilters: FilterState;
  hasHydrated: boolean;
}

const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      appliedFilters: { ...initialFilters },
      draftFilters: { ...initialFilters },
      lastAdvancedSearch: { ad_type: "other" },
      hasHydrated: false,
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
          return {
            draftFilters: {
              ...state.draftFilters,
              [key]: value,
            },
          };
        }),

      resetDraftFilter: (key) =>
        set((state) => ({
          draftFilters: { ...state.draftFilters, [key]: initialFilters[key] },
        })),

      syncDraftToApplied: () =>
        set((state) => ({
          draftFilters: { ...state.appliedFilters },
        })),

      applyFilters: (source) =>
        set((state) => {
          const newApplied = state.draftFilters;
          const historyUpdate =
            source === "advanced_search"
              ? {
                  lastAdvancedSearch: newApplied,
                }
              : {};
          return {
            appliedFilters: state.draftFilters,
            ...historyUpdate,
          };
        }),
      clearHistory: () => set({ lastAdvancedSearch: null }),
      resetAll: () =>
        set({
          appliedFilters: { ...initialFilters },
          draftFilters: { ...initialFilters },
        }),
      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "advanced-search-history",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        lastAdvancedSearch: state.lastAdvancedSearch,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
      merge: (persistedState, currentState) => {
        if (
          !persistedState ||
          !(persistedState as SearchStore).lastAdvancedSearch
        ) {
          return currentState;
        }
        return { ...currentState, ...persistedState };
      },
    },
  ),
);

export const searchStore = useSearchStore;

export default useSearchStore;
