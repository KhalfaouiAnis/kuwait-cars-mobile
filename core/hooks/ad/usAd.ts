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
        mileage: "dmdmmd",
        mark: "kawasaki",
      },
      location: {
        area: "area 1",
        block: "block 1",
        district: "district 1",
      },
      thumbnail: {},
      images: [{}],
      video: {},
    },
  });

  const onSubmit = async (data: VehicleAdInterface) => {
    try {
      console.log(data);
      // router.navigate(`/my-ads`);
    } catch (error) {
      console.log({ error });
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
