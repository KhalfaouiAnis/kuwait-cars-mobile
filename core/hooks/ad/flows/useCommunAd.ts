import {
  CommunAdInterface,
  CommunAdSchema,
} from "@/core/types/schema/ads/commun";
import { AxiosProgressEvent, isAxiosError } from "axios";
import { useRouter } from "expo-router";
import { useFormHook } from "../../use-form-hook";

export function useCommunAd() {
  const router = useRouter();

  const {
    control,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    handleSubmit,
    trigger,
    reset,
    setValue,
    getValues,
  } = useFormHook(CommunAdSchema, {
    defaultValues: {
      title: "title",
      description: "description",
      plan: "pro",
      thumbnail: {},
      images: [],
      video: {},
      contact_whatsapp: true,
      receive_calls: true,
      xcar_calls: true,
      xcar_chat: true,
    },
  });

  const onSubmit = async (
    data: CommunAdInterface,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) => {
    try {
      const formData = new FormData();

      console.log(data);

      Object.entries(data).forEach(([key, value]) => {
        if (["string", "number"].includes(typeof value)) {
          formData.append(key, value as string);
        }
      });

      formData.append("thumbnail", data.thumbnail as any);
      formData.append("video", data.video as any);
      data.images?.forEach((image) => formData.append("images", image as any));

      // const response = await httpClient.post("/ads/create", formData, {
      //   onUploadProgress,
      // });

      // console.log(response.data);

      // router.replace("/my-ads");
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
    errors,
    isSubmitting,
    dirtyFields,
    isDirty,
    setValue,
    getValues,
    handleSubmit,
    onSubmit,
    trigger,
    reset,
  };
}
