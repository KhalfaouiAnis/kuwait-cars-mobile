import { httpClient } from "@/core/api/httpClient";
import { uploadStructuredMedia } from "@/core/services/cloud/cloudinary";
import { hideLisencePlate } from "@/core/services/cloud/lisence-plate";
import {
  UsedCarAdInterface,
  UsedCarAdSchema,
} from "@/core/types/schema/ads/usedCar";
import { AxiosProgressEvent, isAxiosError } from "axios";
import { useFormHook } from "../../use-form-hook";

export function useUsedCarAd() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
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
      ad_type: "used_cars",
      hide_license_plate: false,
    },
  });

  const onSubmit = async (
    data: UsedCarAdInterface,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) => {
    try {
      const { thumbnail, video, images, province, ...adData } = data;

      const { thumbnailData, imagesData, videoData } =
        await uploadStructuredMedia(thumbnail, images, video);

      let finalUrl = thumbnailData.transformed_url;
      console.log("data.hide_license_plate: ", data.hide_license_plate);

      if (data.hide_license_plate) {
        finalUrl = await hideLisencePlate(thumbnailData.transformed_url);
      }

      const media = [
        { ...thumbnailData, transformedUrl: finalUrl, media_type: "THUMBNAIL" },
        ...imagesData.map((image) => ({ ...image, media_type: "IMAGE" })),
      ];

      if (videoData) {
        media.push({ ...videoData, media_type: "VIDEO" });
      }

      const response = await httpClient.post(
        "/ads/create",
        {
          ...adData,
          media,
          province: {
            province: province.province,
            latitude: province.latitude,
            longitude: province.longitude,
          },
        },
        {
          onUploadProgress,
        }
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          console.log("Network error - Check baseURL, IP, or CORS");
        }
        console.log(error.response?.data);
      }
      console.error("Submit error:", error);
    }
  };

  return {
    control,
    setValue,
    getValues,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    dirtyFields,
    isDirty,
    trigger,
    reset,
  };
}
