import { Language, SelectOption } from "../types";
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
  { code: "ar", name: "Arabic", flag: "🇰🇼" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "jo", name: "أردو", flag: "JO" },
  { code: "in", name: "भारतीय", flag: "🇮🇳" },
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

export const CATEGORIES: SelectOption[] = [
  { id: "Cars 1", label: "Cars 1", value: "Cars 1" },
  { id: "Cars 2", label: "Cars 2", value: "Cars 2" },
  { id: "Cars 3", label: "Cars 3", value: "Cars 3" },
];

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

export const CITIES: SelectOption[] = [
  { id: "Kuwait City", label: "Kuwait City", value: "Kuwait City" },
  { id: "Hawalli", label: "Hawalli", value: "Hawalli" },
  { id: "Farwaniyah", label: "Farwaniyah", value: "Farwaniyah" },
  { id: "Ahmadi", label: "Ahmadi", value: "Ahmadi" },
  { id: "Jahra", label: "Jahra", value: "Jahra" },
  {
    id: "Mubarek Al-Kabeer",
    label: "Mubarek Al-Kabeer",
    value: "Mubarek Al-Kabeer",
  },
];

export const Blocks: SelectOption[] = [
  { id: "Block_1", label: "Block 1", value: "Block 1" },
  { id: "Block_2", label: "Block 2", value: "Block 2" },
];

export const YEARS: SelectOption[] = generateYears().map((year) => ({
  id: year.toString(),
  label: year.toString(),
  value: year,
}));

export const OVERALL_MIN_PRICE = 0;
export const OVERALL_MAX_PRICE = 100000;
