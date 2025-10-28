import { Language } from "../types";

export const COURSE_PAGE_SIZE = 6;
export const AUTH_STORAGE_KEY = "KC_AUTH_STORAGE";
export const USER_PREFERENCES_STORAGE_KEY = "KC_USER_PREFERENCES_STORAGE";

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

export const HIDE_TABBAR_ROUTES: string[] = ["new-ad"];

export const CATEGORIES = [
  { id: "Cars 1", label: "Cars 1" },
  { id: "Cars 2", label: "Cars 2" },
  { id: "Cars 3", label: "Cars 3" },
];
