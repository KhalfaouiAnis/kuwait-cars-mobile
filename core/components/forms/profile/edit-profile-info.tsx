import InputWithIcon from "@/core/components/ui/input/input-with-icon";
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
import { useState } from "react";
import { useWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { toast } from "sonner-native";
import LocationPicker from "../../layout/location/location-picker";
import PickFromGallerySM from "../../ui/button/media/open-gallery-sm";
import TakePhotoButton from "../../ui/button/media/take-photo";
import { ProgressButton } from "../../ui/button/progress-button";
import AppModal from "../../ui/dialog/modal";
import AreaSelector from "../../ui/input/area-selector";
import PhoneInput from "../../ui/input/phone-input";
import ProvinceSelector from "../../ui/input/province-selector";
import { renderProvinceAreaOption } from "../../ui/shared/render-option";

export default function EditProfileForm({ theme, t }: { theme: string, t: TFunction }) {
    const [showModal, setShowModal] = useState(false)
    const { user } = useAuthStore(state => state);

    const { errors, handleSubmit, control, setValue } = useProfile(user)
    const { mutate, isPending, uploadProgress } = useUpdateProfile();
    const { protectAction } = useAuthGuard()
    const { addAvatar, avatar } = useAvatar(setValue)

    const province = useWatch({ control, name: "province" })
    const Areas = PROVINCES.find(prov => prov.province === province?.province)?.areas || []

    const onError = (errors: any) => {
        console.log('Validation failed:', errors);
    };

    const onSubmit = (data: UpdateProfileInterface) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("Profile updated successfully")
            },
            onError: (err) => {
                console.log(err.message);
                toast.error(err.message)
            }
        })
    };

    return (
        <View className="flex-1 mt-2 bg-white px-4 py-2 dark:bg-darkish">
            <View className="flex-row items-center justify-between w-full px-4 py-1">
                <View>
                    <Text className="font-inter-semibold text-xl dark:text-white">{user?.fullname}</Text>
                </View>
                <View className="items-end">
                    <Pressable
                        className="relative"
                        onPress={() => setShowModal(true)}
                    >
                        {
                            avatar ? <Image
                                source={{ uri: avatar.uri }}
                                style={{ width: 75, height: 75, borderRadius: 50 }}
                                contentFit="cover"
                            /> :
                                <Image
                                    source={user?.avatar
                                        ? { uri: user?.avatar.original_url }
                                        : IMAGES.DefaultAvatar}
                                    style={{ width: 75, height: 75, borderRadius: 50 }}
                                    contentFit="cover"
                                />
                        }
                        <View className="absolute -left-7 bottom-1 z-10 bg-white rounded-full p-2">
                            <Ionicons name="camera-outline" size={24} />
                        </View>
                    </Pressable>
                </View>
            </View>

            <View className="flex-1 py-2 mt-2 mb-2 gap-y-6">
                <InputWithIcon
                    label={t("profile.name")}
                    icon="person-outline"
                    name="fullname"
                    placeholder={t("profile.name")}
                    control={control}
                    requiredMark
                />
                <PhoneInput
                    control={control}
                    name="phone"
                    label={t("profile.phoneNumber")}
                    error={errors.phone?.message}
                />
                <InputWithIcon
                    icon="mail-outline"
                    placeholder={t("profile.yourEmail")}
                    error={errors.email?.message}
                    control={control}
                    name="email"
                    label={t("profile.yourEmail")}
                />
                <ProvinceSelector
                    control={control}
                    name="province"
                    options={PROVINCES}
                    renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
                    placeholder={t("yourProvince")}
                    label={t("yourProvince")}
                    primary
                />
                <AreaSelector
                    control={control}
                    name="area"
                    options={Areas}
                    renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
                    placeholder={t("area")}
                    label={t("area")}
                    primary
                />
                <LocationPicker
                    control={control}
                    errors={errors}
                    isDark={theme !== "light"}
                    setValue={setValue}
                    label={t("location")}
                    primary
                />
            </View>
            <ProgressButton
                onPress={protectAction(handleSubmit(onSubmit, onError))}
                isPending={isPending}
                title={t("profile.updateInfo")}
                progress={uploadProgress}
            />
            <AppModal
                onClose={() => setShowModal(false)}
                visible={showModal}
                renderContent={() => (
                    <View className="gap-y-4">
                        <PickFromGallerySM
                            label={t("profile.openGallery")}
                            addMedia={() => {
                                addAvatar(false)
                                setShowModal(false)
                            }}
                        />
                        <TakePhotoButton
                            label={t("profile.OpenCameraTakePhoto")}
                            addMedia={() => {
                                addAvatar(true)
                                setShowModal(false)
                            }}
                        />
                    </View>
                )}
            />
        </View>
    )
}