import { httpClient } from "@/core/lib/api/httpClient";
import { authStore } from "@/core/lib/stores/auth.store";
import {
  ResetPasswordInterface,
  ResetPasswordSchema,
} from "@/core/types/schema/auth";
import {
  UpdateProfileInterface,
  UpdateProfileSchema,
} from "@/core/types/schema/user";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import { useFormHook } from "../use-form-hook";

export function useProfile(defaultValues?: UpdateProfileInterface) {
  const { setUser } = authStore.getState();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormHook(UpdateProfileSchema, {
    defaultValues,
  });

  const onSubmit = async (data: UpdateProfileInterface) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (["string", "number"].includes(typeof value)) {
          formData.append(key, value as string);
        }
      });

      if (data.avatar) {
        formData.append("image", data.avatar as any);
      }

      const response = await httpClient.patch("/users", formData);

      setUser(response.data);
      router.navigate("/profile");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.log("Bad Request:", error.response.data);
        }
      }
      console.error("Submit error:", error);
    }
  };

  return { control, setValue, handleSubmit, onSubmit, errors, isSubmitting };
}

export function useUpdatePassword(phone?: string) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormHook(ResetPasswordSchema, {
    defaultValues: { phone },
  });

  const onSubmit = async (data: ResetPasswordInterface) => {
    try {
      const formData = new FormData();

      formData.append("password", data.password);

      await httpClient.patch("/users", formData);
      toast.success("Password updated successfully.");
      router.navigate("/profile");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.log("Bad Request:", error.response.data);
        }
      }
      console.error("Submit error:", error);
    }
  };

  return { control, setValue, handleSubmit, onSubmit, errors, isSubmitting };
}
