import InputWithIcon from "@/core/components/ui/input/input-with-icon";
import { PROVINCES } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { useAvatar } from "@/core/hooks/user/use-avatar";
import { useProfile } from "@/core/hooks/user/use-profile";
import useAuthStore from "@/core/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from "react-native";
import LocationPicker from "../../layout/location/location-picker";
import PickFromGallerySM from "../../ui/button/media/open-gallery-sm";
import TakePhotoButton from "../../ui/button/media/take-photo";
import AppModal from "../../ui/dialog/modal";
import AreaSelector from "../../ui/input/area-selector";
import PhoneInput from "../../ui/input/phone-input";
import ProvinceSelector from "../../ui/input/province-selector";
import { renderProvinceAreaOption } from "../../ui/shared/render-option";

export default function EditProfileForm({ theme, t }: { theme: string, t: (key: string) => string }) {
    const [showModal, setShowModal] = useState(false)
    const { user } = useAuthStore();

    const { errors, handleSubmit, onSubmit, isSubmitting, control, setValue } = useProfile(user ? { ...user, avatar: user.avatar } : undefined)
    const { addAvatar, avatar } = useAvatar(setValue)

    const province = useWatch({ control, name: "province" })
    const Areas = province?.areas.map(area => ({ ...area, label: area.area })) || []

    const onError = (errors: any) => {
        console.log('Validation failed:', errors);
    };

    return (
        <View className="flex-1 mt-2 bg-white px-4 py-2 dark:bg-darkish">
            <View className="flex-row items-center justify-between w-full px-4 py-1">
                <View>
                    <Text className="font-inter-semibold text-xl dark:text-white">{user?.fullname}</Text>
                </View>
                <View className="items-end">
                    <View className="relative">
                        {
                            avatar ? <Image
                                source={{ uri: avatar.uri }}
                                style={{ width: 75, height: 75, borderRadius: 50 }}
                                contentFit="cover"
                            /> :
                                <Image
                                    source={user?.avatar
                                        ? { uri: user?.avatar }
                                        : IMAGES.DefaultAvatar}
                                    style={{ width: 75, height: 75, borderRadius: 50 }}
                                    contentFit="cover"
                                />
                        }
                        <Pressable className="absolute -left-7 bottom-1 z-10 bg-white rounded-full p-2" onPress={() => setShowModal(true)}>
                            <Ionicons name="camera-outline" size={24} />
                        </Pressable>
                    </View>
                </View>
            </View>

            <View className="flex-1 py-2 mt-2 gap-y-6">
                <InputWithIcon
                    label={t("name")}
                    icon="person-outline"
                    name="fullname"
                    placeholder={t("name")}
                    control={control}
                    requiredMark
                />
                <PhoneInput
                    control={control}
                    name="phone"
                    label={t("phoneNumber")}
                    error={errors.phone?.message}
                />
                <InputWithIcon
                    icon="mail-outline"
                    placeholder={t("yourEmail")}
                    error={errors.email?.message}
                    control={control}
                    name="email"
                    label={t("yourEmail")}
                />
                <ProvinceSelector
                    control={control}
                    name="province"
                    options={PROVINCES}
                    renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
                    placeholder={t("yourProvince")}
                    label={t("yourProvince")}
                    isDark={theme !== "light"}
                    primary
                />
                <AreaSelector
                    control={control}
                    name="area"
                    options={Areas}
                    renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
                    placeholder={t("Area")}
                    label={t("yourArea")}
                    isDark={theme !== "light"}
                    primary
                />
                <LocationPicker
                    control={control}
                    errors={errors}
                    isDark={theme !== "light"}
                    setValue={setValue}
                    primary
                    t={t}
                />
            </View>
            <TouchableOpacity className="bg-primary-500 py-3 rounded-lg items-center mt-6"
                onPress={handleSubmit(onSubmit, onError)}
                disabled={isSubmitting}
            >
                <Text className="text-lg font-semibold text-secondary-900">
                    {isSubmitting ? <ActivityIndicator size="small" color="primary" /> : t("updateInfo")}
                </Text>
            </TouchableOpacity>

            <AppModal
                onClose={() => setShowModal(false)}
                visible={showModal}
                renderContent={() => (
                    <View className="gap-y-4">
                        <PickFromGallerySM
                            label={t("openGallery")}
                            addMedia={() => {
                                addAvatar(false)
                                setShowModal(false)
                            }}
                        />
                        <TakePhotoButton
                            label={t("OpenCameraTakePhoto")}
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