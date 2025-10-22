export interface User {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = "ADMIN",
  ANONYMOUS = "ANONYMOUS",
  USER = "USER",
}

export type LanguageCode = "en" | "ar" | "fr" | "es" | "in" | "jo";
export type Language = { code: LanguageCode; name: string; flag: string };


export type TimerMode = 'countdown' | 'elapsed';