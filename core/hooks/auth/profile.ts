import {
    UpdateProfileInterface,
    UpdateProfileSchema,
} from "@/core/types/schema/user";
import { useRouter } from "expo-router";
import { useFormHook } from "../use-form-hook";

export function useProfile() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormHook(UpdateProfileSchema, {
    defaultValues: {
      email: "",
      fullname: "",
      phone: "",
      city: "",
      zip: "",
    },
  });

  const onSubmit = async (data: UpdateProfileInterface) => {
    try {
      router.navigate(`/profile`);
    } catch (error) {
      console.log({ error });
    }
  };

  return { control, handleSubmit, onSubmit, errors, isSubmitting };
}
