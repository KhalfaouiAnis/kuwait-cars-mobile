import { httpClient } from "@/core/api/httpClient";
import {
  ResetPasswordInterface,
  ResetPasswordSchema,
} from "@/core/types/schema/auth";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import { useFormHook } from "../use-form-hook";

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

  const onSubmit = async ({ password }: ResetPasswordInterface) => {
    try {
      await httpClient.patch("/users", { password });

      toast.success("Password updated successfully.");
      router.navigate("/profile");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return { control, setValue, handleSubmit, onSubmit, errors, isSubmitting };
}
