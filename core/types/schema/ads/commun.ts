import { z } from "zod";
import {
  AreaSchema,
  BaseAdSchema,
  LocationSchema,
  ProvinceSchema
} from "../shared";

export const CommunAdSchema = BaseAdSchema.extend({
  price: z.coerce.number().min(0, "The price field is required"),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),

  hide_license_plate: z.coerce.boolean().optional(),
});

export type CommunAdInterface = z.infer<typeof CommunAdSchema>;
