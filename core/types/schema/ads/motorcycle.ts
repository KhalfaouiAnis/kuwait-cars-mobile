import { Ad_CATEGORIES } from "@/core/constants/ad";
import { z } from "zod";
import {
  AdCategory,
  createFileSchema,
  LocationSchema,
  MultiFileSchema,
  VideoSchema,
} from "../shared";

export const MotorcycleAdSchema = z.object({
  ad_type: z.enum(Ad_CATEGORIES as [AdCategory, ...AdCategory[]], {
    required_error: "The Ad type is required",
  }),
  category: z.string().min(3, "The category field is required"),
  title: z.string().min(3, "The title field is required"),
  description: z.string().min(3, "The description field is required"),
  plan: z.string().min(1, "The plan field is required"),
  price: z.coerce.number().min(0, "The price field is required"),
  province: z.string().min(1, "The province field is required"),
  location: LocationSchema.optional(),
  zip_code: z.string().optional(),

  thumbnail: createFileSchema("Thumbnail is required"),
  images: MultiFileSchema("Image must be valid file under 5MB").optional(),
  video: VideoSchema,

  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),

  year: z.string().min(1, "Year is required"),
  exterior_color: z.string().min(1, "Color is required"),
  mileage: z.string().min(1, "Mileage is required"),
  mileage_unit: z.string().optional(),

  fuel_type: z.string().optional(),
  cylinders: z.string().optional(),
  transmission: z.string().optional(),
  under_warranty: z.coerce.boolean().optional(),

  additional_number: z.string().optional(),
  contact_whatsapp: z.coerce.boolean().optional(),
  receive_calls: z.coerce.boolean().optional(),
  xcar_calls: z.coerce.boolean().optional(),
  xcar_chat: z.coerce.boolean().optional(),
  hide_license_plate: z.coerce.boolean().optional(),
});

export type MotorcycleAdInterface = z.infer<typeof MotorcycleAdSchema>;
