import { Ad_CATEGORIES } from "@/core/constants/ad";
import { z } from "zod";

export type AdCategory = (typeof Ad_CATEGORIES)[number];

export const LocationSchema = z.object({
  district: z.string(),
  area: z.string(),
  block: z.string(),
});

export const FileSchema = z.object(
  {
    uri: z.string().url().or(z.string().startsWith("file://")),
    type: z.string(),
    name: z.string().optional(),
    duration: z.coerce.number().optional(),
    size: z.coerce.number().optional(),
  },
  { message: "File validation failed" }
);

export const VideoSchema = z.object({
  uri: z.string().url().or(z.string().startsWith("file://")).optional(),
  type: z.string().optional(),
  duration: z.coerce.number().optional(),
  name: z.string().optional(),
  size: z.coerce.number().optional(),
});

export const createFileSchema = (customMessage?: string) =>
  z.object(
    {
      uri: z.string().url().or(z.string().startsWith("file://")).optional(),
      type: z.string().optional(),
      name: z.string().optional(),
      duration: z.coerce.number().optional(),
      size: z.coerce.number().optional(),
    },
    { message: customMessage || "File validation failed" }
  );

export const MultiFileSchema = (customMessage?: string) =>
  z.array(createFileSchema(customMessage));

export const BaseAdSchema = z.object({
  title: z.string().min(3, "The title field is required").optional(),
  description: z
    .string()
    .min(3, "The description field is required")
    .optional(),
  location: LocationSchema,

  price: z.coerce.number().optional(),
  province: z.string().optional(),
  zip_code: z.string().optional(),

  category_id: z.enum(Ad_CATEGORIES as [AdCategory, ...AdCategory[]], {
    required_error: "Category is required",
  }),

  thumbnail: createFileSchema("Thumbnail must be a valid image under 5MB"),
  images: MultiFileSchema(
    "Images must be valid files under 5MB each"
  ).optional(),
  video: VideoSchema.optional(),

  additional_number: z.string().optional(),

  contact_whatsapp: z.coerce.boolean().optional(),
  receive_calls: z.coerce.boolean().optional(),
  xcar_calls: z.coerce.boolean().optional(),
  xcar_chat: z.coerce.boolean().optional(),
  hide_license_plate: z.coerce.boolean().optional(),

  plan: z.string().min(1, "Plan is required"),
});

export type LocationInterface = z.infer<typeof LocationSchema>;
export type BaseAdInterface = z.infer<typeof BaseAdSchema>;
