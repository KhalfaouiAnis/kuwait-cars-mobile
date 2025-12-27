import { Ad_CATEGORIES } from "@/core/constants/ad";
import { z } from "zod";
import { CommunAdInterface } from "../ads/commun";
import { MotorcycleAdInterface } from "../ads/motorcycle";
import { ShowCarAdInterface } from "../ads/showCar";
import { SparePartAdInterface } from "../ads/sparePart";
import { UsedCarAdInterface } from "../ads/usedCar";

export type AdCategory = (typeof Ad_CATEGORIES)[number];

export const SubscriptionPlanSchema = z.object({
  type: z.string(),
  title: z.string(),
  price: z.coerce.number(),
  expires_in: z.coerce.number(),
  features: z.array(z.string()),
});

export const LocationSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export const AreaSchema = z.object({
  area: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export const ProvinceSchema = z.object({
  province: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export const VideoSchema = z.object(
  {
    uri: z.string().url().or(z.string().startsWith("file://")),
    type: z.string().optional(),
    name: z.string().optional(),
    id: z.string().optional(),
    duration: z.coerce.number().optional(),
    size: z.coerce.number().optional(),
  },
  { message: "Video File validation failed" }
);

export const createFileSchema = (customMessage?: string) =>
  z.object(
    {
      uri: z.string().url().or(z.string().startsWith("file://")),
      type: z.string().optional(),
      name: z.string().optional(),
      id: z.string().optional(),
      size: z.coerce.number().optional(),
    },
    { message: customMessage || "Image File validation failed" }
  );

export const MultiFileSchema = (customMessage?: string) =>
  z.array(createFileSchema(customMessage));

export const BaseAdSchema = z.object({
  ad_type: z.enum(Ad_CATEGORIES as [AdCategory, ...AdCategory[]], {
    required_error: "The Ad type is required",
  }),
  title: z.string().min(3, "The title field is required"),
  description: z.string().min(3, "The description field is required"),
  plan: SubscriptionPlanSchema,
  thumbnail: createFileSchema("Thumbnail is required"),
  images: MultiFileSchema("Image must be valid file under 5MB").optional(),
  video: VideoSchema.nullish(),

  additional_number: z.string().optional(),
  second_additional_number: z.string().optional(),

  contact_whatsapp: z.coerce.boolean().optional(),
  receive_calls: z.coerce.boolean().optional(),
  xcar_calls: z.coerce.boolean().optional(),
  xcar_chat: z.coerce.boolean().optional(),
});

export const MediaSchema = z.object({
  uri: z.string().url().or(z.string().startsWith("file://")),
  type: z.string().optional(),
  name: z.string().optional(),
  id: z.string().optional(),
  duration: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
});

interface Mark {
  label: string;
  value: string;
}
interface Brand {
  label: string;
  models?: Mark[];
}
interface Region {
  label: string;
  brands?: Brand[];
}
interface Category {
  value: string;
  label: string;
  id?: string;
  regions?: Region[];
  icon?: string;
}

export type DataItem = Category;

export type SubscriptionPlanType = z.infer<typeof SubscriptionPlanSchema>;
export type LocationInterface = z.infer<typeof LocationSchema>;
export type ProvinceInterface = z.infer<typeof ProvinceSchema>;
export type AreaInterface = z.infer<typeof AreaSchema>;
export type BaseAdInterface = z.infer<typeof BaseAdSchema>;
export type MediaInterface = z.infer<typeof MediaSchema>;

export type AdvretisementFormData =
  | UsedCarAdInterface
  | SparePartAdInterface
  | ShowCarAdInterface
  | MotorcycleAdInterface
  | CommunAdInterface;
