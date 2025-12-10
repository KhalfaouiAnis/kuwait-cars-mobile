import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
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
  value: string | number | boolean;
};

export type ProvinceOption = {
  province: string;
  label: string;
  latitude: number;
  longitude: number;
  areas: AreaOption[];
};

export type AreaOption = {
  area: string;
  label: string;
  latitude: number;
  longitude: number;
};

export type ProvinceArea = {
  value: string;
  label: string;
};

export type FilterAdsBy = "brand" | "model" | "year" | "price";

export interface AdFormStepProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  isDark?: boolean;
  setValue?: UseFormSetValue<T>;
  getValue?: UseFormGetValues<T>;
  setError?: UseFormSetError<T>;
  onSkip?: () => void;
}
