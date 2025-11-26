import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_VIDEO_TYPES,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
} from "@/core/constants";
import { Ad_CATEGORIES } from "@/core/constants/ad";
import { z } from "zod";

export type AdCategory = (typeof Ad_CATEGORIES)[number];

export const LocationSchema = z.object({
  district: z.string(),
  area: z.string(),
  block: z.string(),
});

export const FileSchema = z
  .object({
    uri: z.string().url().or(z.string().startsWith("file://")),
    type: z.string(),
    name: z.string().optional(),
    duration: z.coerce.number().optional(),
    size: z.coerce.number().optional(),
  })
  .refine(
    (file) => {
      if (!file.uri) return false;
      try {
        if (
          !file.type.startsWith("image/") &&
          !file.type.startsWith("video/")
        ) {
          throw new Error(
            `File must be a supported format (${[
              ...ACCEPTED_IMAGE_TYPES,
              ...ACCEPTED_VIDEO_TYPES,
            ].join(",")})`
          );
        }

        if (
          file.type.startsWith("image/") &&
          file.size &&
          file.size > MAX_IMAGE_SIZE
        ) {
          throw new Error(
            `Image size must be ${MAX_IMAGE_SIZE / (1024 * 1024)}MB or less.`
          );
        }

        if (
          file.type.startsWith("video/") &&
          file.size &&
          file.size > MAX_VIDEO_SIZE
        ) {
          throw new Error(
            `Video size must be ${MAX_VIDEO_SIZE / (1024 * 1024)}MB or less.`
          );
        }

        if (file.duration && file.type?.startsWith("video/")) {
          console.log({ duration: file.duration });

          const durationMs = file.duration;
          if (durationMs < 10000 || durationMs > 30000) {
            throw new Error("Video duration must be 10-30s");
          }
        }

        return true;
      } catch (error) {
        console.log(error);
        throw new Error(`Invalid file`);
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
            !file.type?.startsWith("image/") &&
            !file.type?.startsWith("video/")
          ) {
            throw new Error(
              `File must be a supported format (${[
                ...ACCEPTED_IMAGE_TYPES,
                ...ACCEPTED_VIDEO_TYPES,
              ].join(",")})`
            );
          }

          if (
            file.type.startsWith("image/") &&
            file.size &&
            file.size > MAX_IMAGE_SIZE
          ) {
            throw new Error(
              `Image size must be ${MAX_IMAGE_SIZE / (1024 * 1024)}MB or less.`
            );
          }

          if (
            file.type.startsWith("video/") &&
            file.size &&
            file.size > MAX_VIDEO_SIZE
          ) {
            throw new Error(
              `Video size must be ${MAX_VIDEO_SIZE / (1024 * 1024)}MB or less.`
            );
          }

          if (file.duration && file.type?.startsWith("video/")) {
            const durationMs = file.duration;
            if (durationMs < 10000 || durationMs > 30000) {
              throw new Error("Video duration must be 10-30s");
            }
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

export const BaseAdSchema = z.object({
  title: z.string().min(3, "The title field is required"),
  description: z.string().min(3, "The description field is required"),
  location: LocationSchema,

  price: z.coerce.number().optional(),
  province: z.string().optional(),
  zip_code: z.string().optional(),

  category_id: z.enum(Ad_CATEGORIES as [AdCategory, ...AdCategory[]], {
    required_error: "Category is required",
  }),

  thumbnail: createFileSchema("Thumbnail must be a valid image under 5MB"),
  images: MultiFileSchema(
    "Images must be valid files under 5MB each"
  ).optional(),
  video: createFileSchema(
    "Video must be 10-30 seconds and under 100MB"
  ).optional(),

  additional_number: z.string().optional(),

  contact_whatsapp: z.coerce.boolean().optional(),
  receive_calls: z.coerce.boolean().optional(),
  xcar_calls: z.coerce.boolean().optional(),
  xcar_chat: z.coerce.boolean().optional(),
  hide_license_plate: z.coerce.boolean().optional(),

  plan: z.string().min(1, "Plan is required"),
});

export type LocationInterface = z.infer<typeof LocationSchema>;
export type BaseAdInterface = z.infer<typeof BaseAdSchema>;
