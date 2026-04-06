import { FilterState } from "@/core/store/search.store";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import {
  AreaInterface,
  LocationInterface,
  MediaAsset,
  ProvinceInterface,
} from "./schema/shared";

export enum SUBSCRIPTION_TYPES {
  FREE = "FREE",
  GOLDEN = "GOLDEN",
  RUBY = "RUBY",
}

export type SubscriptionDetail = {
  id: string;
  adTypes: string[];
  type: SUBSCRIPTION_TYPES | string;
  expires_in: number;
  videoDuration: number;
  title: string;
  price: number;
  features: string[];
};

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

export interface User {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  role: UserRole;
  province: ProvinceInterface;
  area?: AreaInterface | null;
  location?: LocationInterface | null;
  avatar?: MediaAsset;
  created_at: Date;
}

export enum UserRole {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
  USER = "USER",
}

export enum NotificationType {
  ADVERTISE_EXPIRED = "ADVERTISE_EXPIRED",
  ADVERTISE_EXPIRING_SOON = "ADVERTISE_EXPIRING_SOON",
  PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
  MISSED_CALL = "MISSED_CALL",
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  data: Record<string, unknown> | null;
  is_read: boolean;
  status: string;
  created_at: string;
}

export type ThemeType = "light" | "dark" | "system";
export type LanguageCode = "en" | "ar" | "fr" | "es" | "hi" | "ur";
export type Language = { code: LanguageCode; name: string; flag: string };

export type TimerMode = "countdown" | "elapsed";

export type GlobalSelectOption = {
  id: string;
  label: string;
  value: any;
};

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
