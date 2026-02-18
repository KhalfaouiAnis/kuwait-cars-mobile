import { GlobalSelectOption } from "../types";

export const SelectAdapters = {
  fromPrimitive: {
    map: (item: any): GlobalSelectOption => ({
      id: item.id,
      label: item.label,
      value: item.value,
    }),
    isSelected: (currentValue: any, itemValue: any) =>
      currentValue === itemValue,
    getLabel: (currentValue: any) => currentValue?.toString(),
  },
  fromObject: (key: string) => ({
    map: (item: any): GlobalSelectOption => ({
      id: item[key],
      label: item[key],
      value: item,
    }),
    isSelected: (currentValue: any, itemValue: any) =>
      currentValue?.[key] === itemValue?.[key],
    getLabel: (currentValue: any) => currentValue?.[key],
  }),
};
