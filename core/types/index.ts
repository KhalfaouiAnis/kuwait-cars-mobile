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
  province: ProvinceInterface;
  area?: AreaInterface | null;
  location?: LocationInterface | null;
  avatar?: ProfilePictureMedia | null;
  created_at: Date;
}

export enum UserRole {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
  USER = "USER",
}

export type ThemeType = "light" | "dark" | "system";
export type LanguageCode = "en" | "ar" | "fr" | "es" | "hi" | "ur";
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

export type MediaType = "THUMBNAIL" | "IMAGE" | "VIDEO";
export type SoundEffectTypes =
  | "mute"
  | "effect_1"
  | "effect_2"
  | "effect_3"
  | "effect_4"
  | "effect_5";

export interface AdFormStepProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  isDark?: boolean;
  setValue?: UseFormSetValue<T>;
  getValue?: UseFormGetValues<T>;
  setError?: UseFormSetError<T>;
  onSkip?: () => void;
}

export interface CloudinarySignRequestInterface {
  mediaType: "image" | "video" | "profile_pic";
  audioFlag?: SoundEffectTypes;
  overwrite?: boolean;
  invalidate?: boolean;
}

export interface AdvertisementMedia {
  id?: string;
  public_id: string;
  media_type: MediaType;
  original_url?: string;
  transformed_url: string;
}

export interface AdvertisementPlan {
  type: SUBSCRIPTION_TYPES;
  title: string;
  price: number;
  expires_in: number;
  features: string[];
}

export interface AdvertisementInterface {
  id: string;
  ad_type: string;
  ad_category?: string;
  title: string;
  description: string;
  plan: AdvertisementPlan;
  province: ProvinceInterface;
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

  is_favorited?: boolean;
  is_flagged?: boolean;
  views?: string;

  user?: User;
}

export interface AdSearchParams {
  filters?: Record<string, any>;
  sorting?: { field: string; direction: "asc" | "desc" };
  cursor?: string | null;
  limit?: number;
  direction?: "forward" | "backward";
}

export type AdStatus = "COMPLETED" | "ACTIVE";

export interface PaginatedResponse<T> {
  status?: "success";
  data: T[];
  meta: {
    nextCursor: string | undefined;
    hasNextPage: boolean;
    totalCount: number;
  };
}

export interface ProfilePictureMedia {
  id?: string;
  public_id: string;
  media_type: MediaType;
  original_url: string;
  transformed_url?: string;
}
