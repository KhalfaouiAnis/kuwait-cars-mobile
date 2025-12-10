export const AD_TYPES = {
  used_cars: "used_cars",
  new_cars: "new_cars",
  motorcycles: "motorcycles",
  classic_cars: "classic_cars",
  show: "show",
  car_rental_agencies: "car_rental_agencies",
  spare_parts: "spare_parts",
  home_services: "home_services",
  damaged_cars: "damaged_cars",
  accessories: "accessories",
  logistics: "logistics",
  rims_and_tires: "rims_and_tires",
  repair_garages: "repair_garages",
  other: "other",
};

export const Ad_CATEGORIES = [
  "used_cars",
  "motorcycles",
  "classic_cars",
  "show",
  "car_rental_agencies",
  "spare_parts",
  "home_services",
  "damaged_cars",
  "accessories",
  "logistics",
  "rims_and_tires",
  "repair_garages",
  "other",
];

export const CAR_BRAND_TYPES = [
  {
    value: AD_TYPES.used_cars,
    label: "Used cars",
    icon: "car-sport-outline",
    regions: [
      {
        label: "Asian",
        value: "Asian",
        icon: "car-sport-outline",
        brands: [
          {
            label: "Toyota",
            value: "Toyota",
            icon: "car-sport-outline",
            marks: [
              {
                label: "Toyota - Land Cruiser",
                icon: "car-sport-outline",
                value: "Toyota/Land Cruiser",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: AD_TYPES.motorcycles,
    label: "Motorcycles",
    icon: "car-sport-outline",
    categories: [
      {
        value: "Sports motorcycles",
        label: "Sports motorcycles",
        brands: [
          {
            label: "Toyota",
            value: "Toyota",
            marks: [{ label: "Toyota", value: "Sports motorcycles/Toyota" }],
          },
          {
            label: "BMW",
            marks: [{ label: "BMW", value: "Sports motorcycles/BMW" }],
          },
        ],
      },
      {
        value: "Quad bikes",
        label: "Quad bikes",
        brands: [
          {
            label: "Quad",
            marks: [{ label: "Quad", value: "Quad bikes/Quad" }],
          },
        ],
      },
      {
        value: "Bicycles",
        label: "Bicycles",
        brands: [
          {
            label: "Bicycle",
            marks: [{ label: "Bicycle", value: "Bicycles/Bicycle" }],
          },
        ],
      },
      {
        value: "Scooter",
        label: "Scooter",
        brands: [
          {
            label: "Scooter",
            marks: [{ label: "Scooter", value: "Scooter/Scooter" }],
          },
        ],
      },
    ],
  },
  {
    value: AD_TYPES.classic_cars,
    icon: "car-sport-outline",
    label: "Classic cars",
  },
  {
    value: AD_TYPES.show,
    icon: "car-sport-outline",
    label: "Show car",
  },
  {
    value: AD_TYPES.car_rental_agencies,
    icon: "car-sport-outline",
    label: "Car rental agencies",
  },
  {
    value: AD_TYPES.spare_parts,
    label: "Part car",
    icon: "car-sport-outline",
    regions: [
      {
        value: "Asian",
        label: "Part car - Asian",
      },
      {
        value: "American",
        label: "Part car - American",
      },
      {
        value: "European",
        label: "Part car - European",
      },
      {
        value: "Chinese",
        label: "Part car - Chinese",
      },
    ],
  },
  {
    value: AD_TYPES.home_services,
    icon: "car-sport-outline",
    label: "Home Services for car",
    categories: [
      {
        value: "Washing and polishing",
        icon: "car-sport-outline",
        label: "Washing and polishing",
      },
      {
        value: "Protection and shading",
        icon: "car-sport-outline",
        label: "Protection and shading",
      },
      {
        value: "Tire repair, batteries",
        icon: "car-sport-outline",
        label: "Tire repair, batteries",
      },
      {
        value: "Check, oil, filter",
        icon: "car-sport-outline",
        label: "Check, oil, filter",
      },
      {
        value: "Keys and remote",
        icon: "car-sport-outline",
        label: "Keys and remote",
      },
      {
        value: "Insurance",
        icon: "car-sport-outline",
        label: "Insurance",
      },
      {
        value: "Other",
        icon: "car-sport-outline",
        label: "Other",
      },
    ],
  },
  {
    value: AD_TYPES.damaged_cars,
    icon: "car-sport-outline",
    label: "Damaged cars",
  },
  {
    value: AD_TYPES.accessories,
    icon: "car-sport-outline",
    label: "Accessories",
  },
  {
    value: AD_TYPES.logistics,
    icon: "car-sport-outline",
    label: "Winch + External Charging",
  },
  {
    value: AD_TYPES.rims_and_tires,
    icon: "car-sport-outline",
    label: "Rim and tires",
  },
  {
    value: AD_TYPES.repair_garages,
    icon: "car-sport-outline",
    label: "Repair garages",
  },
  {
    value: AD_TYPES.other,
    icon: "car-sport-outline",
    label: "Other",
  },
];
