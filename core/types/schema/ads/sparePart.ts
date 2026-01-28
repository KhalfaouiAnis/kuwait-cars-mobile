import { z } from "zod";
import {
    AreaSchema,
    BaseAdSchema,
    LocationSchema,
    ProvinceSchema,
} from "../shared";

export const SparePartAdSchema = BaseAdSchema.extend({
  price: z.coerce.number().min(0),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),
});

export type SparePartAdInterface = z.infer<typeof SparePartAdSchema>;
