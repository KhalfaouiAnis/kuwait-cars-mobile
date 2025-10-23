import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import InputWithIcon from "@/core/components/ui/input/input-with-icon";
import { images } from "@/core/constants/images";
import { useProfile } from "@/core/hooks/auth/profile";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function ChangePasswordScreen() {
    const { control, handleSubmit, onSubmit, isSubmitting, errors } = useProfile()

    return (
        <Container
            backgroundColor="#FAED02"
            header={<ProfileHeader title="Change Password" />}
        >
            <View className="flex-1 mt-2 bg-white px-4 py-2 gap-y-8">
                <View className="flex-1 flex-row border border-primary-500 rounded-lg items-center justify-between w-full px-4 py-1">
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

                <View className="flex-1 py-2 mt-2 gap-y-8">
                    <InputWithIcon
                        control={control} name="password" secureTextEntry label="New password"
                        icon="lock-closed-outline" placeholder="New password" requiredMark endIcon="eye-outline"
                        error={errors.password?.message}
                    />
                    <InputWithIcon
                        control={control} name="confirmPassword" secureTextEntry label="Confirm password"
                        icon="lock-closed-outline" placeholder="Cofirm new password" requiredMark endIcon="eye-outline"
                        error={errors.password?.message}
                    />
                </View>
                <View className="flex-1 pt-12">
                    <TouchableOpacity className="bg-primary-500 py-3 rounded-lg items-center"
                        onPress={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    >
                        <Text className="text-lg font-semibold text-secondary-900">
                            {isSubmitting ? <ActivityIndicator size="small" color="primary" /> : "Update Password"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    )
}