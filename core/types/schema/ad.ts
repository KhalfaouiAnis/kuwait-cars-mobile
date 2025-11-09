import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_VIDEO_TYPES,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
} from "@/core/constants";
import { z } from "zod";

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
    fileSize: z.coerce.number().optional(),
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
          file.fileSize &&
          file.fileSize > MAX_IMAGE_SIZE
        ) {
          throw new Error(
            `Image size must be ${MAX_IMAGE_SIZE / (1024 * 1024)}MB or less.`
          );
        }

        if (
          file.type.startsWith("video/") &&
          file.fileSize &&
          file.fileSize > MAX_VIDEO_SIZE
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
      uri: z.string().url().or(z.string().startsWith("file://")),
      type: z.string(),
      name: z.string().optional(),
      duration: z.coerce.number().optional(),
      fileSize: z.coerce.number().optional(),
    })
    .refine(
      (file) => {
        if (!file.uri)
          return customMessage || "This file is required";
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
            file.fileSize &&
            file.fileSize > MAX_IMAGE_SIZE
          ) {
            throw new Error(
              `Image size must be ${MAX_IMAGE_SIZE / (1024 * 1024)}MB or less.`
            );
          }

          if (
            file.type.startsWith("video/") &&
            file.fileSize &&
            file.fileSize > MAX_VIDEO_SIZE
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
          throw new Error(customMessage || `Invalid file`);
        }
      },
      { message: customMessage || "File validation failed", path: ["url"] }
    );

export const MultiFileSchema = (customMessage?: string) =>
  z.array(createFileSchema(customMessage));

export const BaseAdSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(3, "Title is required"),
  year: z.coerce
    .number({ message: "Year field is required" })
    .min(0)
    .max(new Date().getFullYear()),
  price: z.coerce.number().optional(),

  category_id: z.string(),
  subcategory_id: z.string(),

  location: LocationSchema,
  thumbnail: createFileSchema("Thumbnail must be a valid image under 5MB"),
  images: MultiFileSchema("Images must be valid files under 5MB each"),
  video: createFileSchema("Video must be 10-30 seconds and under 100MB"),
  plan: z.string(),

  additional_number: z.string().optional(),
});

export type LocationInterface = z.infer<typeof LocationSchema>;
export type BaseAdInterface = z.infer<typeof BaseAdSchema>;
