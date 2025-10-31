import { useMemo, useState } from "react";

const carRegions: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Asian", value: "asian" },
  { label: "American", value: "american" },
  { label: "European", value: "european" },
];

export type CarBrandType = {
  id: string;
  label: string;
  value: string;
  brand: string;
  icon: string;
};

const mockCars = [
  {
    id: "1",
    label: "Toyota Camry",
    value: "toyota-camry",
    brand: "asian",
    icon: "car-sport",
  },
  {
    id: "2",
    label: "Honda Civic",
    value: "honda-civic",
    brand: "asian",
    icon: "car-sport",
  },
  {
    id: "3",
    label: "Ford Mustang",
    value: "ford-mustang",
    brand: "american",
    icon: "car-sport",
  },
  {
    id: "4",
    label: "Tesla Model 3",
    value: "tesla-model3",
    brand: "american",
    icon: "car-sport",
  },
  {
    id: "5",
    label: "BMW X5",
    value: "bmw-x5",
    brand: "european",
    icon: "car-sport",
  },
];

export default function useBrandFilter() {
  const [selectedRegions, setselectedRegions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCars = useMemo(() => {
    let cars = mockCars;

    if (selectedRegions.length > 0 && !selectedRegions.includes("all")) {
      cars = cars.filter((car) => selectedRegions.includes(car.brand));
    }

    if (searchQuery) {
      cars = cars.filter((car) =>
        car.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return cars;
  }, [selectedRegions, searchQuery]);

  const handleToggleRegion = (region: string) => {
    if (region === "all") {
      setselectedRegions(["all"]);
    } else {
      const current = selectedRegions;
      const newRegions =
        current.includes("all") || current.includes(region)
          ? current.filter((r) => r !== "all" && r !== region)
          : [...current.filter((r) => r !== "all"), region];
      setselectedRegions(newRegions);
    }
  };

  return {
    selectedRegions,
    carRegions,
    filteredCars,
    searchQuery,
    setSearchQuery,
    handleToggleRegion,
  };
}
