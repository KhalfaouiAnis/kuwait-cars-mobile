import {
  UploadFileType,
  useAdMutation,
} from "@/core/services/ads/ad.mutations";
import {
  ShowCarAdInterface,
  ShowCarAdSchema,
} from "@/core/types/schema/ads/showCar";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import { useUploadMedia } from "../../shared/use-upload-media";
import { useFormHook } from "../../use-form-hook";

export function useShowCarAd() {
  const { totalProgress, setFileProgress, upload } = useUploadMedia();
  const { mutateAsync } = useAdMutation();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    trigger,
    reset,
    setValue,
    getValues,
  } = useFormHook(ShowCarAdSchema, {
    defaultValues: {
      title: "",
      description: "",
      hide_license_plate: false,
      thumbnail: undefined,
      video: undefined,
      images: [],
      xcar_calls: true,
      xcar_chat: true,
      ad_type: "show",
    },
  });

  const onSubmit = async (payload: ShowCarAdInterface) => {
    try {
      const { thumbnail, images, video, ...restData } = payload;
      const media: UploadFileType[] = [
        {
          file: thumbnail,
          media_type: "THUMBNAIL",
          signingParams: { mediaType: "image" },
        },
      ];

      if (video) {
        media.push({
          file: video,
          media_type: "VIDEO",
          signingParams: { mediaType: "video" },
        });
      }

      if (images) {
        images.forEach((image) =>
          media.push({
            file: image,
            media_type: "IMAGE",
            signingParams: { mediaType: "image" },
          })
        );
      }

      const uploadResponse = await upload(media);

      await mutateAsync(
        {
          ...restData,
          media: [...uploadResponse],
        },
        {
          onError(error) {
            toast.error(error.message);
          },
          onSuccess() {
            router.replace("/create/success");
          },
          onSettled() {
            setFileProgress({});
          },
        }
      );
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          console.log("Network error - Check baseURL, IP, or CORS");
        }
      }
    }
  };

  return {
    errors,
    isDirty,
    control,
    dirtyFields,
    totalProgress,
    handleSubmit,
    getValues,
    setValue,
    onSubmit,
    trigger,
    reset,
  };
}
