import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import InputWithIcon from "@/core/components/ui/input/input-with-icon";
import PhoneInput from "@/core/components/ui/input/phone-input";
import { images } from "@/core/constants/images";
import { useProfile } from "@/core/hooks/auth/profile";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function EditProfileScreen() {
    const { control, handleSubmit, onSubmit, isSubmitting, errors } = useProfile()

    return (
        <Container
            backgroundColor="#FAED02"
            scrollable
            header={<ProfileHeader title="Edit Profile" />}
        >
            <View className="flex-1 mt-2 bg-white px-4 py-2">
                <View className="flex-row items-center justify-between w-full px-4 py-1">
                    <View>
                        <Text className="font-inter-semibold text-xl">Mohamed Tunisia</Text>
                    </View>
                    <View className="items-end">
                        <View className="relative">
                            <Image source={images.Logo} style={{ width: 75, height: 75 }} contentFit="cover" />
                            <Pressable className="absolute -left-7 bottom-1 z-10 bg-white rounded-full p-2">
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
                            error={errors.city?.message}
                            control={control}
                            name="zip"
                        />
                    </View>
                </View>
                <TouchableOpacity className="bg-primary-500 py-3 rounded-lg items-center mt-6"
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    <Text className="text-lg font-semibold text-secondary-900">
                        {isSubmitting ? <ActivityIndicator size="small" color="primary" /> : "Update Information"}
                    </Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}