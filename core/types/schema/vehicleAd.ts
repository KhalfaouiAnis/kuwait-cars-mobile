import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { z } from "zod";

import { BaseAdSchema } from "./ad";

export const VehicleAdSchema = BaseAdSchema.merge(
  z.object({
    car: z.object({
      brand: z.string().min(1, "Brand is required"),
      mark: z.string().min(1, "Mark is required"),
      exterior_color: z.string().min(1, "Color is required"),
      mileage: z.string().min(1, "Mileage is required"),
      mileage_unit: z.string().optional(),
      year: z.coerce
        .number({ message: "The year field is required" })
        .min(0)
        .max(new Date().getFullYear()),

      fuel_type: z.string().optional(),
      cylinders: z.string().optional(),
      transmission: z.string().optional(),
      under_warranty: z.coerce.boolean().optional(),
      roof: z.string().optional(),
    }),
  })
);

export type VehicleAdInterface = z.infer<typeof VehicleAdSchema>;

export interface VehicleAdFormSteps {
  control: Control<VehicleAdInterface>;
  errors: FieldErrors<VehicleAdInterface>;
  setValue?: UseFormSetValue<VehicleAdInterface>;
  getValue?: UseFormGetValues<VehicleAdInterface>;
}

export type VehicleAdFilters = {};
