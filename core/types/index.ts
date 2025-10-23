export interface User {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

export interface AdType {
  id: string
  images: { image: any }[];
  badge: string;
  name: string
  datePosted: string
  price: string
  description: string
  mielage: string
  location: string
  distanceFromMyLocation: string
  engine: string
  gearType: string
}

export enum UserRole {
  ADMIN = "ADMIN",
  ANONYMOUS = "ANONYMOUS",
  USER = "USER",
}

export type LanguageCode = "en" | "ar" | "fr" | "es" | "in" | "jo";
export type Language = { code: LanguageCode; name: string; flag: string };

export type TimerMode = "countdown" | "elapsed";
