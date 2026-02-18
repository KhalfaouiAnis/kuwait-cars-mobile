import { z } from "zod";
import {
  AreaSchema,
  BaseAdSchema,
  LocationSchema,
  ProvinceSchema,
} from "../shared";

export const UsedCarAdSchema = BaseAdSchema.extend({
  price: z.coerce.number().min(0),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),
  year: z.coerce.number().min(0).max(new Date().getFullYear()),
  exterior_color: z.string().min(0),
  mileage: z.coerce.number().min(0),
  mileage_unit: z.string().optional(),

  fuel_type: z.string().optional(),
  cylinders: z.string().optional(),
  transmission: z.string().optional(),
  under_warranty: z.coerce.boolean().optional(),
  roof: z.string().optional(),
});

export type UsedCarAdInterface = z.infer<typeof UsedCarAdSchema>;
