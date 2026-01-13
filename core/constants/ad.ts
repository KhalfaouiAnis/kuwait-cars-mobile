import { FilterState } from "@/core/store/search.store";
import { CAR_COLORS, YEARS } from ".";
import { flattenToBrands, flattenToModels } from "../utils";

export enum SUBSCRIPTION_TYPES {
  GOLDEN = "GOLDEN",
  DIAMOND = "DIAMOND",
  RUBY = "RUBY",
}

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
  Other: "Other",
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
  "Other",
];

export const CAR_BRAND_TYPES = [
  {
    value: AD_TYPES.used_cars,
    label: AD_TYPES.used_cars,
    icon: "car-sport-outline",
    regions: [
      {
        label: "Chinese",
        value: "Chinese",
        icon: "car-sport-outline",
        brands: [
          {
            label: "Geely",
            value: "Geely",
            icon: "car-sport-outline",
            models: [
              {
                label: "GX3 Pro",
                icon: "car-sport-outline",
                value: "Geely/GX3 Pro",
              },
              {
                label: "Coolray",
                icon: "car-sport-outline",
                value: "Geely/Coolray",
              },
              {
                label: "Cityray",
                icon: "car-sport-outline",
                value: "Geely/Cityray",
              },
              {
                label: "Starray",
                icon: "car-sport-outline",
                value: "Geely/Starray",
              },
              {
                label: "Tugella",
                icon: "car-sport-outline",
                value: "Geely/Tugella",
              },
              {
                label: "Okavango",
                icon: "car-sport-outline",
                value: "Geely/Okavango",
              },
              {
                label: "Monjaro",
                icon: "car-sport-outline",
                value: "Geely/Monjaro",
              },
              {
                label: "Emgrand",
                icon: "car-sport-outline",
                value: "Geely/Emgrand",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Geely/Other",
              },
            ],
          },
          {
            label: "MG",
            value: "MG",
            icon: "car-sport-outline",
            models: [
              {
                label: "ZS",
                icon: "car-sport-outline",
                value: "MG/ZS",
              },
              {
                label: "SH",
                icon: "car-sport-outline",
                value: "MG/SH",
              },
              {
                label: "RX",
                icon: "car-sport-outline",
                value: "MG/RX",
              },
              {
                label: "MG",
                icon: "car-sport-outline",
                value: "MG/MG",
              },
              {
                label: "Electric",
                icon: "car-sport-outline",
                value: "MG/Electric",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "MG/Other",
              },
            ],
          },
          {
            label: "Haval",
            value: "Haval",
            icon: "car-sport-outline",
            models: [
              {
                label: "Jolion",
                icon: "car-sport-outline",
                value: "Haval/Jolion",
              },
              {
                label: "H",
                icon: "car-sport-outline",
                value: "Haval/H",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "MG/Other",
              },
            ],
          },
          {
            label: "Changan",
            value: "Changan",
            icon: "car-sport-outline",
            models: [
              {
                label: "Alsvin",
                icon: "car-sport-outline",
                value: "Changan/Alsvin",
              },
              {
                label: "Eado",
                icon: "car-sport-outline",
                value: "Changan/Eado",
              },
              {
                label: "CS",
                icon: "car-sport-outline",
                value: "Changan/CS",
              },
              {
                label: "UNI",
                icon: "car-sport-outline",
                value: "Changan/UNI",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Changan/Other",
              },
            ],
          },
          {
            label: "Chery",
            value: "Chery",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Chery/Other",
              },
            ],
          },
          {
            label: "Jetour",
            value: "Jetour",
            icon: "car-sport-outline",
            models: [
              {
                label: "X",
                icon: "car-sport-outline",
                value: "Jetour/X",
              },
              {
                label: "T2",
                icon: "car-sport-outline",
                value: "Jetour/T2",
              },
              {
                label: "Dashing",
                icon: "car-sport-outline",
                value: "Jetour/Dashing",
              },
              {
                label: "G700",
                icon: "car-sport-outline",
                value: "Jetour/G700",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Jetour/Other",
              },
            ],
          },
          {
            label: "BYD",
            value: "BYD",
            icon: "car-sport-outline",
            models: [
              {
                label: "Song Plus",
                icon: "car-sport-outline",
                value: "BYD/Song Plus",
              },
              {
                label: "Tang",
                icon: "car-sport-outline",
                value: "BYD/Tang",
              },
              {
                label: "Qin Plus",
                icon: "car-sport-outline",
                value: "BYD/Qin Plus",
              },
              {
                label: "Ha",
                icon: "car-sport-outline",
                value: "BYD/Ha",
              },
              {
                label: "Dolphin",
                icon: "car-sport-outline",
                value: "BYD/Dolphin",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "BYD/Other",
              },
            ],
          },
          {
            label: "Maxus",
            value: "Maxus",
            icon: "car-sport-outline",
            models: [
              {
                label: "D",
                icon: "car-sport-outline",
                value: "Maxus/D",
              },
              {
                label: "T",
                icon: "car-sport-outline",
                value: "Maxus/T",
              },
              {
                label: "G10",
                icon: "car-sport-outline",
                value: "Maxus/G10",
              },
              {
                label: "G50",
                icon: "car-sport-outline",
                value: "Maxus/G50",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Maxus/Other",
              },
            ],
          },
          {
            label: "Bestune",
            value: "Bestune",
            icon: "car-sport-outline",
            models: [
              {
                label: "T",
                icon: "car-sport-outline",
                value: "Bestune/T",
              },
              {
                label: "B70",
                icon: "car-sport-outline",
                value: "Bestune/B70",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Bestune/Other",
              },
            ],
          },
          {
            label: "BAIC",
            value: "BAIC",
            icon: "car-sport-outline",
            models: [
              {
                label: "X",
                icon: "car-sport-outline",
                value: "BAIC/X",
              },
              {
                label: "BJ",
                icon: "car-sport-outline",
                value: "BAIC/BJ",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "BAIC/Other",
              },
            ],
          },
          {
            label: "Hongqi",
            value: "Hongqi",
            icon: "car-sport-outline",
            models: [
              {
                label: "H",
                icon: "car-sport-outline",
                value: "Hongqi/H",
              },
              {
                label: "E-HS9",
                icon: "car-sport-outline",
                value: "Hongqi/E-HS9",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Hongqi/Other",
              },
            ],
          },
          {
            label: "GAC",
            value: "GAC",
            icon: "car-sport-outline",
            models: [
              {
                label: "G",
                icon: "car-sport-outline",
                value: "GAC/G",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "GAC/Other",
              },
            ],
          },
          {
            label: "JAC",
            value: "JAC",
            icon: "car-sport-outline",
            models: [
              {
                label: "SUV",
                icon: "car-sport-outline",
                value: "JAC/SUV",
              },
              {
                label: "S3",
                icon: "car-sport-outline",
                value: "JAC/S3",
              },
              {
                label: "JS",
                icon: "car-sport-outline",
                value: "JAC/JS",
              },
              {
                label: "Electric",
                icon: "car-sport-outline",
                value: "JAC/Electric",
              },
              {
                label: "Van",
                icon: "car-sport-outline",
                value: "JAC/Van",
              },
              {
                label: "M4",
                icon: "car-sport-outline",
                value: "JAC/M4",
              },
              {
                label: "Sunray",
                icon: "car-sport-outline",
                value: "JAC/Sunray",
              },
              {
                label: "T8",
                icon: "car-sport-outline",
                value: "JAC/T8",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "JAC/Other",
              },
            ],
          },
          {
            label: "Other",
            value: "Other",
            icon: "car-sport-outline",
            models: [
              {
                label: AD_TYPES.Other,
                icon: "car-sport-outline",
                value: "Other/Other",
              },
            ],
          },
        ],
      },
      {
        label: "Asian",
        value: "Asian",
        icon: "car-sport-outline",
        brands: [
          {
            label: "Toyota",
            value: "Toyota",
            icon: "car-sport-outline",
            models: [
              {
                label: "Yaris",
                icon: "car-sport-outline",
                value: "Toyota/Yaris",
              },
              {
                label: "Echo",
                icon: "car-sport-outline",
                value: "Toyota/Echo",
              },
              {
                label: "Corolla",
                icon: "car-sport-outline",
                value: "Toyota/Corolla",
              },
              {
                label: "Camry",
                icon: "car-sport-outline",
                value: "Toyota/Camry",
              },
              {
                label: "Avalon",
                icon: "car-sport-outline",
                value: "Toyota/Avalon",
              },
              {
                label: "Crown",
                icon: "car-sport-outline",
                value: "Toyota/Crown",
              },
              {
                label: "Supra",
                icon: "car-sport-outline",
                value: "Toyota/Supra",
              },
              {
                label: "Celica",
                icon: "car-sport-outline",
                value: "Toyota/Celica",
              },
              {
                label: "MR2",
                icon: "car-sport-outline",
                value: "Toyota/MR2",
              },
              {
                label: "Avensis",
                icon: "car-sport-outline",
                value: "Toyota/Avensis",
              },
              {
                label: "Prius",
                icon: "car-sport-outline",
                value: "Toyota/Prius",
              },
              {
                label: "RAV4",
                icon: "car-sport-outline",
                value: "Toyota/RAV4",
              },
              {
                label: "Fortuner",
                icon: "car-sport-outline",
                value: "Toyota/Fortuner",
              },
              {
                label: "Land Cruiser",
                icon: "car-sport-outline",
                value: "Toyota/Land Cruiser",
              },
              {
                label: "Prado",
                icon: "car-sport-outline",
                value: "Toyota/Prado",
              },
              {
                label: "Sequoia",
                icon: "car-sport-outline",
                value: "Toyota/Sequoia",
              },
              {
                label: "4Runner",
                icon: "car-sport-outline",
                value: "Toyota/4Runner",
              },
              {
                label: "Hilux",
                icon: "car-sport-outline",
                value: "Toyota/Hilux",
              },
              {
                label: "Tundra",
                icon: "car-sport-outline",
                value: "Toyota/Tundra",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Toyota/Other",
              },
            ],
          },
          {
            label: "Lexus",
            value: "Lexus",
            icon: "car-sport-outline",
            models: [
              {
                label: "IS",
                icon: "car-sport-outline",
                value: "Lexus/IS",
              },
              {
                label: "ES",
                icon: "car-sport-outline",
                value: "Lexus/ES",
              },
              {
                label: "GS",
                icon: "car-sport-outline",
                value: "Lexus/GS",
              },
              {
                label: "LS",
                icon: "car-sport-outline",
                value: "Lexus/LS",
              },
              {
                label: "UX",
                icon: "car-sport-outline",
                value: "Lexus/UX",
              },
              {
                label: "NX",
                icon: "car-sport-outline",
                value: "Lexus/NX",
              },
              {
                label: "RX",
                icon: "car-sport-outline",
                value: "Lexus/RX",
              },
              {
                label: "RZ",
                icon: "car-sport-outline",
                value: "Lexus/RZ",
              },
              {
                label: "GX",
                icon: "car-sport-outline",
                value: "Lexus/GX",
              },
              {
                label: "LX",
                icon: "car-sport-outline",
                value: "Lexus/LX",
              },
              {
                label: "RC",
                icon: "car-sport-outline",
                value: "Lexus/RC",
              },
              {
                label: "LC",
                icon: "car-sport-outline",
                value: "Lexus/LC",
              },
              {
                label: "CT",
                icon: "car-sport-outline",
                value: "Lexus/CT",
              },
              {
                label: "Lexus HS",
                icon: "car-sport-outline",
                value: "Lexus/Lexus HS",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Lexus/Other",
              },
            ],
          },
          {
            label: "Nissan",
            value: "Nissan",
            icon: "car-sport-outline",
            models: [
              {
                label: "Sunny",
                icon: "car-sport-outline",
                value: "Nissan/Sunny",
              },
              {
                label: "Tiida",
                icon: "car-sport-outline",
                value: "Nissan/Tiida",
              },
              {
                label: "Versa",
                icon: "car-sport-outline",
                value: "Nissan/Versa",
              },
              {
                label: "Sentra",
                icon: "car-sport-outline",
                value: "Nissan/Sentra",
              },
              {
                label: "Altima",
                icon: "car-sport-outline",
                value: "Nissan/Altima",
              },
              {
                label: "Maxima",
                icon: "car-sport-outline",
                value: "Nissan/Maxima",
              },
              {
                label: "Teana",
                icon: "car-sport-outline",
                value: "Nissan/Teana",
              },
              {
                label: "Cefiro",
                icon: "car-sport-outline",
                value: "Nissan/Cefiro",
              },
              {
                label: "Bluebird",
                icon: "car-sport-outline",
                value: "Nissan/Bluebird",
              },
              {
                label: "Laurel",
                icon: "car-sport-outline",
                value: "Nissan/Laurel",
              },
              {
                label: "Patrol Safari",
                icon: "car-sport-outline",
                value: "Nissan/Patrol Safari",
              },
              {
                label: "X-Trail",
                icon: "car-sport-outline",
                value: "Nissan/X-Trail",
              },
              {
                label: "Rogue",
                icon: "car-sport-outline",
                value: "Nissan/Rogue",
              },
              {
                label: "Qashqai",
                icon: "car-sport-outline",
                value: "Nissan/Qashqai",
              },
              {
                label: "Kicks",
                icon: "car-sport-outline",
                value: "Nissan/Kicks",
              },
              {
                label: "Pathfinder",
                icon: "car-sport-outline",
                value: "Nissan/Pathfinder",
              },
              {
                label: "Armada",
                icon: "car-sport-outline",
                value: "Nissan/Armada",
              },
              {
                label: "Murano",
                icon: "car-sport-outline",
                value: "Nissan/Murano",
              },
              {
                label: "Terra",
                icon: "car-sport-outline",
                value: "Nissan/Terra",
              },
              {
                label: "Navara",
                icon: "car-sport-outline",
                value: "Nissan/Navara",
              },
              {
                label: "Frontier",
                icon: "car-sport-outline",
                value: "Nissan/Frontier",
              },
              {
                label: "Titan",
                icon: "car-sport-outline",
                value: "Nissan/Titan",
              },
              {
                label: "Urvan",
                icon: "car-sport-outline",
                value: "Nissan/Urvan",
              },
              {
                label: "Quest",
                icon: "car-sport-outline",
                value: "Nissan/Quest",
              },
              {
                label: "GT",
                icon: "car-sport-outline",
                value: "Nissan/GT",
              },
              {
                label: "Z",
                icon: "car-sport-outline",
                value: "Nissan/Z",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Nissan/Other",
              },
            ],
          },
          {
            label: "Infiniti",
            value: "Infiniti",
            icon: "car-sport-outline",
            models: [
              {
                label: "G",
                icon: "car-sport-outline",
                value: "Infiniti/G",
              },
              {
                label: "Q",
                icon: "car-sport-outline",
                value: "Infiniti/Q",
              },
              {
                label: "FX",
                icon: "car-sport-outline",
                value: "Infiniti/FX",
              },
              {
                label: "QX",
                icon: "car-sport-outline",
                value: "Infiniti/QX",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Infiniti/Other",
              },
            ],
          },
          {
            label: "Honda",
            value: "Honda",
            icon: "car-sport-outline",
            models: [
              {
                label: "Civic",
                icon: "car-sport-outline",
                value: "Honda/Civic",
              },
              {
                label: "Accord",
                icon: "car-sport-outline",
                value: "Honda/Accord",
              },
              {
                label: "City",
                icon: "car-sport-outline",
                value: "Honda/City",
              },
              {
                label: "Prelude",
                icon: "car-sport-outline",
                value: "Honda/Prelude",
              },
              {
                label: "Integra",
                icon: "car-sport-outline",
                value: "Honda/Integra",
              },
              {
                label: "Legend",
                icon: "car-sport-outline",
                value: "Honda/Legend",
              },
              {
                label: "CR-V",
                icon: "car-sport-outline",
                value: "Honda/CR-V",
              },
              {
                label: "HR-V",
                icon: "car-sport-outline",
                value: "Honda/HR-V",
              },
              {
                label: "ZR-V",
                icon: "car-sport-outline",
                value: "Honda/ZR-V",
              },
              {
                label: "Pilot",
                icon: "car-sport-outline",
                value: "Honda/Pilot",
              },
              {
                label: "Passport",
                icon: "car-sport-outline",
                value: "Honda/Passport",
              },
              {
                label: "Odyssey",
                icon: "car-sport-outline",
                value: "Honda/Odyssey",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Honda/Other",
              },
            ],
          },
          {
            label: "Mazda",
            value: "Mazda",
            icon: "car-sport-outline",
            models: [
              {
                label: "Mazda 121",
                icon: "car-sport-outline",
                value: "Mazda/Mazda 121",
              },
              {
                label: "Mazda 2",
                icon: "car-sport-outline",
                value: "Mazda/Mazda 2",
              },
              {
                label: "Mazda 3",
                icon: "car-sport-outline",
                value: "Mazda/Mazda 3",
              },
              {
                label: "Mazda 6",
                icon: "car-sport-outline",
                value: "Mazda/Mazda 6",
              },
              {
                label: "Mazda 323",
                icon: "car-sport-outline",
                value: "Mazda/Mazda 323",
              },
              {
                label: "Mazda 626",
                icon: "car-sport-outline",
                value: "Mazda/Mazda 626",
              },
              {
                label: "Mazda RX",
                icon: "car-sport-outline",
                value: "Mazda/Mazda RX",
              },
              {
                label: "Mazda CX",
                icon: "car-sport-outline",
                value: "Mazda/Mazda CX",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Mazda/Other",
              },
            ],
          },
          {
            label: "Mitsubishi",
            value: "Mitsubishi",
            icon: "car-sport-outline",
            models: [
              {
                label: "Mirage",
                icon: "car-sport-outline",
                value: "Mitsubishi/Mirage",
              },
              {
                label: "Attrage",
                icon: "car-sport-outline",
                value: "Mitsubishi/Attrage",
              },
              {
                label: "Lancer",
                icon: "car-sport-outline",
                value: "Mitsubishi/Lancer",
              },
              {
                label: "Lancer EX",
                icon: "car-sport-outline",
                value: "Mitsubishi/Lancer EX",
              },
              {
                label: "Galant",
                icon: "car-sport-outline",
                value: "Mitsubishi/Galant",
              },
              {
                label: "Eclipse",
                icon: "car-sport-outline",
                value: "Mitsubishi/Eclipse",
              },
              {
                label: "Pajero",
                icon: "car-sport-outline",
                value: "Mitsubishi/Pajero",
              },
              {
                label: "Montero",
                icon: "car-sport-outline",
                value: "Mitsubishi/Montero",
              },
              {
                label: "ASX",
                icon: "car-sport-outline",
                value: "Mitsubishi/ASX",
              },
              {
                label: "Outlander",
                icon: "car-sport-outline",
                value: "Mitsubishi/Outlander",
              },
              {
                label: "Endeavor",
                icon: "car-sport-outline",
                value: "Mitsubishi/Endeavor",
              },
              {
                label: "L200",
                icon: "car-sport-outline",
                value: "Mitsubishi/L200",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Mitsubishi/Other",
              },
            ],
          },
          {
            label: "Subaru",
            value: "Subaru",
            icon: "car-sport-outline",
            models: [
              {
                label: "Impreza",
                icon: "car-sport-outline",
                value: "Subaru/Impreza",
              },
              {
                label: "Legacy",
                icon: "car-sport-outline",
                value: "Subaru/Legacy",
              },
              {
                label: "WRX",
                icon: "car-sport-outline",
                value: "Subaru/WRX",
              },
              {
                label: "WRX STI",
                icon: "car-sport-outline",
                value: "Subaru/WRX STI",
              },
              {
                label: "Forester",
                icon: "car-sport-outline",
                value: "Subaru/Forester",
              },
              {
                label: "Outback",
                icon: "car-sport-outline",
                value: "Subaru/Outback",
              },
              {
                label: "XV",
                icon: "car-sport-outline",
                value: "Subaru/XV",
              },
              {
                label: "BRZ",
                icon: "car-sport-outline",
                value: "Subaru/BRZ",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Subaru/Other",
              },
            ],
          },
          {
            label: "Suzuki",
            value: "Suzuki",
            icon: "car-sport-outline",
            models: [
              {
                label: "Alto",
                icon: "car-sport-outline",
                value: "Suzuki/Alto",
              },
              {
                label: "Swift",
                icon: "car-sport-outline",
                value: "Suzuki/Swift",
              },
              {
                label: "Dzire",
                icon: "car-sport-outline",
                value: "Suzuki/Dzire",
              },
              {
                label: "Celerio",
                icon: "car-sport-outline",
                value: "Suzuki/Celerio",
              },
              {
                label: "Baleno",
                icon: "car-sport-outline",
                value: "Suzuki/Baleno",
              },
              {
                label: "SX4",
                icon: "car-sport-outline",
                value: "Suzuki/SX4",
              },
              {
                label: "Vitara",
                icon: "car-sport-outline",
                value: "Suzuki/Vitara",
              },
              {
                label: "Grand Vitara",
                icon: "car-sport-outline",
                value: "Suzuki/Grand Vitara",
              },
              {
                label: "Jimny",
                icon: "car-sport-outline",
                value: "Suzuki/Jimny",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Suzuki/Other",
              },
            ],
          },
          {
            label: "Hyundai",
            value: "Hyundai",
            icon: "car-sport-outline",
            models: [
              {
                label: "Accent",
                icon: "car-sport-outline",
                value: "Hyundai/Accent",
              },
              {
                label: "Excel",
                icon: "car-sport-outline",
                value: "Hyundai/Excel",
              },
              {
                label: "Elantra",
                icon: "car-sport-outline",
                value: "Hyundai/Elantra",
              },
              {
                label: "Avante",
                icon: "car-sport-outline",
                value: "Hyundai/Avante",
              },
              {
                label: "Sonata",
                icon: "car-sport-outline",
                value: "Hyundai/Sonata",
              },
              {
                label: "Azera",
                icon: "car-sport-outline",
                value: "Hyundai/Azera",
              },
              {
                label: "Grandeur",
                icon: "car-sport-outline",
                value: "Hyundai/Grandeur",
              },
              {
                label: "Genesis",
                icon: "car-sport-outline",
                value: "Hyundai/Genesis",
              },
              {
                label: "Coupe",
                icon: "car-sport-outline",
                value: "Hyundai/Coupe",
              },
              {
                label: "Veloster",
                icon: "car-sport-outline",
                value: "Hyundai/Veloster",
              },
              {
                label: "Ioniq",
                icon: "car-sport-outline",
                value: "Hyundai/Ioniq",
              },
              {
                label: "Kona",
                icon: "car-sport-outline",
                value: "Hyundai/Kona",
              },
              {
                label: "Tucson",
                icon: "car-sport-outline",
                value: "Hyundai/Tucson",
              },
              {
                label: "Santae",
                icon: "car-sport-outline",
                value: "Hyundai/Santae",
              },
              {
                label: "Veracruz",
                icon: "car-sport-outline",
                value: "Hyundai/Veracruz",
              },
              {
                label: "Palisade",
                icon: "car-sport-outline",
                value: "Hyundai/Palisade",
              },
              {
                label: "Creta",
                icon: "car-sport-outline",
                value: "Hyundai/Creta",
              },
              {
                label: "Terracan",
                icon: "car-sport-outline",
                value: "Hyundai/Terracan",
              },
              {
                label: "H-1",
                icon: "car-sport-outline",
                value: "Hyundai/H-1",
              },
              {
                label: "Staria",
                icon: "car-sport-outline",
                value: "Hyundai/Staria",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Hyundai/Other",
              },
            ],
          },
          {
            label: "Kia",
            value: "Kia",
            icon: "car-sport-outline",
            models: [
              {
                label: "Picanto",
                icon: "car-sport-outline",
                value: "Kia/Picanto",
              },
              {
                label: "Pride",
                icon: "car-sport-outline",
                value: "Kia/Pride",
              },
              {
                label: "Rio",
                icon: "car-sport-outline",
                value: "Kia/Rio",
              },
              {
                label: "Cerato",
                icon: "car-sport-outline",
                value: "Kia/Cerato",
              },
              {
                label: "Forte",
                icon: "car-sport-outline",
                value: "Kia/Forte",
              },
              {
                label: "Optima",
                icon: "car-sport-outline",
                value: "Kia/Optima",
              },
              {
                label: "Cadenza",
                icon: "car-sport-outline",
                value: "Kia/Cadenza",
              },
              {
                label: "K",
                icon: "car-sport-outline",
                value: "Kia/K",
              },
              {
                label: "Stinger",
                icon: "car-sport-outline",
                value: "Kia/Stinger",
              },
              {
                label: "Soul",
                icon: "car-sport-outline",
                value: "Kia/Soul",
              },
              {
                label: "Seltos",
                icon: "car-sport-outline",
                value: "Kia/Seltos",
              },
              {
                label: "Sportage",
                icon: "car-sport-outline",
                value: "Kia/Sportage",
              },
              {
                label: "Sorento",
                icon: "car-sport-outline",
                value: "Kia/Sorento",
              },
              {
                label: "Mohave",
                icon: "car-sport-outline",
                value: "Kia/Mohave",
              },
              {
                label: "Telluride",
                icon: "car-sport-outline",
                value: "Kia/Telluride",
              },
              {
                label: "Carnival",
                icon: "car-sport-outline",
                value: "Kia/Carnival",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Kia/Other",
              },
            ],
          },
          {
            label: "Genesis",
            value: "Genesis",
            icon: "car-sport-outline",
            models: [
              {
                label: "G",
                icon: "car-sport-outline",
                value: "Genesis/G",
              },
              {
                label: "GV",
                icon: "car-sport-outline",
                value: "Genesis/GV",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Genesis/Other",
              },
            ],
          },
          {
            label: "Isuzu",
            value: "Isuzu",
            icon: "car-sport-outline",
            models: [
              {
                label: "D-Max",
                icon: "car-sport-outline",
                value: "Isuzu/D-Max",
              },
              {
                label: "MU-X",
                icon: "car-sport-outline",
                value: "Isuzu/MU-X",
              },
              {
                label: "Rodeo",
                icon: "car-sport-outline",
                value: "Isuzu/Rodeo",
              },
              {
                label: "Trooper",
                icon: "car-sport-outline",
                value: "Isuzu/Trooper",
              },
              {
                label: "NPR",
                icon: "car-sport-outline",
                value: "Isuzu/NPR",
              },
              {
                label: "NQR",
                icon: "car-sport-outline",
                value: "Isuzu/NQR",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Isuzu/Other",
              },
            ],
          },
          {
            label: "Other",
            value: "Other",
            icon: "car-sport-outline",
            models: [
              {
                label: AD_TYPES.Other,
                icon: "car-sport-outline",
                value: "Other/Other",
              },
            ],
          },
        ],
      },
      {
        label: "European",
        value: "European",
        icon: "car-sport-outline",
        brands: [
          {
            label: "Mercedes-Benz",
            value: "Mercedes-Benz",
            icon: "car-sport-outline",
            models: [
              {
                label: "190E",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/190E",
              },
              {
                label: "C-Class",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/C-Class",
              },
              {
                label: "E-Class",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/E-Class",
              },
              {
                label: "S-Class",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/S-Class",
              },
              {
                label: "CLK",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/CLK",
              },
              {
                label: "CL",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/CL",
              },
              {
                label: "CLE",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/CLE",
              },
              {
                label: "SL",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/SL",
              },
              {
                label: "SLK",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/SLK",
              },
              {
                label: "SLC",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/SLC",
              },
              {
                label: "AMG GT",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/AMG GT",
              },
              {
                label: "G-Class",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/G-Class",
              },
              {
                label: "ML",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/ML",
              },
              {
                label: "GL",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/GL",
              },
              {
                label: "R-Class",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/R-Class",
              },
              {
                label: "V-Class",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/V-Class",
              },
              {
                label: "Viano",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/Viano",
              },
              {
                label: "Sprinter",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/Sprinter",
              },
              {
                label: "EQ",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/EQ",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Mercedes-Benz/Other",
              },
            ],
          },
          {
            label: "BMW",
            value: "BMW",
            icon: "car-sport-outline",
            models: [
              {
                label: "3 Series",
                icon: "car-sport-outline",
                value: "BMW/3 Series",
              },
              {
                label: "5 Series",
                icon: "car-sport-outline",
                value: "BMW/5 Series",
              },
              {
                label: "7 Series",
                icon: "car-sport-outline",
                value: "BMW/7 Series",
              },
              {
                label: "8 Series",
                icon: "car-sport-outline",
                value: "BMW/8 Series",
              },
              {
                label: "1 Series",
                icon: "car-sport-outline",
                value: "BMW/1 Series",
              },
              {
                label: "2 Series",
                icon: "car-sport-outline",
                value: "BMW/2 Series",
              },
              {
                label: "4 Series",
                icon: "car-sport-outline",
                value: "BMW/4 Series",
              },
              {
                label: "6 Series",
                icon: "car-sport-outline",
                value: "BMW/6 Series",
              },
              {
                label: "Z",
                icon: "car-sport-outline",
                value: "BMW/Z",
              },
              {
                label: "X",
                icon: "car-sport-outline",
                value: "BMW/X",
              },
              {
                label: "I3",
                icon: "car-sport-outline",
                value: "BMW/I3",
              },
              {
                label: "I4",
                icon: "car-sport-outline",
                value: "BMW/I4",
              },
              {
                label: "I5",
                icon: "car-sport-outline",
                value: "BMW/I5",
              },
              {
                label: "I7",
                icon: "car-sport-outline",
                value: "BMW/I7",
              },
              {
                label: "I8",
                icon: "car-sport-outline",
                value: "BMW/I8",
              },
              {
                label: "IX",
                icon: "car-sport-outline",
                value: "BMW/IX",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "BMW/Other",
              },
            ],
          },
          {
            label: "Audi",
            value: "Audi",
            icon: "car-sport-outline",
            models: [
              {
                label: "A1",
                icon: "car-sport-outline",
                value: "Audi/A1",
              },
              {
                label: "A2",
                icon: "car-sport-outline",
                value: "Audi/A2",
              },
              {
                label: "A3",
                icon: "car-sport-outline",
                value: "Audi/A3",
              },
              {
                label: "A4",
                icon: "car-sport-outline",
                value: "Audi/A4",
              },
              {
                label: "A5",
                icon: "car-sport-outline",
                value: "Audi/A5",
              },
              {
                label: "A6",
                icon: "car-sport-outline",
                value: "Audi/A6",
              },
              {
                label: "A7",
                icon: "car-sport-outline",
                value: "Audi/A7",
              },
              {
                label: "A8",
                icon: "car-sport-outline",
                value: "Audi/A8",
              },
              {
                label: "Q2",
                icon: "car-sport-outline",
                value: "Audi/Q2",
              },
              {
                label: "Q3",
                icon: "car-sport-outline",
                value: "Audi/Q3",
              },
              {
                label: "Q4",
                icon: "car-sport-outline",
                value: "Audi/Q4",
              },
              {
                label: "Q5",
                icon: "car-sport-outline",
                value: "Audi/Q5",
              },
              {
                label: "Q7",
                icon: "car-sport-outline",
                value: "Audi/Q7",
              },
              {
                label: "Q8",
                icon: "car-sport-outline",
                value: "Audi/Q8",
              },
              {
                label: "TT",
                icon: "car-sport-outline",
                value: "Audi/TT",
              },
              {
                label: "R8",
                icon: "car-sport-outline",
                value: "Audi/R8",
              },
              {
                label: "RS",
                icon: "car-sport-outline",
                value: "Audi/RS",
              },
              {
                label: "E-tron",
                icon: "car-sport-outline",
                value: "Audi/E-tron",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Audi/Other",
              },
            ],
          },
          {
            label: "Volkswagen",
            value: "Volkswagen",
            icon: "car-sport-outline",
            models: [
              {
                label: "Golf",
                icon: "car-sport-outline",
                value: "Volkswagen/Golf",
              },
              {
                label: "Jetta",
                icon: "car-sport-outline",
                value: "Volkswagen/Jetta",
              },
              {
                label: "Passat",
                icon: "car-sport-outline",
                value: "Volkswagen/Passat",
              },
              {
                label: "Bora",
                icon: "car-sport-outline",
                value: "Volkswagen/Bora",
              },
              {
                label: "Vento",
                icon: "car-sport-outline",
                value: "Volkswagen/Vento",
              },
              {
                label: "Polo",
                icon: "car-sport-outline",
                value: "Volkswagen/Polo",
              },
              {
                label: "Arteon",
                icon: "car-sport-outline",
                value: "Volkswagen/Arteon",
              },
              {
                label: "Scirocco",
                icon: "car-sport-outline",
                value: "Volkswagen/Scirocco",
              },
              {
                label: "Beetle",
                icon: "car-sport-outline",
                value: "Volkswagen/Beetle",
              },
              {
                label: "Tiguan",
                icon: "car-sport-outline",
                value: "Volkswagen/Tiguan",
              },
              {
                label: "Touareg",
                icon: "car-sport-outline",
                value: "Volkswagen/Touareg",
              },
              {
                label: "T-Cross",
                icon: "car-sport-outline",
                value: "Volkswagen/T-Cross",
              },
              {
                label: "T-Roc",
                icon: "car-sport-outline",
                value: "Volkswagen/T-Roc",
              },
              {
                label: "Sharan",
                icon: "car-sport-outline",
                value: "Volkswagen/Sharan",
              },
              {
                label: "ID",
                icon: "car-sport-outline",
                value: "Volkswagen/ID",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Volkswagen/Other",
              },
            ],
          },
          {
            label: "Porsche",
            value: "Porsche",
            icon: "car-sport-outline",
            models: [
              {
                label: "Carrera",
                icon: "car-sport-outline",
                value: "Porsche/Carrera",
              },
              {
                label: "Boxster",
                icon: "car-sport-outline",
                value: "Porsche/Boxster",
              },
              {
                label: "Cayman",
                icon: "car-sport-outline",
                value: "Porsche/Cayman",
              },
              {
                label: "Panamera",
                icon: "car-sport-outline",
                value: "Porsche/Panamera",
              },
              {
                label: "Cayenne",
                icon: "car-sport-outline",
                value: "Porsche/Cayenne",
              },
              {
                label: "Macan",
                icon: "car-sport-outline",
                value: "Porsche/Macan",
              },
              {
                label: "Taycan",
                icon: "car-sport-outline",
                value: "Porsche/Taycan",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Porsche/Other",
              },
            ],
          },
          {
            label: "Land Rover",
            value: "Land Rover",
            icon: "car-sport-outline",
            models: [
              {
                label: "Defender",
                icon: "car-sport-outline",
                value: "Land Rover/Defender",
              },
              {
                label: "Discovery",
                icon: "car-sport-outline",
                value: "Land Rover/Discovery",
              },
              {
                label: "Freelander",
                icon: "car-sport-outline",
                value: "Land Rover/Freelander",
              },
              {
                label: "Range Rover",
                icon: "car-sport-outline",
                value: "Land Rover/Range Rover",
              },
              {
                label: "Sport",
                icon: "car-sport-outline",
                value: "Land Rover/Sport",
              },
              {
                label: "Vogue",
                icon: "car-sport-outline",
                value: "Land Rover/Vogue",
              },
              {
                label: "Velar",
                icon: "car-sport-outline",
                value: "Land Rover/Velar",
              },
              {
                label: "Evoque",
                icon: "car-sport-outline",
                value: "Land Rover/Evoque",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Land Rover/Other",
              },
            ],
          },
          {
            label: "Jaguar",
            value: "Jaguar",
            icon: "car-sport-outline",
            models: [
              {
                label: "XJ",
                icon: "car-sport-outline",
                value: "Jaguar/XJ",
              },
              {
                label: "XK",
                icon: "car-sport-outline",
                value: "Jaguar/XK",
              },
              {
                label: "S-Type",
                icon: "car-sport-outline",
                value: "Jaguar/S-Type",
              },
              {
                label: "XE",
                icon: "car-sport-outline",
                value: "Jaguar/XE",
              },
              {
                label: "XF",
                icon: "car-sport-outline",
                value: "Jaguar/XF",
              },
              {
                label: "F-Type",
                icon: "car-sport-outline",
                value: "Jaguar/F-Type",
              },
              {
                label: "E-Pace",
                icon: "car-sport-outline",
                value: "Jaguar/E-Pace",
              },
              {
                label: "F-Pace",
                icon: "car-sport-outline",
                value: "Jaguar/F-Pace",
              },
              {
                label: "I-Pace",
                icon: "car-sport-outline",
                value: "Jaguar/I-Pace",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Jaguar/Other",
              },
            ],
          },
          {
            label: "Volvo",
            value: "Volvo",
            icon: "car-sport-outline",
            models: [
              {
                label: "S",
                icon: "car-sport-outline",
                value: "Volvo/S",
              },
              {
                label: "V",
                icon: "car-sport-outline",
                value: "Volvo/V",
              },
              {
                label: "XC",
                icon: "car-sport-outline",
                value: "Volvo/XC",
              },
              {
                label: "C",
                icon: "car-sport-outline",
                value: "Volvo/C",
              },
              {
                label: "EX",
                icon: "car-sport-outline",
                value: "Volvo/EX",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Volvo/Other",
              },
            ],
          },
          {
            label: "Mini",
            value: "Mini",
            icon: "car-sport-outline",
            models: [
              {
                label: "One",
                icon: "car-sport-outline",
                value: "Mini/One",
              },
              {
                label: "Cooper",
                icon: "car-sport-outline",
                value: "Mini/Cooper",
              },
              {
                label: "Cooper S",
                icon: "car-sport-outline",
                value: "Mini/Cooper S",
              },
              {
                label: "Clubman",
                icon: "car-sport-outline",
                value: "Mini/Clubman",
              },
              {
                label: "Countryman",
                icon: "car-sport-outline",
                value: "Mini/Countryman",
              },
              {
                label: "Paceman",
                icon: "car-sport-outline",
                value: "Mini/Paceman",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Mini/Other",
              },
            ],
          },
          {
            label: "Peugeot",
            value: "Peugeot",
            icon: "car-sport-outline",
            models: [
              {
                label: "106",
                icon: "car-sport-outline",
                value: "Peugeot/106",
              },
              {
                label: "206",
                icon: "car-sport-outline",
                value: "Peugeot/206",
              },
              {
                label: "207",
                icon: "car-sport-outline",
                value: "Peugeot/207",
              },
              {
                label: "208",
                icon: "car-sport-outline",
                value: "Peugeot/208",
              },
              {
                label: "306",
                icon: "car-sport-outline",
                value: "Peugeot/306",
              },
              {
                label: "307",
                icon: "car-sport-outline",
                value: "Peugeot/307",
              },
              {
                label: "308",
                icon: "car-sport-outline",
                value: "Peugeot/308",
              },
              {
                label: "406",
                icon: "car-sport-outline",
                value: "Peugeot/406",
              },
              {
                label: "407",
                icon: "car-sport-outline",
                value: "Peugeot/407",
              },
              {
                label: "408",
                icon: "car-sport-outline",
                value: "Peugeot/408",
              },
              {
                label: "508",
                icon: "car-sport-outline",
                value: "Peugeot/508",
              },
              {
                label: "2008",
                icon: "car-sport-outline",
                value: "Peugeot/2008",
              },
              {
                label: "3008",
                icon: "car-sport-outline",
                value: "Peugeot/3008",
              },
              {
                label: "4007",
                icon: "car-sport-outline",
                value: "Peugeot/4007",
              },
              {
                label: "5008",
                icon: "car-sport-outline",
                value: "Peugeot/5008",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Peugeot/Other",
              },
            ],
          },
          {
            label: "Skoda",
            value: "Skoda",
            icon: "car-sport-outline",
            models: [
              {
                label: "Kodiaq",
                icon: "car-sport-outline",
                value: "Skoda/Kodiaq",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Skoda/Other",
              },
            ],
          },
          {
            label: "Seat",
            value: "Seat",
            icon: "car-sport-outline",
            models: [
              {
                label: "Ateca",
                icon: "car-sport-outline",
                value: "Seat/Ateca",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Seat/Other",
              },
            ],
          },
          {
            label: "Fiat",
            value: "Fiat",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Fiat/Other",
              },
            ],
          },
          {
            label: "Alfa Romeo",
            value: "Alfa Romeo",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Alfa Romeo/Other",
              },
            ],
          },
          {
            label: "Opel",
            value: "Opel",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Opel/Other",
              },
            ],
          },
          {
            label: "Citroën",
            value: "Citroën",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Citroën/Other",
              },
            ],
          },
          {
            label: "Ferrari",
            value: "Ferrari",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Ferrari/Other",
              },
            ],
          },
          {
            label: "Lamborghini",
            value: "Lamborghini",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Lamborghini/Other",
              },
            ],
          },
          {
            label: "Maserati",
            value: "Maserati",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Maserati/Other",
              },
            ],
          },
          {
            label: "Aston Martin",
            value: "Aston Martin",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Aston Martin/Other",
              },
            ],
          },
          {
            label: "Bentley",
            value: "Bentley",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Bentley/Other",
              },
            ],
          },
          {
            label: "Rolls-Royce",
            value: "Rolls-Royce",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Rolls-Royce/Other",
              },
            ],
          },
          {
            label: "McLaren",
            value: "McLaren",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "McLaren/Other",
              },
            ],
          },
          {
            label: "Artura",
            value: "Artura",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Artura/Other",
              },
            ],
          },
          {
            label: "Bugatti",
            value: "Bugatti",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Bugatti/Other",
              },
            ],
          },
          {
            label: "Lotus",
            value: "Lotus",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Lotus/Other",
              },
            ],
          },
          {
            label: "SaaB",
            value: "SaaB",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "SaaB/Other",
              },
            ],
          },
          {
            label: "Smart",
            value: "Smart",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Smart/Other",
              },
            ],
          },
          {
            label: "Other",
            value: "Other",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Other/Other",
              },
            ],
          },
        ],
      },
      {
        label: "American",
        value: "American",
        icon: "car-sport-outline",
        brands: [
          {
            label: "Chevroletet",
            value: "Chevroletet",
            icon: "car-sport-outline",
            models: [
              {
                label: "Spark",
                icon: "car-sport-outline",
                value: "Chevroletet/Spark",
              },
              {
                label: "Aveo",
                icon: "car-sport-outline",
                value: "Chevroletet/Aveo",
              },
              {
                label: "Sonic",
                icon: "car-sport-outline",
                value: "Chevroletet/Sonic",
              },
              {
                label: "Cruze",
                icon: "car-sport-outline",
                value: "Chevroletet/Cruze",
              },
              {
                label: "Malibu",
                icon: "car-sport-outline",
                value: "Chevroletet/Malibu",
              },
              {
                label: "Impala",
                icon: "car-sport-outline",
                value: "Chevroletet/Impala",
              },
              {
                label: "Caprice",
                icon: "car-sport-outline",
                value: "Chevroletet/Caprice",
              },
              {
                label: "Lumina",
                icon: "car-sport-outline",
                value: "Chevroletet/Lumina",
              },
              {
                label: "Monte Carlo",
                icon: "car-sport-outline",
                value: "Chevroletet/Monte Carlo",
              },
              {
                label: "Camaro",
                icon: "car-sport-outline",
                value: "Chevroletet/Camaro",
              },
              {
                label: "Corvette",
                icon: "car-sport-outline",
                value: "Chevroletet/Corvette",
              },
              {
                label: "Blazer",
                icon: "car-sport-outline",
                value: "Chevroletet/Blazer",
              },
              {
                label: "Trailblazer",
                icon: "car-sport-outline",
                value: "Chevroletet/Trailblazer",
              },
              {
                label: "Equinox",
                icon: "car-sport-outline",
                value: "Chevroletet/Equinox",
              },
              {
                label: "Traverse",
                icon: "car-sport-outline",
                value: "Chevroletet/Traverse",
              },
              {
                label: "Tahoe",
                icon: "car-sport-outline",
                value: "Chevroletet/Tahoe",
              },
              {
                label: "Suburban",
                icon: "car-sport-outline",
                value: "Chevroletet/Suburban",
              },
              {
                label: "Trax",
                icon: "car-sport-outline",
                value: "Chevroletet/Trax",
              },
              {
                label: "Captiva",
                icon: "car-sport-outline",
                value: "Chevroletet/Captiva",
              },
              {
                label: "Colorado",
                icon: "car-sport-outline",
                value: "Chevroletet/Colorado",
              },
              {
                label: "Silverado",
                icon: "car-sport-outline",
                value: "Chevroletet/Silverado",
              },
              {
                label: "Avalanche",
                icon: "car-sport-outline",
                value: "Chevroletet/Avalanche",
              },
              {
                label: "Express",
                icon: "car-sport-outline",
                value: "Chevroletet/Express",
              },
              {
                label: "Ssr",
                icon: "car-sport-outline",
                value: "Chevroletet/Ssr",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Chevroletet/Other",
              },
            ],
          },
          {
            label: "GMC",
            value: "GMC",
            icon: "car-sport-outline",
            models: [
              {
                label: "Terrain",
                icon: "car-sport-outline",
                value: "GMC/Terrain",
              },
              {
                label: "Acadia",
                icon: "car-sport-outline",
                value: "GMC/Acadia",
              },
              {
                label: "Yukon",
                icon: "car-sport-outline",
                value: "GMC/Yukon",
              },
              {
                label: "Envoy",
                icon: "car-sport-outline",
                value: "GMC/Envoy",
              },
              {
                label: "Jimmy",
                icon: "car-sport-outline",
                value: "GMC/Jimmy",
              },
              {
                label: "Canyon",
                icon: "car-sport-outline",
                value: "GMC/Canyon",
              },
              {
                label: "Sierra",
                icon: "car-sport-outline",
                value: "GMC/Sierra",
              },
              {
                label: "Savana",
                icon: "car-sport-outline",
                value: "GMC/Savana",
              },
              {
                label: "Hummer EV",
                icon: "car-sport-outline",
                value: "GMC/Hummer EV",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "GMC/Other",
              },
            ],
          },
          {
            label: "Cadillac",
            value: "Cadillac",
            icon: "car-sport-outline",
            models: [
              {
                label: "CTS",
                icon: "car-sport-outline",
                value: "Cadillac/CTS",
              },
              {
                label: "STS",
                icon: "car-sport-outline",
                value: "Cadillac/STS",
              },
              {
                label: "ATS",
                icon: "car-sport-outline",
                value: "Cadillac/ATS",
              },
              {
                label: "XTS",
                icon: "car-sport-outline",
                value: "Cadillac/XTS",
              },
              {
                label: "CT4",
                icon: "car-sport-outline",
                value: "Cadillac/CT4",
              },
              {
                label: "CT5",
                icon: "car-sport-outline",
                value: "Cadillac/CT5",
              },
              {
                label: "CT6",
                icon: "car-sport-outline",
                value: "Cadillac/CT6",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Cadillac/Other",
              },
            ],
          },
          {
            label: "Escalade",
            value: "Escalade",
            icon: "car-sport-outline",
            models: [
              {
                label: "SRX",
                icon: "car-sport-outline",
                value: "Escalade/SRX",
              },
              {
                label: "XT4",
                icon: "car-sport-outline",
                value: "Escalade/XT4",
              },
              {
                label: "XT5",
                icon: "car-sport-outline",
                value: "Escalade/XT5",
              },
              {
                label: "XT6",
                icon: "car-sport-outline",
                value: "Escalade/XT6",
              },
              {
                label: "Lyriq",
                icon: "car-sport-outline",
                value: "Escalade/Lyriq",
              },
              {
                label: "Buick",
                icon: "car-sport-outline",
                value: "Escalade/Buick",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Escalade/Other",
              },
            ],
          },
          {
            label: "Hummer",
            value: "Hummer",
            icon: "car-sport-outline",
            models: [
              {
                label: "H1",
                icon: "car-sport-outline",
                value: "Hummer/H1",
              },
              {
                label: "H2",
                icon: "car-sport-outline",
                value: "Hummer/H2",
              },
              {
                label: "H3",
                icon: "car-sport-outline",
                value: "Hummer/H3",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Hummer/Other",
              },
            ],
          },
          {
            label: "Pontiac",
            value: "Pontiac",
            icon: "car-sport-outline",
            models: [
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Pontiac/Other",
              },
            ],
          },
          {
            label: "Ford",
            value: "Ford",
            icon: "car-sport-outline",
            models: [
              {
                label: "Fiesta",
                icon: "car-sport-outline",
                value: "Ford/Fiesta",
              },
              {
                label: "Focus",
                icon: "car-sport-outline",
                value: "Ford/Focus",
              },
              {
                label: "Escort",
                icon: "car-sport-outline",
                value: "Ford/Escort",
              },
              {
                label: "Taurus",
                icon: "car-sport-outline",
                value: "Ford/Taurus",
              },
              {
                label: "Fusion",
                icon: "car-sport-outline",
                value: "Ford/Fusion",
              },
              {
                label: "Mondeo",
                icon: "car-sport-outline",
                value: "Ford/Mondeo",
              },
              {
                label: "Crown Victoria",
                icon: "car-sport-outline",
                value: "Ford/Crown Victoria",
              },
              {
                label: "Five Hundred",
                icon: "car-sport-outline",
                value: "Ford/Five Hundred",
              },
              {
                label: "Freestyle",
                icon: "car-sport-outline",
                value: "Ford/Freestyle",
              },
              {
                label: "Contour",
                icon: "car-sport-outline",
                value: "Ford/Contour",
              },
              {
                label: "Mustang",
                icon: "car-sport-outline",
                value: "Ford/Mustang",
              },
              {
                label: "GT",
                icon: "car-sport-outline",
                value: "Ford/GT",
              },
              {
                label: "Probe",
                icon: "car-sport-outline",
                value: "Ford/Probe",
              },
              {
                label: "Thunderbird",
                icon: "car-sport-outline",
                value: "Ford/Thunderbird",
              },
              {
                label: "Bronco",
                icon: "car-sport-outline",
                value: "Ford/Bronco",
              },
              {
                label: "Bronco Sport",
                icon: "car-sport-outline",
                value: "Ford/Bronco Sport",
              },
              {
                label: "Escape",
                icon: "car-sport-outline",
                value: "Ford/Escape",
              },
              {
                label: "Kuga",
                icon: "car-sport-outline",
                value: "Ford/Kuga",
              },
              {
                label: "Edge",
                icon: "car-sport-outline",
                value: "Ford/Edge",
              },
              {
                label: "Explorer",
                icon: "car-sport-outline",
                value: "Ford/Explorer",
              },
              {
                label: "Expedition",
                icon: "car-sport-outline",
                value: "Ford/Expedition",
              },
              {
                label: "Excursion",
                icon: "car-sport-outline",
                value: "Ford/Excursion",
              },
              {
                label: "EcoSport",
                icon: "car-sport-outline",
                value: "Ford/EcoSport",
              },
              {
                label: "Flex",
                icon: "car-sport-outline",
                value: "Ford/Flex",
              },
              {
                label: "Ranger",
                icon: "car-sport-outline",
                value: "Ford/Ranger",
              },
              {
                label: "F",
                icon: "car-sport-outline",
                value: "Ford/F",
              },
              {
                label: "Maverick",
                icon: "car-sport-outline",
                value: "Ford/Maverick",
              },
              {
                label: "Super Duty",
                icon: "car-sport-outline",
                value: "Ford/Super Duty",
              },
              {
                label: "E-Series",
                icon: "car-sport-outline",
                value: "Ford/E-Series",
              },
              {
                label: "Transit",
                icon: "car-sport-outline",
                value: "Ford/Transit",
              },
              {
                label: "Transit Connect",
                icon: "car-sport-outline",
                value: "Ford/Transit Connect",
              },
              {
                label: "Windstar",
                icon: "car-sport-outline",
                value: "Ford/Windstar",
              },
              {
                label: "Freestar",
                icon: "car-sport-outline",
                value: "Ford/Freestar",
              },
              {
                label: "Aerostar",
                icon: "car-sport-outline",
                value: "Ford/Aerostar",
              },
              {
                label: "Everest",
                icon: "car-sport-outline",
                value: "Ford/Everest",
              },
              {
                label: "Territory",
                icon: "car-sport-outline",
                value: "Ford/Territory",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Ford/Other",
              },
            ],
          },
          {
            label: "Chrysler",
            value: "Chrysler",
            icon: "car-sport-outline",
            models: [
              {
                label: "Neon",
                icon: "car-sport-outline",
                value: "Chrysler/Neon",
              },
              {
                label: "Cirrus",
                icon: "car-sport-outline",
                value: "Chrysler/Cirrus",
              },
              {
                label: "Sebring",
                icon: "car-sport-outline",
                value: "Chrysler/Sebring",
              },
              {
                label: "300",
                icon: "car-sport-outline",
                value: "Chrysler/300",
              },
              {
                label: "Concorde",
                icon: "car-sport-outline",
                value: "Chrysler/Concorde",
              },
              {
                label: "LHS",
                icon: "car-sport-outline",
                value: "Chrysler/LHS",
              },
              {
                label: "New Yorker",
                icon: "car-sport-outline",
                value: "Chrysler/New Yorker",
              },
              {
                label: "Pacifica",
                icon: "car-sport-outline",
                value: "Chrysler/Pacifica",
              },
              {
                label: "Voyager",
                icon: "car-sport-outline",
                value: "Chrysler/Voyager",
              },
              {
                label: "Town & Country",
                icon: "car-sport-outline",
                value: "Chrysler/Town & Country",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Chrysler/Other",
              },
            ],
          },
          {
            label: "Jeep",
            value: "Jeep",
            icon: "car-sport-outline",
            models: [
              {
                label: "Cherokee",
                icon: "car-sport-outline",
                value: "Jeep/Cherokee",
              },
              {
                label: "Grand Cherokee",
                icon: "car-sport-outline",
                value: "Jeep/Grand Cherokee",
              },
              {
                label: "Compass",
                icon: "car-sport-outline",
                value: "Jeep/Compass",
              },
              {
                label: "Patriot",
                icon: "car-sport-outline",
                value: "Jeep/Patriot",
              },
              {
                label: "Liberty",
                icon: "car-sport-outline",
                value: "Jeep/Liberty",
              },
              {
                label: "Renegade",
                icon: "car-sport-outline",
                value: "Jeep/Renegade",
              },
              {
                label: "Wrangler",
                icon: "car-sport-outline",
                value: "Jeep/Wrangler",
              },
              {
                label: "Wrangler Unlimited",
                icon: "car-sport-outline",
                value: "Jeep/Wrangler Unlimited",
              },
              {
                label: "Commander",
                icon: "car-sport-outline",
                value: "Jeep/Commander",
              },
              {
                label: "Gladiator",
                icon: "car-sport-outline",
                value: "Jeep/Gladiator",
              },
              {
                label: "Wagoneer",
                icon: "car-sport-outline",
                value: "Jeep/Wagoneer",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Jeep/Other",
              },
            ],
          },
          {
            label: "Lincoln",
            value: "Lincoln",
            icon: "car-sport-outline",
            models: [
              {
                label: "Town Car",
                icon: "car-sport-outline",
                value: "Lincoln/Town Car",
              },
              {
                label: "Continental",
                icon: "car-sport-outline",
                value: "Lincoln/Continental",
              },
              {
                label: "LS",
                icon: "car-sport-outline",
                value: "Lincoln/LS",
              },
              {
                label: "MKZ",
                icon: "car-sport-outline",
                value: "Lincoln/MKZ",
              },
              {
                label: "MKS",
                icon: "car-sport-outline",
                value: "Lincoln/MKS",
              },
              {
                label: "MKX",
                icon: "car-sport-outline",
                value: "Lincoln/MKX",
              },
              {
                label: "MKT",
                icon: "car-sport-outline",
                value: "Lincoln/MKT",
              },
              {
                label: "Navigator",
                icon: "car-sport-outline",
                value: "Lincoln/Navigator",
              },
              {
                label: "Aviator",
                icon: "car-sport-outline",
                value: "Lincoln/Aviator",
              },
              {
                label: "Corsair",
                icon: "car-sport-outline",
                value: "Lincoln/Corsair",
              },
              {
                label: "Nautilus",
                icon: "car-sport-outline",
                value: "Lincoln/Nautilus",
              },
              {
                label: "Other",
                icon: "car-sport-outline",
                value: "Lincoln/Other",
              },
            ],
          },
          {
            label: "Tesla",
            value: "Tesla",
            icon: "car-sport-outline",
            models: [
              {
                label: AD_TYPES.Other,
                icon: "car-sport-outline",
                value: "Tesla/Other",
              },
            ],
          },
          {
            label: "Other",
            value: "Other",
            icon: "car-sport-outline",
            models: [
              {
                label: AD_TYPES.Other,
                icon: "car-sport-outline",
                value: "Other/Other",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: AD_TYPES.motorcycles,
    label: AD_TYPES.motorcycles,
    icon: "car-sport-outline",
    regions: [
      {
        value: "sport",
        label: "Sports motorcycles",
        brands: [
          {
            label: "Honda",
            value: "sport/Honda",
          },
          {
            label: "Yamaha",
            value: "sport/Yamaha",
          },
          {
            label: "Kawasaki",
            value: "sport/Kawasaki",
          },
          {
            label: "Suzuki",
            value: "sport/Suzuki",
          },
          {
            label: "BMW",
            value: "sport/BMW",
          },
          {
            label: "Ducati",
            value: "sport/Ducati",
          },
          {
            label: "KTM",
            value: "sport/KTM",
          },
          {
            label: "Harley-Davidson",
            value: "sport/Harley-Davidson",
          },
          {
            label: "Triumph Motorcycles",
            value: "sport/Triumph Motorcycles",
          },
          {
            label: "Royal Enfield",
            value: "sport/Royal Enfield",
          },
          {
            label: "Aprilia",
            value: "sport/Aprilia",
          },
          {
            label: "Indian Motorcycle",
            value: "sport/Indian Motorcycle",
          },
          {
            label: "Benelli",
            value: "sport/Benelli",
          },
          {
            label: "Can-Am",
            value: "sport/Can-Am",
          },
          {
            label: "MV Agusta",
            value: "sport/MV Agusta",
          },
          {
            label: "Husqvarna",
            value: "sport/Husqvarna",
          },
          {
            label: "Moto Guzzi",
            value: "sport/Moto Guzzi",
          },
          {
            label: "Bajaj",
            value: "sport/Bajaj",
          },
          {
            label: "TVS Motor",
            value: "sport/TVS Motor",
          },
        ],
      },
      {
        value: "quad",
        label: "Quad bikes",
        brands: [
          {
            label: "Quad",
            value: "quad/Quad",
          },
        ],
      },
      {
        value: "bikes",
        label: "Bicycles",
        brands: [
          {
            label: "Bicycle",
            value: "bikes/Bicycle",
          },
        ],
      },
      {
        value: "scooter",
        label: "Scooter",
        brands: [
          {
            label: "Scooter",
            value: "scooter/Scooter",
          },
        ],
      },
    ],
  },
  {
    value: AD_TYPES.classic_cars,
    icon: "car-sport-outline",
    label: AD_TYPES.classic_cars,
  },
  {
    value: AD_TYPES.show,
    icon: "car-sport-outline",
    label: AD_TYPES.show,
  },
  {
    value: AD_TYPES.car_rental_agencies,
    icon: "car-sport-outline",
    label: AD_TYPES.car_rental_agencies,
  },
  {
    value: AD_TYPES.spare_parts,
    label: AD_TYPES.spare_parts,
    icon: "car-sport-outline",
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
    icon: "car-sport-outline",
    label: AD_TYPES.home_services,
    regions: [
      {
        value: "washing",
        icon: "car-sport-outline",
        label: "Washing",
      },
      {
        value: "protection",
        icon: "car-sport-outline",
        label: "Protection",
      },
      {
        value: "batteries",
        icon: "car-sport-outline",
        label: "Batteries",
      },
      {
        value: "check",
        icon: "car-sport-outline",
        label: "Check",
      },
      {
        value: "keys",
        icon: "car-sport-outline",
        label: "Keys",
      },
      {
        value: "insurance",
        icon: "car-sport-outline",
        label: "Insurance",
      },
      {
        value: AD_TYPES.Other,
        icon: "car-sport-outline",
        label: AD_TYPES.Other,
      },
    ],
  },
  {
    value: AD_TYPES.damaged_cars,
    icon: "car-sport-outline",
    label: AD_TYPES.damaged_cars,
  },
  {
    value: AD_TYPES.accessories,
    icon: "car-sport-outline",
    label: AD_TYPES.accessories,
  },
  {
    value: AD_TYPES.logistics,
    icon: "car-sport-outline",
    label: AD_TYPES.logistics,
  },
  {
    value: AD_TYPES.rims_and_tires,
    icon: "car-sport-outline",
    label: AD_TYPES.rims_and_tires,
  },
  {
    value: AD_TYPES.repair_garages,
    icon: "car-sport-outline",
    label: AD_TYPES.repair_garages,
  },
  {
    value: AD_TYPES.Other,
    icon: "car-sport-outline",
    label: AD_TYPES.Other,
  },
];

export type SubscriptionDetail = {
  id: string;
  adTypes: string[];
  type: SUBSCRIPTION_TYPES | string;
  expires_in: number;
  title: string;
  price: number;
  features: string[];
};

export const SUBSCRIPTION_PLANS = [
  {
    id: "1",
    adTypes: [AD_TYPES.used_cars, AD_TYPES.motorcycles, AD_TYPES.classic_cars],
    type: SUBSCRIPTION_TYPES.GOLDEN,
    expires_in: 35,
    title: "Golden",
    price: 0,
    features: [
      "Only Ad images will be shared.",
      "Share on Instagram - TikTok - Facebook",
      "Video only available on upper plans.",
    ],
  },
  {
    id: "2",
    adTypes: [AD_TYPES.used_cars, AD_TYPES.classic_cars],
    type: SUBSCRIPTION_TYPES.DIAMOND,
    expires_in: 45,
    title: "Diamond",
    price: 2,
    features: [
      "Share images + video",
      "Share on Instagram - TikTok - Facebook",
      "Automated share for 10 days",
      "Diamond badge",
    ],
  },
  {
    id: "3",
    adTypes: [AD_TYPES.used_cars, AD_TYPES.classic_cars],
    type: SUBSCRIPTION_TYPES.RUBY,
    expires_in: 50,
    title: "Ruby",
    price: 2.5,
    features: [
      "Share images + video",
      "Share on Instagram - TikTok - Facebook",
      "Ad fixed for 24h",
      "Weekly upload",
      "Additional support on social media",
      "Ruby badge",
    ],
  },
  {
    id: "4",
    adTypes: [AD_TYPES.motorcycles],
    type: SUBSCRIPTION_TYPES.DIAMOND,
    expires_in: 40,
    title: "Diamond",
    price: 2.5,
    features: [
      "Share images + video",
      "Share on Instagram - TikTok - Facebook",
      "Automated share for 10 days",
      "Diamond badge",
    ],
  },
  {
    id: "5",
    adTypes: [AD_TYPES.motorcycles],
    type: SUBSCRIPTION_TYPES.RUBY,
    expires_in: 45,
    title: "Ruby",
    price: 3.5,
    features: [
      "Share images + video",
      "Share on Instagram - TikTok - Facebook",
      "Ad fixed for 24h",
      "Weekly upload",
      "Additional support on social media",
      "Ruby badge",
    ],
  },
  {
    id: "6",
    adTypes: [AD_TYPES.show],
    type: SUBSCRIPTION_TYPES.GOLDEN,
    expires_in: 55,
    title: "Golden",
    price: 0,
    features: [
      "Share images",
      "Share only first 15s of a video",
      "Share on Instagram - TikTok - Facebook.",
    ],
  },
  {
    id: "7",
    adTypes: [AD_TYPES.show],
    type: SUBSCRIPTION_TYPES.DIAMOND,
    expires_in: 110,
    title: "Diamond",
    price: 6,
    features: [
      "Share images",
      "Share only first 30s of a video",
      "Share on Instagram - TikTok - Facebook.",
      "Automated sharing for 10 days",
      "Diamond badge",
    ],
  },
  {
    id: "8",
    adTypes: [AD_TYPES.show],
    type: SUBSCRIPTION_TYPES.RUBY,
    expires_in: 170,
    title: "Ruby",
    price: 9,
    features: [
      "Share images",
      "Share only first 40s of a video",
      "Share on Instagram - TikTok - Facebook.",
      "Ad fixed for 24h",
      "Weekly upload",
      "Additional support on social media",
      "Ruby badge",
    ],
  },
  {
    id: "9",
    adTypes: [AD_TYPES.repair_garages],
    type: SUBSCRIPTION_TYPES.GOLDEN,
    expires_in: 40,
    title: "Golden",
    price: 0,
    features: [
      "Only Ad images will be shared.",
      "Video only available on upper plans.",
    ],
  },
  {
    id: "10",
    adTypes: [AD_TYPES.repair_garages],
    type: SUBSCRIPTION_TYPES.DIAMOND,
    expires_in: 45,
    title: "Diamond",
    price: 2,
    features: [
      "Share images + video",
      "Share on Facebook",
      "Automated share for 10 days",
      "Diamond badge",
    ],
  },
  {
    id: "11",
    adTypes: [AD_TYPES.repair_garages],
    type: SUBSCRIPTION_TYPES.RUBY,
    expires_in: 50,
    title: "Ruby",
    price: 2.5,
    features: [
      "Share images + video",
      "Share on Instagram - TikTok - Facebook",
      "Ad fixed for 24h",
      "Weekly upload",
      "Additional support on social media",
      "Ruby badge",
    ],
  },
];

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

export const USED_CARS_FILTER_CONFIG: Record<string, FilterConfigItem> = {
  brand: {
    title: "brand",
    parentKey: "region",
    showRegionHelper: true,
    showSearch: true,
    options: flattenToBrands(CAR_BRAND_TYPES[0]),
  },
  model: {
    title: "model",
    // parentKey: "brand" as keyof FilterState,
    parentKey: null,
    showRegionHelper: false,
    showSearch: true,
    options: flattenToModels(CAR_BRAND_TYPES[0]),
  },
  year: {
    title: "year",
    // parentKey: "model" as keyof FilterState,
    parentKey: null,
    showRegionHelper: false,
    showSearch: true,
    options: YEARS as FilterOption[],
  },
  exterior_color: {
    title: "color",
    showRegionHelper: false,
    showSearch: true,
    parentKey: null,
    options: CAR_COLORS as FilterOption[],
  },
} as const;

export const MOTORCYCLES_FILTER_CONFIG: Record<string, FilterConfigItem> = {
  brand: {
    title: "brand",
    parentKey: null,
    showRegionHelper: false,
    showSearch: true,
    options: flattenToBrands(CAR_BRAND_TYPES[1]),
  },
  year: {
    title: "year",
    parentKey: null,
    showRegionHelper: false,
    showSearch: true,
    options: YEARS as FilterOption[],
  },
  exterior_color: {
    title: "color",
    showRegionHelper: false,
    showSearch: true,
    parentKey: null,
    options: CAR_COLORS as FilterOption[],
  },
} as const;

export type FilterConfigKey = keyof typeof USED_CARS_FILTER_CONFIG;
