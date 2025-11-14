import { LocationInterface } from "./schema/ad";

export interface User {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  role: UserRole;
  city?: string;
  province?: string;
  zip_code?: string;
  avatar?: string;
}

export type BaseAd = {
  id: string;
  title: string;
  description: string;
  price: number;
  year: number;
  category_id: string;
  subcategory_id: string;
  location: LocationInterface;
  thumbnail: string;
  additional_number?: string;
  plan: string;
  created_at: string;
  viewed_at?: string | number | Date;
};

export type CarAd = BaseAd & {
  mileage: string;
  exterior_color: string;
  model?: string;
  body_type?: string;
  fuel_type?: string;
  interior_color?: string;
  seats_material?: string;
  body_condition?: string;
  cylinders?: string;
  transmission?: string;
};

export interface AdType {
  id: string;
  images: { url: any }[];
  badge: string;
  name: string;
  datePosted: string;
  price: string;
  description: string;
  mielage: string;
  location: string;
  distanceFromMyLocation: string;
  engine: string;
  gearType: string;
}

export enum UserRole {
  ADMIN = "ADMIN",
  ANONYMOUS = "ANONYMOUS",
  USER = "USER",
}

export type LanguageCode = "en" | "ar" | "fr" | "es" | "in" | "jo";
export type Language = { code: LanguageCode; name: string; flag: string };

export type TimerMode = "countdown" | "elapsed";

export type SelectOption = {
  id: string;
  label: string;
  value: string;
};

export type FilterAdsBy = "brand" | "year" | "price";
