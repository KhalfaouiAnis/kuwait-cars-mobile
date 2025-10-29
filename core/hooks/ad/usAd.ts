import { PostCarAdInterface, PostCarAdSchema } from "@/core/types/schema/carAd";
import { useRouter } from "expo-router";
import { useFormHook } from "../use-form-hook";

export function useAd() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    trigger,
    reset,
  } = useFormHook(PostCarAdSchema, {
    defaultValues: {},
  });

  const onSubmit = async (data: PostCarAdInterface) => {
    try {
      router.navigate(`/my-ads`);
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isDirty,
    trigger,
    reset,
  };
}
