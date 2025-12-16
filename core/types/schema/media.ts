import { MAX_VIDEO_SIZE } from "@/core/constants";
import { z } from "zod";

export const AvatarSchema = z.object({
  avatar: z.custom<File>((val) => {
    return (
      typeof val === "object" &&
      val !== null &&
      "mimetype" in val &&
      typeof val.mimetype === "string" &&
      val.mimetype?.startsWith("image/") &&
      "size" in val &&
      (val.size as number) <= 5 * 1024 * 1024 // 5MB
    );
  }, "Avatar must be a valid image file under 5MB"),
});

export const VideoSchema = z.object({
  video: z.custom<File>(() => {},
  `Video must be a valid video file under ${MAX_VIDEO_SIZE}MB`),
});
