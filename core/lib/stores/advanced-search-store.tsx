import { create } from "zustand";

interface AdvancedSearchState {
    ad_type: string;
    brand: string;
    model: string;
    year: string;
    price: number[];
    mileage: string;
    color: string;

    setFilterValue: (
        filterName: keyof Pick<
            AdvancedSearchState,
            "ad_type" | "brand" | "model" | "year" | "price" | "mileage" | "color"
        >,
        value: string | number[]
    ) => void;

    clearAll: () => void;
}

const useAdvancedSearchStore = create<AdvancedSearchState>()((set) => ({
    ad_type: "used_cars",
    brand: "",
    model: "",
    year: "",
    price: [0, 0],
    mileage: "",
    color: "",

    setFilterValue: (filterName, value) => {
        set({ [filterName]: value });
    },

    clearAll: () =>
        set({
            year: "",
            price: [],
            brand: "",
            model: "",
            ad_type: "used_cars",
            color: "",
            mileage: ""
        }),
}));

export default useAdvancedSearchStore;
