import {
  UploadFileType,
  useAdMutation,
} from "@/core/services/ads/ad.mutations";
import {
  SparePartAdInterface,
  SparePartAdSchema,
} from "@/core/types/schema/ads/sparePart";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import { useUploadMedia } from "../../shared/use-upload-media";
import { useFormHook } from "../../use-form-hook";

export function useSparePartAd() {
  const { totalProgress, setFileProgress, upload } = useUploadMedia();
  const { mutateAsync } = useAdMutation();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    trigger,
    reset,
    setValue,
    getValues,
  } = useFormHook(SparePartAdSchema, {
    defaultValues: {
      title: "title",
      description: "description",
      price: 2555,
      thumbnail: undefined,
      images: [],
      video: undefined,
      contact_whatsapp: true,
      receive_calls: true,
      xcar_calls: true,
      xcar_chat: true,
      ad_type: "spare_parts",
    },
  });

  const onSubmit = async (payload: SparePartAdInterface) => {
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
    control,
    isDirty,
    dirtyFields,
    isSubmitting,
    totalProgress,
    handleSubmit,
    getValues,
    setValue,
    onSubmit,
    trigger,
    reset,
  };
}
