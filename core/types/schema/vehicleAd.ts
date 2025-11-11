import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue
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

      model: z.string().optional(),
      body_type: z.string().optional(),
      fuel_type: z.string().optional(),
      color_interior: z.string().optional(),
      seats_material: z.string().optional(),
      body_condition: z.string().optional(),
      cylinders: z.string().optional(),
      transmission: z.string().optional(),
      description: z.string().optional(),
      additional_number: z.string().optional(),
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
