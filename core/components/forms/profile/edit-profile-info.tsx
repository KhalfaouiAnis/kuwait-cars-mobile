import { PURE_PROVINCES } from "@/core/constants";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { useUpdateProfile } from "@/core/services/user/user.mutations";
import useAuthStore from "@/core/store/auth.store";
import { UpdateProfileInterface, UpdateProfileSchema } from "@/core/types/schema/user";
import { SelectAdapters } from "@/core/utils/select-adapters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { toast } from "sonner-native";
import AvatarPicker from "../../layout/media/avatar-picker";
import { ProgressButton } from "../../ui/button/progress-button";
import LocationPicker from "../../ui/input/location/location-picker";
import AreaSelector from "../../ui/input/select/area-selector";
import ProvinceSelector from "../../ui/input/select/province-selector";
import BaseTextInput from "../../ui/input/text/base-text-input";

export default function EditProfileForm() {
  const { t } = useTranslation("common");
  const { user } = useAuthStore((state) => state);

  const methods = useForm({
    resolver: zodResolver(UpdateProfileSchema),
    mode: "onTouched",
    values: user ?? undefined
  });

  const { handleSubmit, control } = methods
  const { mutate, isPending } = useUpdateProfile();
  const { protectAction } = useAuthGuard();

  const onError = (errors: any) => {
    console.log("Validation failed:", errors);
  };

  const onSubmit = (data: UpdateProfileInterface) => {
    protectAction(() => mutate(data, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
      },
      onError: (err) => {
        console.log(err.message);
        toast.error(err.message);
      },
    }))
  };

  return (
    <View className="flex-1 mt-2 bg-white px-4 py-2 dark:bg-black">
      <View className="flex-row items-center justify-between w-full px-4 py-1">
        <View>
          <Text className="font-inter-semibold text-xl dark:text-white">
            {user?.fullname}
          </Text>
        </View>
        <AvatarPicker
          user={user}
          control={control as any}
        />
      </View>

      <View className="flex-1 py-2 mt-2 mb-2 gap-y-6 items-center">
        <BaseTextInput
          translatedLabel={t("profile.name")}
          icon="person-outline"
          name="fullname"
          placeholder={t("profile.name")}
          control={control}
          required
        />
        <BaseTextInput
          control={control}
          name="phone"
          keyboardType="phone-pad"
          icon="call-outline"
          translatedLabel={t("profile.phoneNumber")}
          placeholder={t("profile.phoneNumber")}
          maxLength={8}
          required
        />
        <BaseTextInput
          name="email"
          control={control}
          icon="mail-outline"
          keyboardType="email-address"
          placeholder={t("profile.yourEmail")}
          translatedLabel={t("profile.yourEmail")}
        />
        <ProvinceSelector
          name="province"
          label={t("Province")}
          required
          options={PURE_PROVINCES}
          placeholder={t("yourProvince")}
          control={control}
          adapter={SelectAdapters.fromObject("province")}
        />
        <AreaSelector
          name="area"
          control={control}
          label={t("area")}
          options={[]}
          placeholder={t("area")}
          adapter={SelectAdapters.fromObject("area")}
        />
        <LocationPicker
          control={control}
          name="location"
          label={t("location")}
        />
      </View>
      <View className="self-center my-6">
        <ProgressButton
          onPress={handleSubmit(onSubmit, onError)}
          isPending={isPending}
          title={t("profile.updateInfo")}
        />
      </View>
    </View>
  );
}
