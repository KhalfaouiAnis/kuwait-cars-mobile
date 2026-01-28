import { z } from "zod";
import {
    AreaSchema,
    BaseAdSchema,
    LocationSchema,
    ProvinceSchema,
} from "../shared";

export const MotorcycleAdSchema = BaseAdSchema.extend({
  price: z.coerce.number().min(1),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),

  brand: z.string().min(1),
  year: z.coerce.number().min(1).max(new Date().getFullYear()),
  exterior_color: z.string().min(1),
  mileage: z.coerce.number().min(1),
  mileage_unit: z.string().optional(),

  fuel_type: z.string().optional(),
  cylinders: z.string().optional(),
  transmission: z.string().optional(),
  under_warranty: z.coerce.boolean().optional(),
});

export type MotorcycleAdInterface = z.infer<typeof MotorcycleAdSchema>;
