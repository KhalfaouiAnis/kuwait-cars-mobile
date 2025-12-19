import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { SUBSCRIPTION_TYPES } from "../constants/ad";
import {
  AreaInterface,
  LocationInterface,
  ProvinceInterface,
} from "./schema/shared";

export interface User {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  role: UserRole;
  province?: ProvinceInterface;
  // province?: Omit<ProvinceInterface, "areas">;
  area?: AreaInterface;
  location?: LocationInterface;
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

export type LanguageCode = "en" | "ar" | "fr" | "es" | "in" | "ur";
export type Language = { code: LanguageCode; name: string; flag: string };

export type TimerMode = "countdown" | "elapsed";

export type SelectOption = {
  id: string;
  label: string;
  value: string | number | boolean;
};

export type ProvinceOption = {
  province: string;
  label?: string;
  latitude: number;
  longitude: number;
  areas: AreaOption[];
};

export type AreaOption = {
  area: string;
  label?: string;
  latitude: number;
  longitude: number;
};

export type ProvinceArea = {
  value: string;
  label: string;
};

export type FilterAdsBy = "brand" | "model" | "year" | "price";
export type MediaType = "THUMBNAIL" | "IMAGE" | "VIDEO";
export type SoundEffectTypes = "mute" | "effect_1" | "effect_2" | "effect_3" | "effect_4" | "effect_5"


export interface AdFormStepProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  isDark?: boolean;
  setValue?: UseFormSetValue<T>;
  getValue?: UseFormGetValues<T>;
  setError?: UseFormSetError<T>;
  onSkip?: () => void;
  t: (key: string, options?: any) => string;
}

export interface CloudinarySignRequestInterface {
  mediaType: "image" | "video" | "profile_pic";
  audioFlag?: SoundEffectTypes;
}

export interface AdvertisementMedia {
  id: string;
  public_id: string;
  media_type: MediaType;
  original_url: string;
  transformed_url: string;
}

export interface AdvertisementPlan {
  type: SUBSCRIPTION_TYPES;
  title: string;
  price: number;
  durationInDays: number;
  features: string[];
}

export interface AdvertisementInterface {
  id: string;
  ad_type: string;
  ad_category?: string;
  title: string;
  description: string;
  plan: AdvertisementPlan;
  province: Omit<ProvinceInterface, "areas">;
  media: AdvertisementMedia[];
  area?: AreaInterface;
  location?: LocationInterface;

  created_at: string;
  price?: number;
  year?: number;
  brand?: string;
  model?: string;
  exterior_color?: string;
  mileage?: number;
  mileage_unit?: string;

  fuel_type?: string;
  cylinders?: string;
  transmission?: string;
  under_warranty?: boolean;
  roof?: string;

  additional_number?: string;
  second_additional_number?: string;

  hide_license_plate?: boolean;
  contact_whatsapp?: boolean;
  receive_calls?: boolean;
  xcar_calls?: boolean;
  xcar_chat?: boolean;
}
