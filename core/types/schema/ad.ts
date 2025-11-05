import { z } from "zod";

export const LocationModelSchema = z.object({
  district: z.string(),
  area: z.string(),
  block: z.string(),
});

export const MediaModelSchema = z.object({
  url: z.string(),
  type: z.string(),
  file_name: z.string(),
});

export type LocationInterface = z.infer<typeof LocationModelSchema>;
export type MediaInterface = z.infer<typeof MediaModelSchema>;
