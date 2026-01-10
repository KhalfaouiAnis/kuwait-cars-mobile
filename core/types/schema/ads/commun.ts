import { z } from "zod";
import {
  AreaSchema,
  BaseAdSchema,
  LocationSchema,
  ProvinceSchema,
} from "../shared";

export const CommunAdSchema = BaseAdSchema.extend({
  price: z.coerce.number({ message: "required" }),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),
});

export type CommunAdInterface = z.infer<typeof CommunAdSchema>;
