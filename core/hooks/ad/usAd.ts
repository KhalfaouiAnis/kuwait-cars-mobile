import { httpClient } from "@/core/lib/api/httpClient";
import {
  VehicleAdInterface,
  VehicleAdSchema,
} from "@/core/types/schema/vehicleAd";
import { AxiosProgressEvent, isAxiosError } from "axios";
import { useRouter } from "expo-router";
import { useFormHook } from "../use-form-hook";

export function useAd() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    trigger,
    reset,
    setValue,
    getValues,
  } = useFormHook(VehicleAdSchema, {
    defaultValues: {
      title: "title",
      plan: "pro",
      price: 222,
      car: {
        mileage: "125,320 KM",
        mark: "kawasaki",
        brand: "fff",
      },
      location: {
        area: "area 1",
        block: "block 1",
        district: "district 1",
      },
      thumbnail: {},
      images: [],
      video: {},
      category_id: "cars_for_sale",
      subcategory_id: "sport_cars",
    },
  });

  const onSubmit = async (
    data: VehicleAdInterface,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (["string", "number"].includes(typeof value)) {
          formData.append(key, value as string);
        }
      });
      formData.append("car", JSON.stringify(data.car));
      formData.append("location", JSON.stringify(data.location));
      formData.append("thumbnail", data.thumbnail as any);
      formData.append("video", data.video as any);
      data.images.forEach((image) => formData.append("images", image as any));

      const response = await httpClient.post("/ads/create", formData, {
        onUploadProgress,
      });

      console.log(response.data);

      // const response = await fetch(
      //   process.env.EXPO_PUBLIC_API_URL + "/api/ads/create",
      //   {
      //     method: "POST",
      //     body: formData,
      //     headers: {},
      //   }
      // );

      // const json = await response.json();
      // console.log({ json });

      router.navigate("/my-ads");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          console.log("Network error - Check baseURL, IP, or CORS");
        } else if (error.response?.status === 400) {
          console.log("Bad Request:", error.response.data); // Multer details
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
