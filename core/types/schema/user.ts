import { z } from "zod";
import { FileSchema } from "./ad";
import { SignupSchema } from "./auth";

export const UpdateProfileSchema = SignupSchema.partial().extend({
  province: z.string().optional(),
  avatar: FileSchema.optional(),
});

export type UpdateProfileInterface = z.infer<typeof UpdateProfileSchema>;
