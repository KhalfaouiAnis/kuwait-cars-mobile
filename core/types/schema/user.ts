import { z } from "zod";
import {
  AdMediaAssetSchema,
  AreaSchema,
  LocationSchema,
  ProvinceSchema,
} from "./shared";

export const ExistingAvatarSchema = z.object({
  id: z.string().optional(),
  public_id: z.string(),
  original_url: z.string(),
  media_type: z.string(),
  transformed_url: z.string().optional(),
});

export const UpdateProfileSchema = z.object({
  fullname: z
    .string({ message: "fullname" })
    .min(3, "Name must be at least 3 characters"),
  email: z.string({ message: "email" }).email("Please enter a valid email"),
  phone: z
    .string()
    .min(6, "Please enter a valid phone number")
    .max(15, "Please enter a valid phone number"),
  province: ProvinceSchema,
  area: AreaSchema.nullish(),
  location: LocationSchema.nullish(),
  avatar: AdMediaAssetSchema.nullish(),
});

export type UpdateProfileInterface = z.infer<typeof UpdateProfileSchema>;
export type ExistingAvatarType = z.infer<typeof ExistingAvatarSchema>;
