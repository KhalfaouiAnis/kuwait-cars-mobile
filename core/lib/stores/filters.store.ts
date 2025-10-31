import { create } from "zustand";

interface FiltersState {
  brand: string[];
  year: string[];
  price: number[];

  sorting: string[];

  setBrand: (brand: string[]) => void;
  setYear: (year: string[]) => void;
  setPrice: (price: number[]) => void;
  setSorting: (sorting: string[]) => void;

  toggleFilter: (
    filterType: keyof Omit<
      FiltersState,
      "setSorting" | "setBrand" | "setYear" | "setPrice"
    >,
    value: string | number
  ) => void;
  clearFilter: (
    filterType: keyof Omit<
      FiltersState,
      "setSorting" | "setBrand" | "setYear" | "setPrice"
    >
  ) => void;
  clearAll: () => void;
}

const useFiltersStore = create<FiltersState>()((set, get) => ({
  brand: [],
  year: [],
  price: [],

  sorting: [],

  setYear: (year) => set({ year }),
  setPrice: (price) => set({ price }),
  setBrand: (brand) => set({ brand }),
  
  setSorting: (sorting) => set({ sorting }),

  toggleFilter: (filterType, value) => {
    const current = get()[filterType] as (string | number)[];
    const newValue = current.includes(value)
      ? current.filter((v) => v.toString() !== value.toString())
      : [...current, value];
    set({ [filterType]: newValue });
  },

  clearFilter: (filterType) => set({ [filterType]: [] }),

  clearAll: () =>
    set({
      year: [],
      price: [],
      brand: [],
    }),
}));

export default useFiltersStore;
