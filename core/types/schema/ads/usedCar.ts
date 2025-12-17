import { Ad_CATEGORIES } from "@/core/constants/ad";
import { z } from "zod";
import {
  AdCategory,
  AreaSchema,
  createFileSchema,
  LocationSchema,
  MultiFileSchema,
  ProvinceSchema,
  VideoSchema,
} from "../shared";

export const UsedCarAdSchema = z.object({
  ad_type: z.enum(Ad_CATEGORIES as [AdCategory, ...AdCategory[]], {
    required_error: "The Ad type is required",
  }),
  title: z.string().min(3, "The title field is required"),
  description: z.string().min(3, "The description field is required"),
  plan: z.string().min(1, "The plan field is required"),
  price: z.coerce.number().min(0, "The price field is required"),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),

  thumbnail: createFileSchema("Thumbnail is required"),
  images: MultiFileSchema("Image validation failed").default([]),
  video: VideoSchema.optional(),

  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),

  year: z.coerce
    .number()
    .min(0, "Year is required")
    .max(new Date().getFullYear()),
  exterior_color: z.string().min(1, "Color is required"),
  mileage: z.coerce.number().min(1, "Mileage is required"),
  mileage_unit: z.string().optional(),

  fuel_type: z.string().optional(),
  cylinders: z.string().optional(),
  transmission: z.string().optional(),
  under_warranty: z.coerce.boolean().optional(),
  roof: z.string().optional(),

  additional_number: z.string().optional(),
  second_additional_number: z.string().optional(),
  hide_license_plate: z.coerce.boolean().optional(),

  contact_whatsapp: z.coerce.boolean().optional(),
  receive_calls: z.coerce.boolean().optional(),
  xcar_calls: z.coerce.boolean().optional(),
  xcar_chat: z.coerce.boolean().optional(),
});

export type UsedCarAdInterface = z.infer<typeof UsedCarAdSchema>;
