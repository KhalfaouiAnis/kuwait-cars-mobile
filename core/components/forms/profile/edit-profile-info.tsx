import InputWithIcon from "@/core/components/ui/input/input-with-icon";
import { CITIES } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { useAvatar } from "@/core/hooks/user/use-avatar";
import { useProfile } from "@/core/hooks/user/use-profile";
import useAuthStore from "@/core/lib/stores/auth.store";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from "react-native";
import PickFromGallerySM from "../../ui/button/media/open-gallery-sm";
import TakePhotoButton from "../../ui/button/media/take-photo";
import AppModal from "../../ui/dialog/modal";
import PhoneInput from "../../ui/input/phone-input";
import ProvinceSelector from "../../ui/input/province-selector";
import { renderProvinceOption } from "../../ui/shared/render-option";

export default function EditProfileForm({ theme }: { theme: string }) {
    const [showModal, setShowModal] = useState(false)
    const { user } = useAuthStore();

    const { errors, handleSubmit, onSubmit, isSubmitting, control, setValue } = useProfile(user ? { ...user, avatar: { uri: user.avatar || "", type: "image/jpeg" } } : undefined)
    const { addAvatar, avatar } = useAvatar(setValue)

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
                    label="Name"
                    icon="person-outline"
                    name="fullname"
                    placeholder="full name"
                    control={control}
                />
                <PhoneInput control={control} name="phone" label="Phone number" error={errors.phone?.message} />
                <InputWithIcon icon="mail-outline"
                    placeholder="Your email"
                    error={errors.email?.message}
                    control={control}
                    name="email"
                    label="Your email"
                />
                <ProvinceSelector
                    control={control}
                    name="province"
                    required
                    isDark={theme !== "light"}
                    options={CITIES}
                    renderOption={(option, selected) => renderProvinceOption(option, selected as string)}
                    placeholder="Province"
                    label="Your province"
                    primary
                />
                <View className="flex-row items-center gap-x-2">
                    <InputWithIcon
                        icon="location-outline"
                        placeholder="City"
                        label="City"
                        error={errors.city?.message}
                        control={control}
                        name="city"
                    />
                    <InputWithIcon
                        customIcon={<MaterialCommunityIcons name="email-seal-outline" size={24} color={theme !== "light" ? "white" : "black"} />}
                        placeholder="Zip code"
                        label="Zip code"
                        error={errors.zip_code?.message}
                        control={control}
                        name="zip_code"
                    />
                </View>
            </View>
            <TouchableOpacity className="bg-primary-500 py-3 rounded-lg items-center mt-6"
                onPress={handleSubmit(onSubmit, onError)}
                disabled={isSubmitting}
            >
                <Text className="text-lg font-semibold text-secondary-900">
                    {isSubmitting ? <ActivityIndicator size="small" color="primary" /> : "Update Information"}
                </Text>
            </TouchableOpacity>

            <AppModal
                onClose={() => setShowModal(false)}
                visible={showModal}
                renderContent={() => <View className="gap-y-4">
                    <PickFromGallerySM addMedia={() => {
                        addAvatar(false)
                        setShowModal(false)
                    }} label="Open gallery" />
                    <TakePhotoButton label="Open Camera & Take Photo" addMedia={() => {
                        addAvatar(true)
                        setShowModal(false)
                    }
                    } />
                </View>}
            />
        </View>
    )
}