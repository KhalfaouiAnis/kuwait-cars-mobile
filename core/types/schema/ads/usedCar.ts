import { z } from "zod";
import {
  AreaSchema,
  BaseAdSchema,
  LocationSchema,
  ProvinceSchema,
} from "../shared";

export const UsedCarAdSchema = BaseAdSchema.extend({
  price: z.coerce
    .number({ message: "required" })
    .min(0, { message: "required" }),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),

  brand: z.string({ message: "required" }),
  model: z.string({ message: "required" }),

  year: z.coerce
    .number({ message: "required" })
    .min(0)
    .max(new Date().getFullYear()),
  exterior_color: z.string({ message: "required" }),
  mileage: z.coerce.number({ message: "required" }),
  mileage_unit: z.string().optional(),

  fuel_type: z.string().optional(),
  cylinders: z.string().optional(),
  transmission: z.string().optional(),
  under_warranty: z.coerce.boolean().optional(),
  roof: z.string().optional(),
});

export type UsedCarAdInterface = z.infer<typeof UsedCarAdSchema>;
