import { PROVINCES } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { useAvatar } from "@/core/hooks/user/use-avatar";
import { useProfile } from "@/core/hooks/user/use-profile";
import { useUpdateProfile } from "@/core/services/user/user.mutations";
import useAuthStore from "@/core/store/auth.store";
import { UpdateProfileInterface } from "@/core/types/schema/user";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { TFunction } from "i18next";
import { useMemo, useState } from "react";
import { FormProvider, useWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { toast } from "sonner-native";
import PickFromGallerySM from "../../ui/button/media/open-gallery-sm";
import TakePhotoButton from "../../ui/button/media/take-photo";
import { ProgressButton } from "../../ui/button/progress-button";
import AppModal from "../../ui/dialog/modal";
import AreaSelector from "../../ui/input/area-selector";
import LocationPicker from "../../ui/input/location/location-picker";
import ProvinceSelect from "../../ui/input/select/province-select";
import BaseTextInput from "../../ui/input/text/base-text-input";
import { renderProvinceAreaOption } from "../../ui/shared/render-option";

export default function EditProfileForm({
  t,
}: {
  t: TFunction;
}) {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthStore((state) => state);
  const methods = useProfile(user);
  const { formState: { errors }, handleSubmit, control, setValue } = methods
  const { mutate, isPending } = useUpdateProfile();
  const { protectAction } = useAuthGuard();
  const { addAvatar, avatar } = useAvatar(setValue);

  const province = useWatch({ control, name: "province" });
  const Areas = useMemo(() => PROVINCES.find((prov) => prov.province === province?.province)?.areas, [province?.province])

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
    <FormProvider {...methods} >
      <View className="flex-1 mt-2 bg-white px-4 py-2 dark:bg-black">
        <View className="flex-row items-center justify-between w-full px-4 py-1">
          <View>
            <Text className="font-inter-semibold text-xl dark:text-white">
              {user?.fullname}
            </Text>
          </View>
          <View className="items-end">
            <Pressable className="relative" onPress={() => setShowModal(true)}>
              {avatar ? (
                <Image
                  source={{ uri: avatar.uri }}
                  style={{ width: 75, height: 75, borderRadius: 50 }}
                  contentFit="cover"
                />
              ) : (
                <Image
                  source={
                    user?.avatar
                      ? { uri: user?.avatar?.original_url }
                      : IMAGES.DefaultAvatar
                  }
                  style={{ width: 75, height: 75, borderRadius: 50 }}
                  contentFit="cover"
                />
              )}
              <View className="absolute -left-7 bottom-1 z-10 bg-white rounded-full p-2">
                <Ionicons name="camera-outline" size={24} />
              </View>
            </Pressable>
          </View>
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
            translatedLabel={t("profile.yourEmail")}
            placeholder={t("profile.yourEmail")}
          />
          <ProvinceSelect
            control={control}
            name="province"
            label={t("Province")}
            required
            options={PROVINCES}
            renderOption={(option, selected) =>
              renderProvinceAreaOption(option, selected)
            }
            placeholder={t("yourProvince")}
            error={errors.province?.ref?.name}
          />
          <AreaSelector
            control={control}
            name="area"
            options={Areas || []}
            renderOption={(option, selected) =>
              renderProvinceAreaOption(option, selected)
            }
            placeholder={t("area")}
            label={t("area")}
            primary
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
        <AppModal
          onClose={() => setShowModal(false)}
          visible={showModal}
          renderContent={() => (
            <View className="gap-y-4">
              <PickFromGallerySM
                label={t("profile.openGallery")}
                addMedia={() => {
                  addAvatar(false);
                  setShowModal(false);
                }}
              />
              <TakePhotoButton
                label={t("profile.OpenCameraTakePhoto")}
                addMedia={() => {
                  addAvatar(true);
                  setShowModal(false);
                }}
              />
            </View>
          )}
        />
      </View>
    </FormProvider>
  );
}
