import { z } from "zod";
import {
  AreaSchema,
  createFileSchema,
  LocationSchema,
  MultiFileSchema,
  ProvinceSchema,
  SubscriptionPlanSchema,
  VideoSchema,
} from ".";

const LocationInfo = {
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),
};

const MediaInfo = {
  thumbnail: createFileSchema("required"),
  images: MultiFileSchema().optional(),
};

const PricingInfo = {
  title: z.string().min(3),
  description: z.string().min(3),
  price: z.coerce.number().min(1),
};

const ContactInfo = {
  additional_number: z.string().optional(),
  second_additional_number: z.string().optional(),

  contact_whatsapp: z.coerce.boolean().optional(),
  receive_calls: z.coerce.boolean().optional(),
  xcar_calls: z.coerce.boolean().optional(),
  xcar_chat: z.coerce.boolean().optional(),
};

export const StepSchemas = {
  basic_info: z.object({
    year: z.coerce.number().min(1900),
    exterior_color: z.string(),
    mileage: z.coerce.number(),
    hide_license_plate: z.coerce.boolean().default(false),
    fuel_type: z.string(),
    transmission: z.string(),
    under_warranty: z.coerce.boolean(),
  }),
  media: z.object(MediaInfo),
  video: z.object({ video: VideoSchema.nullish() }),
  detailed_info: z.object({ ...LocationInfo, ...PricingInfo }),
  detailed_info_2: z.object(ContactInfo),
  choose_plan: z.object({ plan: SubscriptionPlanSchema }),
};

export type StepKey = keyof typeof StepSchemas;
