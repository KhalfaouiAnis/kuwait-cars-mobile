import {
  UploadFileType,
  useAdMutation,
} from "@/core/services/ads/ad.mutations";
import { hideLisencePlate } from "@/core/services/cloud/lisence-plate";
import {
  UsedCarAdInterface,
  UsedCarAdSchema,
} from "@/core/types/schema/ads/usedCar";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import { toast } from "sonner-native";
import { useUploadMedia } from "../../shared/use-upload-media";
import { useFormHook } from "../../use-form-hook";

export function useUsedCarAd() {
  const { totalProgress, setFileProgress, upload } = useUploadMedia();
  const { mutateAsync } = useAdMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    trigger,
    reset,
    setValue,
    getValues,
  } = useFormHook(UsedCarAdSchema, {
    defaultValues: {
      title: "",
      description: "",
      mileage_unit: "KM",
      contact_whatsapp: true,
      receive_calls: true,
      xcar_calls: true,
      xcar_chat: true,
      thumbnail: undefined,
      images: [],
      video: undefined,
      hide_license_plate: false,
      ad_type: "used_cars",
    },
  });

  const onSubmit = async (payload: UsedCarAdInterface) => {
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

      let finalUrl = uploadResponse[0].transformed_url;

      if (payload.hide_license_plate) {
        finalUrl = await hideLisencePlate(finalUrl!);
        uploadResponse[0].transformed_url = finalUrl;
      }

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
    control,
    setValue,
    getValues,
    handleSubmit,
    onSubmit,
    errors,
    dirtyFields,
    isDirty,
    trigger,
    reset,
    totalProgress,
  };
}
