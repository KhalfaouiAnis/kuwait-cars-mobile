import { z } from "zod";

export const PostCarAdSchema = z.object({
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Please enter a valid location"),
  title: z.string().min(1, "Title is required"),
  price: z.coerce.number().min(0, "Price is required"),
  year: z.coerce.number().min(1, "Year is required"),
  color_exterior: z.string().min(1, "Color is required"),
  mileage: z.coerce.number().min(1, "Mileage is required"),
  model: z.string().optional(),
  model_type: z.string().optional(),
  fuel_type: z.string().optional(),
  color_interior: z.string().optional(),
  seats_material: z.string().optional(),
  body_condition: z.string().optional(),
  import: z.string().optional(),
  cylinders: z.string().optional(),
  transmission: z.string().optional(),
  description: z.string().optional(),
  additional_number: z.string().optional(),
  plan: z.string()
  //   photos:
  //   video:
});

export type PostCarAdInterface = z.infer<typeof PostCarAdSchema>;
