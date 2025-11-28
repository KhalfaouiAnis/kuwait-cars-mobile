import { Ad_CATEGORIES } from "@/core/constants/ad";
import { z } from "zod";
import {
  AdCategory,
  createFileSchema,
  LocationSchema,
  MultiFileSchema,
  VideoSchema,
} from "../shared";

export const SparePartAdSchema = z.object({
  ad_type: z.enum(Ad_CATEGORIES as [AdCategory, ...AdCategory[]], {
    required_error: "The Ad type is required",
  }),
  title: z.string().min(3, "The title field is required"),
  description: z.string().min(3, "The description field is required"),
  plan: z.string().min(1, "The plan field is required"),
  location: LocationSchema,
  price: z.coerce.number(),
  province: z.string(),
  zip_code: z.string().optional(),

  thumbnail: createFileSchema("Thumbnail is required"),
  images: MultiFileSchema("Image must be valid file under 5MB").optional(),
  video: VideoSchema,

  additional_number: z.string().optional(),
  contact_whatsapp: z.coerce.boolean().optional(),
  receive_calls: z.coerce.boolean().optional(),
  xcar_calls: z.coerce.boolean().optional(),
  xcar_chat: z.coerce.boolean().optional(),
});

export type SparePartAdInterface = z.infer<typeof SparePartAdSchema>;