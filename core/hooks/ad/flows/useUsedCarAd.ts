import { httpClient } from "@/core/lib/api/httpClient";
import {
    UsedCarAdInterface,
    UsedCarAdSchema,
} from "@/core/types/schema/ads/usedCar";
import { AxiosProgressEvent, isAxiosError } from "axios";
import { useRouter } from "expo-router";
import { useFormHook } from "../../use-form-hook";

export function useUsedCarAd() {
  const router = useRouter();

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
      title: "title",
      plan: "pro",
      price: 222,
      mileage: "125,320 KM",
      model: "kawasaki",
      brand: "fff",
      location: {
        area: "area 1",
        block: "block 1",
        district: "district 1",
      },
      thumbnail: {},
      images: [],
      video: {},
      ad_type: "cars_for_sale",
    },
  });

  const onSubmit = async (
    data: UsedCarAdInterface,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (["string", "number"].includes(typeof value)) {
          formData.append(key, value as string);
        }
      });

      formData.append("location", JSON.stringify(data.location));
      formData.append("thumbnail", data.thumbnail as any);
      formData.append("video", data.video as any);
      data.images?.forEach((image) => formData.append("images", image as any));

      const response = await httpClient.post("/ads/create", formData, {
        onUploadProgress,
      });

      console.log(response.data);

      router.navigate("/my-ads");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          console.log("Network error - Check baseURL, IP, or CORS");
        }
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
