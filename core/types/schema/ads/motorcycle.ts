import { z } from "zod";
import {
  AreaSchema,
  BaseAdSchema,
  LocationSchema,
  ProvinceSchema,
} from "../shared";

export const MotorcycleAdSchema = BaseAdSchema.extend({
  price: z.coerce.number({ message: "required" }),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),

  brand: z.string({ message: "required" }),
  year: z.coerce
    .number({ message: "required" })
    .min(0)
    .max(new Date().getFullYear()),
  exterior_color: z.string({ message: "required" }),
  mileage: z.coerce.number({ message: "required" }),
  mileage_unit: z.string({ message: "required" }).optional(),

  fuel_type: z.string().optional(),
  cylinders: z.string().optional(),
  transmission: z.string().optional(),
  under_warranty: z.coerce.boolean().optional(),
});

export type MotorcycleAdInterface = z.infer<typeof MotorcycleAdSchema>;
