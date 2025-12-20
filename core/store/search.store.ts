import { create } from "zustand";

interface SearchState {
  filters: {
    ad_type?: string;
    ad_category?: string;
    brand?: string[];
    model?: string[];
    year?: string[];
    price?: number[];
    mileage?: string;
    color?: string[];
  };
  sorting: {
    field: "price" | "created_at";
    direction: "asc" | "desc";
  };
  setFilters: (filters: Partial<SearchState["filters"]>) => void;
  setSorting: (
    field: "price" | "created_at",
    direction: "asc" | "desc"
  ) => void;
  resetAll: () => void;
}

const useSearchStore = create<SearchState>()((set) => ({
  filters: {},
  sorting: { field: "created_at", direction: "desc" },
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  setSorting: (field, direction) => set({ sorting: { field, direction } }),
  resetAll: () =>
    set({ filters: {}, sorting: { field: "created_at", direction: "desc" } }),
}));

export default useSearchStore;
