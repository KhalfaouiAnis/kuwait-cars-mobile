import { z } from "zod";
import {
  AreaSchema,
  BaseAdSchema,
  LocationSchema,
  ProvinceSchema,
} from "../shared";

export const PartAccessoriesAdSchema = BaseAdSchema.extend({
  price: z.coerce.number().min(0),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),
});

export type SparePartAdInterface = z.infer<typeof PartAccessoriesAdSchema>;
