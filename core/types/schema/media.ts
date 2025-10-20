import {
    ACCEPTED_IMAGE_TYPES,
    ACCEPTED_VIDEO_TYPES,
    MAX_IMAGE_SIZE,
    MAX_VIDEO_SIZE,
} from "@/core/constants";
import { z } from "zod";

export const AvatarSchema = z.object({
  avatar: z
    .custom<File>((val) => {
      return (
        typeof val === "object" &&
        val !== null &&
        "mimetype" in val &&
        typeof val.mimetype === "string" &&
        val.mimetype?.startsWith("image/") &&
        "size" in val &&
        (val.size as number) <= 5 * 1024 * 1024 // 5MB
      );
    }, "Avatar must be a valid image file under 5MB")
    .refine(
      (file) => file.size <= MAX_IMAGE_SIZE,
      `File size must be less than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      `File must be a supported image format (${ACCEPTED_IMAGE_TYPES.join(
        ","
      )})`
    ),
});

export const VideoSchema = z.object({
  video: z
    .custom<File>(() => {},
    `Video must be a valid video file under ${MAX_VIDEO_SIZE}MB`)
    .refine(
      (file) => file.size <= MAX_VIDEO_SIZE,
      `File size must be less than ${MAX_VIDEO_SIZE / (1024 * 1024)}MB`
    )
    .refine(
      (file) => ACCEPTED_VIDEO_TYPES.includes(file.type),
      `File must be a supported video format (${ACCEPTED_VIDEO_TYPES.join(
        ","
      )})`
    ),
});
