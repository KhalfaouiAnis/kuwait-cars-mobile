import { Language, ProvinceOption, SelectOption } from "../types";
import { generateYears } from "../utils/date";

export const ADS_PAGE_SIZE = "12";

export const AUTH_STORAGE_KEY = "KC_AUTH_STORAGE";
export const USER_PREFERENCES_STORAGE_KEY = "KC_USER_PREFERENCES_STORAGE";
export const ADS_STORAGE_KEY = "KC_ADS_STORAGE";
export const VEHICLES_ADS_STORAGE_KEY = "KC_VEHICLES_ADS_STORAGE";

export const MAX_VIDEO_SIZE = 1024 * 1024 * 100;
export const MAX_IMAGE_SIZE = 1024 * 1024 * 5;

export const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];
export const ACCEPTED_IMAGE_TYPES = ["image/jpg", "image/png", "image/jpeg"];

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "ar", name: "arabic", flag: "🇰🇼" },
  { code: "en", name: "english", flag: "🇺🇸" },
  { code: "es", name: "spanish", flag: "🇪🇸" },
  { code: "fr", name: "frensh", flag: "🇫🇷" },
  { code: "jo", name: "urdu", flag: "JO" },
  { code: "in", name: "hindi", flag: "🇮🇳" },
];

export const COUNTRIES = [
  { name: "Kuwait", cca2: "KW", callingCode: ["965"], flag: "🇰🇼" },
];

export const SUBSCRIPTION_PLANS = [
  {
    id: "1",
    description: "FREE PLAN",
    title: "Basic",
    price: "$99",
    features: [
      "3 user request",
      "10 downloads per day",
      "Daily content updates",
      "Fully editable files",
    ],
  },
  {
    id: "2",
    description: "FREE PLAN",
    title: "Pro",
    price: "$199",
    features: [
      "3 user request",
      "10 downloads per day",
      "Daily content updates",
      "Fully editable files",
    ],
  },
  {
    id: "3",
    description: "FREE PLAN",
    title: "Enterprise",
    price: "Custom",
    features: [
      "3 user request",
      "10 downloads per day",
      "Daily content updates",
      "Fully editable files",
    ],
  },
];

export const HIDE_TABBAR_ROUTES: string[] = ["/create"];

export const CAR_COLORS: SelectOption[] = [
  { id: "None", label: "None", value: "None" },
  { id: "White", label: "White", value: "White" },
  { id: "Black", label: "Black", value: "Black" },
  { id: "Red", label: "Red", value: "Red" },
  { id: "Silver", label: "Silver", value: "Silver" },
  { id: "Maroon", label: "Maroon", value: "Maroon" },
  { id: "Gray", label: "Gray", value: "Gray" },
  { id: "Blue", label: "Blue", value: "Blue" },
  { id: "Yellow", label: "Yellow", value: "Yellow" },
  { id: "Golden", label: "Golden", value: "Golden" },
  { id: "Purple", label: "Purple", value: "Purple" },
];

export const YEARS: SelectOption[] = generateYears().map((year) => ({
  id: year.toString(),
  label: year.toString(),
  value: year.toString(),
}));

export const ZIP_CODES: {
  code: number;
  latitude: number;
  longitude: number;
}[] = [{ code: 1100, latitude: 11.254, longitude: 10.2544 }];

export const PROVINCES: ProvinceOption[] = [
  {
    province: "Kuwait City",
    label: "Kuwait City",
    latitude: 11.254,
    longitude: 10.2544,
    areas: [
      {
        area: "Area Kuwait City 1",
        label: "Area Kuwait City 1",
        latitude: 11.254,
        longitude: 10.2544,
      },
      {
        area: "Area Kuwait City 2",
        label: "Area Kuwait City 2",
        latitude: 11.254,
        longitude: 10.2544,
      },
    ],
  },
  {
    province: "Hawalli",
    label: "Hawalli",
    latitude: 11.254,
    longitude: 10.2544,
    areas: [
      {
        area: "Area Hawalli 1",
        label: "Area Hawalli 1",
        latitude: 11.254,
        longitude: 10.2544,
      },
      {
        area: "Area Hawalli 2",
        label: "Area Hawalli 2",
        latitude: 11.254,
        longitude: 10.2544,
      },
    ],
  },
  {
    province: "Farwaniyah",
    label: "Farwaniyah",
    latitude: 11.254,
    longitude: 10.2544,
    areas: [
      {
        area: "Area Farwaniyah 1",
        label: "Area Farwaniyah 1",
        latitude: 11.254,
        longitude: 10.2544,
      },
      {
        area: "Area Farwaniyah 2",
        label: "Area Farwaniyah 2",
        latitude: 11.254,
        longitude: 10.2544,
      },
    ],
  },
  {
    province: "Al Ahmadi",
    label: "Al Ahmadi",
    latitude: 11.254,
    longitude: 10.2544,
    areas: [
      {
        area: "Area Al Ahmadi 1",
        label: "Area Al Ahmadi 1",
        latitude: 11.254,
        longitude: 10.2544,
      },
      {
        area: "Area Al Ahmadi 2",
        label: "Area Al Ahmadi 2",
        latitude: 11.254,
        longitude: 10.2544,
      },
    ],
  },
  {
    province: "Al Jahra",
    label: "Al Jahra",
    latitude: 11.254,
    longitude: 10.2544,
    areas: [
      {
        area: "Area Al Jahra 1",
        label: "Area Al Jahra 1",
        latitude: 11.254,
        longitude: 10.2544,
      },
      {
        area: "Area Al Jahra 2",
        label: "Area Al Jahra 2",
        latitude: 11.254,
        longitude: 10.2544,
      },
    ],
  },
  {
    province: "Mubarek Al-kabeer",
    label: "Mubarek Al-kabeer",
    latitude: 11.254,
    longitude: 10.2544,
    areas: [
      {
        area: "Area Mubarek Al-kabeer 1",
        label: "Area Mubarek Al-kabeer 1",
        latitude: 11.254,
        longitude: 10.2544,
      },
      {
        area: "Area Mubarek Al-kabeer 2",
        label: "Area Mubarek Al-kabeer 2",
        latitude: 11.254,
        longitude: 10.2544,
      },
    ],
  },
];

export const OVERALL_MIN_PRICE = 0;
export const OVERALL_MAX_PRICE = 100000;
