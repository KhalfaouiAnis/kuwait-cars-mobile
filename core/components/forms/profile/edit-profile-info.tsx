import InputWithIcon from "@/core/components/ui/input/input-with-icon";
import { CITIES } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { useAvatar } from "@/core/hooks/user/use-avatar";
import { useProfile } from "@/core/hooks/user/use-profile";
import { authStore } from "@/core/lib/stores/auth.store";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from "react-native";
import PickFromGalleryGallery from "../../ui/button/open-gallery-button";
import TakePhotoButton from "../../ui/button/take-photo-button";
import AppModal from "../../ui/dialog/modal";
import PhoneInput from "../../ui/input/phone-input";
import SelectInput from "../../ui/input/select-input";
import { renderLocationOption } from "../ad/select-option/render-option";

export default function EditProfileForm() {
    const { user } = authStore.getState();
    const [showModal, setShowModal] = useState(false)
    const { errors, handleSubmit, onSubmit, isSubmitting, control, setValue } = useProfile(user ? { ...user, avatar: { uri: user.avatar || "", type: "image/jpeg" } } : undefined)
    const { addAvatar, avatar } = useAvatar(setValue)

    const onError = (errors: any) => {
        console.log('Validation failed:', errors);
    };

    return (
        <View className="flex-1 mt-2 bg-white px-4 py-2">
            <View className="flex-row items-center justify-between w-full px-4 py-1">
                <View>
                    <Text className="font-inter-semibold text-xl">{user?.fullname}</Text>
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
                                        ? { uri: `${process.env.EXPO_PUBLIC_API_URL}${user?.avatar}` }
                                        : IMAGES.DefaultAvatar}
                                    style={{ width: 75, height: 75, borderRadius: 50 }}
                                    contentFit="cover"
                                />
                        }
                        <Pressable className="absolute -left-7 bottom-1 z-10 bg-white rounded-full p-2"
                            onPress={() => setShowModal(true)}
                        >
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
                <SelectInput
                    control={control}
                    name="province"
                    options={CITIES}
                    renderOption={renderLocationOption}
                    placeholder="Province"
                    label="Your Province"
                    icon={<MaterialCommunityIcons name="town-hall" size={24} color="black" />}
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
                        customIcon={<MaterialCommunityIcons name="email-seal-outline" size={24} color="black" />}
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
                    <PickFromGalleryGallery small addMedia={() => {
                        addAvatar(false)
                        setShowModal(false)
                    }} />
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