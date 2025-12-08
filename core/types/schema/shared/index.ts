import { MAX_IMAGE_SIZE, MAX_VIDEO_SIZE } from "@/core/constants";
import { Ad_CATEGORIES } from "@/core/constants/ad";
import { z } from "zod";

export type AdCategory = (typeof Ad_CATEGORIES)[number];

export const LocationSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export const ZipCodeSchema = z.object({
  code: z.coerce.number(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export type LocationInterface = z.infer<typeof LocationSchema>;

export const VideoSchema = z
  .object({
    uri: z.string().url().or(z.string().startsWith("file://")).optional(),
    type: z.string().optional(),
    duration: z.coerce.number().optional(),
    name: z.string().optional(),
    size: z.coerce.number().optional(),
  })
  .refine(
    (file) => {
      if (!file.uri) return true;

      try {
        if (!file.type?.startsWith("video/")) {
          return false;
        }
        if (file.size && file.size > MAX_VIDEO_SIZE) {
          return false;
        }

        const durationMs = file?.duration;
        if (durationMs && (durationMs < 10000 || durationMs > 30000)) {
          return false;
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    { message: "File validation failed" }
  );

export const createFileSchema = (customMessage?: string) =>
  z
    .object({
      uri: z.string().url().or(z.string().startsWith("file://")).optional(),
      type: z.string().optional(),
      name: z.string().optional(),
      duration: z.coerce.number().optional(),
      size: z.coerce.number().optional(),
    })
    .refine(
      (file) => {
        if (!file.uri) return false;
        try {
          if (
            !file.type?.startsWith("image/") ||
            (file.type.startsWith("image/") &&
              file.size &&
              file.size > MAX_IMAGE_SIZE)
          ) {
            return false;
          }

          return true;
        } catch (error) {
          console.log(error);
          throw new Error(customMessage || `Invalid file`);
        }
      },
      { message: customMessage || "File validation failed" }
    );

export const MultiFileSchema = (customMessage?: string) =>
  z.array(createFileSchema(customMessage));

interface Mark {
  label: string;
  value: string;
}
interface Brand {
  label: string;
  marks?: Mark[];
}
interface Region {
  label: string;
  brands?: Brand[];
}
interface Category {
  value: string;
  label: string;
  id?: string;
  regions?: Region[];
  icon?: string;
}
export type DataItem = Category;
