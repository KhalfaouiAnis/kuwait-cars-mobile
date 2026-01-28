import {
  UploadFileType,
  useAdMutation,
} from "@/core/services/ads/ad.mutations";
import { hideLisencePlate } from "@/core/services/cloud/lisence-plate";
import {
  CommunAdInterface,
  CommunAdSchema,
} from "@/core/types/schema/ads/commun";
import { isAxiosError } from "axios";
import { toast } from "sonner-native";
import { useUploadMedia } from "../../shared/use-upload-media";
import { useFormHook } from "../../use-form-hook";

export function useCommunAd() {
  const { totalProgress, setFileProgress, upload } = useUploadMedia();
  const { mutateAsync } = useAdMutation();

  const form = useFormHook(CommunAdSchema, {
    defaultValues: {
      title: "",
      description: "",
      hide_license_plate: false,
      thumbnail: undefined,
      images: [],
      video: undefined,
      contact_whatsapp: true,
      receive_calls: true,
      xcar_calls: true,
      xcar_chat: true,
    },
  });

  const onSubmit = async (payload: CommunAdInterface) => {
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
          }),
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
          onSuccess() {},
          onSettled() {
            setFileProgress({});
          },
        },
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
    ...form,
    onSubmit,
    totalProgress,
  };
}
