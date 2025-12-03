import { create } from "zustand";

interface FiltersState {
  brand: string[];
  model: string[];
  year: string[];
  price: number[];

  sorting: string[];

  setBrand: (brand: string[]) => void;
  setModel: (model: string[]) => void;
  setYear: (year: string[]) => void;
  setPrice: (price: number[]) => void;

  setSorting: (sorting: string[]) => void;

  toggleFilter: (
    filterType: keyof Omit<
      FiltersState,
      "setBrand" | "setModel" | "setYear" | "setPrice" | "setSorting"
    >,
    value: string | number
  ) => void;
  clearFilter: (
    filterType: keyof Omit<
      FiltersState,
      "setBrand" | "setModel" | "setYear" | "setPrice" | "setSorting"
    >
  ) => void;
  clearAll: () => void;
}

const useSortingAndFilteringStore = create<FiltersState>()((set, get) => ({
  brand: [],
  model: [],
  year: [],
  price: [0, 0],

  sorting: [],

  setYear: (year) => set({ year }),
  setPrice: (price) => set({ price }),
  setBrand: (brand) => set({ brand }),
  setModel: (model) => set({ model }),

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
      model: [],
      sorting: [],
    }),
}));

export default useSortingAndFilteringStore;
