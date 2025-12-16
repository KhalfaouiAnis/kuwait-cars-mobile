import { Ad_CATEGORIES } from "@/core/constants/ad";
import { z } from "zod";
import {
  AdCategory,
  createFileSchema,
  MultiFileSchema,
  VideoSchema,
} from "../shared";

export const ShowCarAdSchema = z.object({
  ad_type: z.enum(Ad_CATEGORIES as [AdCategory, ...AdCategory[]], {
    required_error: "The Ad type is required",
  }),

  title: z.string().min(3, "The title field is required"),
  description: z.string().min(3, "The description field is required"),
  plan: z.string().min(1, "The plan field is required"),

  thumbnail: createFileSchema("Thumbnail is required"),
  images: MultiFileSchema("Image must be valid file under 5MB").optional(),
  video: VideoSchema,
  sound_effect: z.string().optional(),

  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),

  hide_license_plate: z.coerce.boolean().optional(),
  xcar_calls: z.coerce.boolean().optional(),
  xcar_chat: z.coerce.boolean().optional(),
});

export type ShowCarAdInterface = z.infer<typeof ShowCarAdSchema>;
