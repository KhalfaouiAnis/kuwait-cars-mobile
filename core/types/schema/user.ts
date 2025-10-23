import { z } from "zod";
import { PasswordSchema } from "./auth";

export const UpdateProfileSchema = z.object({
  fullname: z.string().min(3, "Name must be at least 3 characters").optional(),
  phone: z
    .string()
    .min(6, "Please enter a valid phone number")
    .max(15, "Please enter a valid phone number")
    .optional(),
  email: z.string().email("Please enter a valid email").optional(),
  city: z
    .optional(z.string().min(3, "City must be at least 3 characters"))
    .optional(),
  zip: z
    .optional(z.string().min(4, "zip must be at least 4 characters"))
    .optional(),
  password: PasswordSchema.shape.password.optional(),
  confirmPassword: PasswordSchema.shape.password.optional(),
});

export type UpdateProfileInterface = z.infer<typeof UpdateProfileSchema>;
