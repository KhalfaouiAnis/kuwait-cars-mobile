import { z } from "zod";
import { AvatarSchema } from "./media";
import { AreaSchema, LocationSchema, ProvinceSchema } from "./shared";

export const UpdateProfileSchema = z.object({
  fullname: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(6, "Please enter a valid phone number")
    .max(15, "Please enter a valid phone number"),
  province: ProvinceSchema.optional(),
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),
  avatar: AvatarSchema.optional().or(z.string().optional()),
});

export type UpdateProfileInterface = z.infer<typeof UpdateProfileSchema>;
