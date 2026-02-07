import { CommunAdSchema } from "./commun";
import { MotorcycleAdSchema } from "./motorcycle";
import { PartAccessoriesAdSchema } from "./partAccessories";
import { ShowCarAdSchema } from "./showCar";
import { UsedCarAdSchema } from "./usedCar";

export const AD_MASTER_SCHEMAS = {
  show: ShowCarAdSchema,
  common: CommunAdSchema,
  used_cars: UsedCarAdSchema,
  motorcycles: MotorcycleAdSchema,
  part_accessories: PartAccessoriesAdSchema,
};

export type AD_MASTER_SCHEMA_KEY = keyof typeof AD_MASTER_SCHEMAS;
