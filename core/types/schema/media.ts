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
