import {
  VehicleAdInterface,
  VehicleAdSchema,
} from "@/core/types/schema/vehicleAd";
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
    setValue,
  } = useFormHook(VehicleAdSchema, {
    defaultValues: {},
  });

  const onSubmit = async (data: VehicleAdInterface) => {
    try {
      router.navigate(`/my-ads`);
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    control,
    setValue,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isDirty,
    trigger,
    reset,
  };
}
