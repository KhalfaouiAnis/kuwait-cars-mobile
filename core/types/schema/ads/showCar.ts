import { z } from "zod";
import { BaseAdSchema } from "../shared";

export const ShowCarAdSchema = BaseAdSchema.extend({
  sound_effect: z.string().optional(),
  hide_license_plate: z.coerce.boolean().optional(),
});

export type ShowCarAdInterface = z.infer<typeof ShowCarAdSchema>;
