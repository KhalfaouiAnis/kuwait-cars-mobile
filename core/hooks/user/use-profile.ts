import { httpClient } from "@/core/api/httpClient";
import {
  ResetPasswordInterface,
  ResetPasswordSchema,
} from "@/core/types/schema/auth";
import {
  UpdateProfileInterface,
  UpdateProfileSchema,
} from "@/core/types/schema/user";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import { useFormHook } from "../use-form-hook";

export function useProfile(defaultValues: UpdateProfileInterface | null) {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useFormHook(UpdateProfileSchema, {
    values: defaultValues ?? undefined,
  });

  // const onSubmit = async (data: UpdateProfileInterface) => {
  //   try {
  //     let cloudinaryAvatar;
  //     const { avatar, ...profileData } = data;

  //     if (avatar && "uri" in avatar) {
  //       const { original_url, public_id, transformed_url } =
  //         await uploadFileToCloudinary(
  //           avatar.uri,
  //           { mediaType: "profile_pic" },
  //           avatar.type,
  //           "avatar_" + user?.id
  //         );

  //       cloudinaryAvatar = {
  //         public_id,
  //         original_url,
  //         transformed_url,
  //         media_type: "IMAGE",
  //       };
  //     }

  //     const response = await httpClient.patch("/users", {
  //       ...profileData,
  //       avatar: cloudinaryAvatar,
  //     });

  //     setUser(response.data);
  //     router.navigate("/profile");
  //   } catch (error) {
  //     console.error("Submit error:", error);
  //   }
  // };

  return {
    control,
    setValue,
    getValues,
    handleSubmit,
    errors,
    isSubmitting,
  };
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
