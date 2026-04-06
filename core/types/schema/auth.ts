import { z } from "zod";
import { UserRole } from "..";
import { AreaSchema, ProvinceSchema } from "./shared";

export const EmailSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const PasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const UpdatePasswordSchema = z
  .object({
    ...PasswordSchema.shape,
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((formData) => formData.confirmPassword === formData.password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  phone: z.string({ message: "phone" }).min(6).max(15),
  password: z.string({ message: "password" }).min(6, "Password is required"),
});

export const SignupSchema = z.object({
  fullname: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(8).max(8),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Please enter a valid email").optional(),
  role: z.optional(z.nativeEnum(UserRole)),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
});

export const RequestResetPasswordSchema = z
  .object({
    email: EmailSchema.shape.email.optional().or(z.literal("")),
    phone: SignupSchema.shape.phone.optional().or(z.literal("")),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either an email address or a phone number must be provided",
    path: ["email"],
  });

export const ResetPasswordSchema = z
  .object({
    phone: z.string().optional(),
    password: z.string({ message: "Password is required" }).min(6),
    confirmPassword: z.string({ message: "Password is required" }).min(6),
  })
  .refine((formData) => formData.confirmPassword === formData.password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupInterface = z.infer<typeof SignupSchema>;
export type LoginInterface = z.infer<typeof LoginSchema>;
export type ResetPasswordInterface = z.infer<typeof ResetPasswordSchema>;
export type UpdatePasswordInterface = z.infer<typeof UpdatePasswordSchema>;
export type RequestResetPasswordInterface = z.infer<
  typeof RequestResetPasswordSchema
>;
export type EmailType = z.infer<typeof EmailSchema>;
