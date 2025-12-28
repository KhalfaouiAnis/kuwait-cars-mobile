import { z } from "zod";
import {
  AreaSchema,
  BaseAdSchema,
  LocationSchema,
  ProvinceSchema
} from "../shared";

export const MotorcycleAdSchema = BaseAdSchema.extend({
  price: z.coerce.number().min(0, "The price field is required"),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),

  brand: z.string().min(1, "Brand is required"),

  year: z.string().min(1, "Year is required"),
  exterior_color: z.string().min(1, "Color is required"),
  mileage: z.coerce.number().min(1, "Mileage is required"),
  mileage_unit: z.string().optional(),

  fuel_type: z.string().optional(),
  cylinders: z.string().optional(),
  transmission: z.string().optional(),
  under_warranty: z.coerce.boolean().optional(),

  hide_license_plate: z.coerce.boolean().optional(),
});

export type MotorcycleAdInterface = z.infer<typeof MotorcycleAdSchema>;
