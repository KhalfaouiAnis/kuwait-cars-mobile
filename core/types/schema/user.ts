import { z } from "zod";
import {
  AreaSchema,
  LocationSchema,
  MediaAssetSchema,
  ProvinceSchema,
} from "./shared";

export const UpdateProfileSchema = z.object({
  fullname: z.string().min(3),
  email: z.string({ message: "email" }).email(),
  phone: z.string().min(8).max(8),
  province: ProvinceSchema,
  area: AreaSchema.nullish(),
  location: LocationSchema.nullish(),
  avatar: MediaAssetSchema.nullish(),
});

export type UpdateProfileInterface = z.infer<typeof UpdateProfileSchema>;
