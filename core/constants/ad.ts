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
    id: AD_TYPES.used_cars,
    value: AD_TYPES.used_cars,
    label: "Used cars",
    icon: "car-sport",
    regions: [
      {
        label: "Asian",
        value: "Asian",
        brands: [
          {
            label: "Toyota",
            value: "Toyota",
            marks: [
              {
                label: "Toyota - Land Cruiser",
                value: "Toyota / Land Cruiser",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: AD_TYPES.motorcycles,
    value: AD_TYPES.motorcycles,
    label: "Motorcycles",
    regions: [
      {
        value: "Sports motorcycles",
        label: "Sports motorcycles",
        brands: [
          {
            label: "Toyota",
            marks: [{ label: "Toyota", value: "Toyota" }],
          },
          {
            label: "BMW",
            marks: [{ label: "BMW", value: "BMW" }],
          },
        ],
      },
      {
        value: "Quad bikes",
        label: "Quad bikes",
        brands: [
          {
            label: "Quad",
            marks: [{ label: "Quad", value: "Quad" }],
          },
        ],
      },
      {
        value: "Bicycles",
        label: "Bicycles",
        brands: [
          {
            label: "Bicycle",
            marks: [{ label: "Bicycle", value: "Bicycle" }],
          },
        ],
      },
      {
        value: "Scooter",
        label: "Scooter",
        brands: [
          {
            label: "Scooter",
            marks: [{ label: "Scooter", value: "Scooter" }],
          },
        ],
      },
    ],
  },
  {
    value: AD_TYPES.classic_cars,
    label: "Classic cars",
  },
  {
    value: AD_TYPES.show,
    label: "Show car",
  },
  {
    value: AD_TYPES.car_rental_agencies,
    label: "Car rental agencies",
  },
  {
    id: AD_TYPES.spare_parts,
    value: AD_TYPES.spare_parts,
    label: "Part car",
    regions: [
      {
        value: "Asian",
        label: "Asian",
      },
      {
        value: "American",
        label: "American",
      },
      {
        value: "European",
        label: "European",
      },
      {
        value: "Chinese",
        label: "Chinese",
      },
    ],
  },
  {
    value: AD_TYPES.home_services,
    label: "Home Services for car",
  },
  {
    value: AD_TYPES.damaged_cars,
    label: "Damaged cars",
  },
  {
    value: AD_TYPES.accessories,
    label: "Accessories",
  },
  {
    value: AD_TYPES.logistics,
    label: "Winch + External Charging",
  },
  {
    value: AD_TYPES.rims_and_tires,
    label: "Rim and tires",
  },
  {
    value: AD_TYPES.repair_garages,
    label: "Repair garages",
  },
  {
    value: AD_TYPES.other,
    label: "Other",
  },
];
