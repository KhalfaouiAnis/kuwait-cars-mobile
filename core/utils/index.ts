import { useMemo } from "react";

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(20).substring(2, 9)}`;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const flattenToModels = (data: any) => {
  const seenValues = new Set();
  const result = [];
  return data.regions.flatMap((region: any) =>
    region.brands.flatMap((brand: any) => {
      return brand.models.map((model: any) => ({
        id: `${region.value} ${brand.value}_${model.value}`,
        label: model.label,
        value: model.value,
        regionId: region.label,
      }));
      // if (!seenValues.has(brand.label)) {
      // seenValues.add(brand.label);
      // result.push(
      //   brand.models.map((model: any) => ({
      //     id: `${region.value} ${brand.value}_${model.value}`,
      //     label: model.label,
      //     value: model.value,
      //     regionId: region.label,
      //   }))
      // );
      // }
    }),
  );
};

export const flattenToBrands = (data: any) => {
  return data.regions.flatMap((region: any) =>
    region.brands.flatMap((brand: any) => ({
      id: `${region.label}_${brand.value}`,
      label: brand.label,
      value: brand.value,
      regionId: region.label,
    })),
  );
};

export const useFlattenModels = (data: any) => {
  return useMemo(() => {
    return data.regions.flatMap((region: any) =>
      region.brands.flatMap((brand: any) => {
        return brand.models.map((model: any) => ({
          id: `${region.value} ${brand.value}_${model.value}`,
          label: model.label,
          value: model.value,
          regionId: region.label,
        }));
      }),
    );
  }, [data?.regions]);
};

export const useFlattenBrands = (data: any) => {
  return useMemo(() => {
    return data.regions.flatMap((region: any) =>
      region.brands.flatMap((brand: any) => ({
        id: `${region.label}_${brand.value}`,
        label: brand.label,
        value: brand.value,
        regionId: region.label,
      })),
    );
  }, [data?.regions]);
};

export const formatViews = (views: string | number) => {
  const num = typeof views === "string" ? parseInt(views, 10) : views;
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
};
