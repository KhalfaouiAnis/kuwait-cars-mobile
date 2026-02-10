import { Ad_CATEGORIES } from "@/core/constants/ad";
import { z } from "zod";

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
  { message: "Video File validation failed" },
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
    { message: customMessage || "Image File validation failed" },
  );

export const AdMediaAssetSchema = z
  .object({
    id: z.string(),
    uri: z.string().optional(),
    type: z.string().optional(),
    name: z.string().optional(),
    public_id: z.string().optional(),
    size: z.coerce.number().optional(),
    duration: z.coerce.number().optional(),
    original_url: z.string().url().optional(),
    transformed_url: z.string().url().optional(),
    media_type: z.enum(["THUMBNAIL", "IMAGE", "VIDEO"]),
  })
  .refine((data) => data.uri || data.original_url, {
    message: "Asset must have either a local URI or a remote URL",
    path: ["uri"],
  });

export const BaseAdSchema = z.object({
  ad_type: z.enum(Ad_CATEGORIES as [AdCategory, ...AdCategory[]]),
  ad_category: z.string().optional(),
  title: z.string().min(3),
  description: z.string().min(3),
  plan: SubscriptionPlanSchema,
  is_paid: z.boolean().optional(),
  is_free: z.boolean().optional(),
  // thumbnail: AdMediaAssetSchema,
  // images: z.array(AdMediaAssetSchema).optional(),
  media: z.array(AdMediaAssetSchema).min(1),
  video: VideoSchema.nullish(),

  additional_number: z.string().optional(),
  second_additional_number: z.string().optional(),

  contact_whatsapp: z.coerce.boolean().optional(),
  receive_calls: z.coerce.boolean().optional(),
  xcar_calls: z.coerce.boolean().optional(),
  xcar_chat: z.coerce.boolean().optional(),
  hide_license_plate: z.coerce.boolean().optional().default(false),
});

export const AdDraftInputSchema = z.object({
  ad_type: z.string(),
  step_index: z.coerce.number().int().min(0),
  content: z.record(z.string(), z.any()),
});

export const MediaSchema = z.object({
  uri: z.string().url().or(z.string().startsWith("file://")),
  type: z.string().optional(),
  name: z.string().optional(),
  id: z.string().optional(),
  duration: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
});

export type AdMediaAsset = z.infer<typeof AdMediaAssetSchema>;

export const PaymentObjectSchema = z.object({
  amount: z.object({
    currency: z.enum(["KWD"]),
    value: z.coerce.number(),
  }),
  language: z.enum(["en", "ar"]).optional(),
  urls: z.object({ successUrl: z.string(), errorUrl: z.string() }).optional(),
  customer: z.optional(
    z.object({
      fullName: z.string().optional(),
      phoneNumber: z.string().optional(),
    }),
  ),
  description: z.string().optional(),
  order: z
    .object({
      ref: z.string().optional(),
      placedAt: z.date(),
      products: z.array(
        z.object({
          nameEn: z.string(),
          nameAr: z.string(),
          qty: z.coerce.number(),
          price: z.coerce.number(),
        }),
      ),
    })
    .optional(),
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
export type PaymentObjectInterface = z.infer<typeof PaymentObjectSchema>;
export type LocationInterface = z.infer<typeof LocationSchema>;
export type ProvinceInterface = z.infer<typeof ProvinceSchema>;
export type AreaInterface = z.infer<typeof AreaSchema>;
export type MediaInterface = z.infer<typeof MediaSchema>;

export type BaseAdInterface = z.infer<typeof BaseAdSchema>;

export type AdDraftInput = z.infer<typeof AdDraftInputSchema>;
export interface AdDraftInterface {
  id: string;
  content: any;
  ad_type: string;
  step_index: number;
  updated_at: number;
}
