import { Ad_CATEGORIES } from "@/core/constants/ad";
import { z } from "zod";
import {
  AdCategory,
  AreaSchema,
  createFileSchema,
  LocationSchema,
  MultiFileSchema,
  ProvinceSchema,
  SubscriptionPlanSchema,
  VideoSchema,
} from "../shared";

export const CommunAdSchema = z.object({
  ad_type: z.enum(Ad_CATEGORIES as [AdCategory, ...AdCategory[]], {
    required_error: "The Ad type is required",
  }),
  title: z.string().min(3, "The title field is required"),
  description: z.string().min(3, "The description field is required"),
  plan: SubscriptionPlanSchema,
  price: z.coerce.number().min(0, "The price field is required"),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),

  thumbnail: createFileSchema("Thumbnail is required"),
  images: MultiFileSchema("Image must be valid file under 5MB").optional(),
  video: VideoSchema,

  additional_number: z.string().optional(),
  second_additional_number: z.string().optional(),
  hide_license_plate: z.coerce.boolean().optional(),

  contact_whatsapp: z.coerce.boolean().optional(),
  receive_calls: z.coerce.boolean().optional(),
  xcar_calls: z.coerce.boolean().optional(),
  xcar_chat: z.coerce.boolean().optional(),
});

export type CommunAdInterface = z.infer<typeof CommunAdSchema>;
