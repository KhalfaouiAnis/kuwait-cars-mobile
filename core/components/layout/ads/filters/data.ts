import { FilterState } from "@/core/store/search.store";

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  parentId?: string;
  regionId?: string;
}

export type FilterConfigItem = {
  title: string;
  options: FilterOption[];
  parentKey: keyof FilterState | null;
  showRegionHelper: boolean;
  showSearch: boolean;
};

export const FILTER_CONFIG: Record<string, FilterConfigItem> = {
  brand: {
    title: "Brand",
    // parentKey: "region" as keyof FilterState,
    parentKey: null,
    showRegionHelper: true,
    showSearch: true,
    options: [
      { id: "Toyota", label: "Toyota", value: "Toyota", regionId: "Asian" },
      { id: "BMW", label: "BMW", value: "BMW", regionId: "European" },
    ],
  },
  model: {
    title: "Model",
    parentKey: "brand" as keyof FilterState,
    showRegionHelper: false,
    showSearch: true,
    options: [
      {
        id: "Toyota Yaris",
        label: "Toyota Yaris",
        value: "Toyota Yaris",
        parentId: "Toyota",
      },
      {
        id: "BMW X5",
        label: "BMW X5",
        value: "BMW X5",
        parentId: "BMW",
      },
    ],
  },
  year: {
    title: "Year",
    parentKey: "model" as keyof FilterState,
    showRegionHelper: false,
    showSearch: true,
    options: [
      { id: "None", label: "None", value: "None", parentId: "Toyota Yaris" },
    ],
  },
  exterior_color: {
    title: "Color",
    showRegionHelper: false,
    showSearch: true,
    parentKey: null,
    options: [{ id: "None", label: "None", value: "None" }],
  },
} as const;

export type FilterConfigKey = keyof typeof FILTER_CONFIG;
