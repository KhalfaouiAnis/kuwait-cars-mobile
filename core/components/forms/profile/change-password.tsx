import { images } from "@/core/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from "react-native";

import { useUpdatePassword } from "@/core/hooks/user/use-profile";
import useAuthStore from "@/core/lib/stores/auth.store";
import { toast } from "sonner-native";
import InputWithIcon from "../../ui/input/input-with-icon";

export default function ChangePasswordForm() {
    const { user } = useAuthStore()
    const { control, handleSubmit, onSubmit, isSubmitting, errors } = useUpdatePassword(user?.phone)

    const onError = () => {
        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([_, error]) => {
                if (error.message) {
                    toast.error(`${error.message}`)
                }
            })
        }
    };

    return (
        <View className="flex-1 mt-2 bg-white px-4 py-2 gap-y-8">
            <View className="flex-1 flex-row border border-primary-500 rounded-lg items-center justify-between w-full px-4 py-1">
                <View>
                    <Text className="font-inter-semibold text-xl">{user?.fullname}</Text>
                </View>
                <View className="items-end">
                    <View className="relative">
                        <Image
                            source={user?.avatar
                                ? { uri: `${process.env.EXPO_PUBLIC_API_URL}${user?.avatar}` }
                                : images.DefaultAvatar}
                            style={{ width: 75, height: 75, borderRadius: 50 }}
                            contentFit="cover"
                        />
                        <Pressable className="absolute -left-7 bottom-1 z-10 bg-white rounded-full p-2">
                            <Ionicons name="camera-outline" size={24} />
                        </Pressable>
                    </View>
                </View>
            </View>

            <View className="flex-1 py-2 mt-2 gap-y-12">
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
                    onPress={handleSubmit(onSubmit, onError)}
                    disabled={isSubmitting}
                >
                    <Text className="text-lg font-semibold text-secondary-900">
                        {isSubmitting ? <ActivityIndicator size="small" color="primary" /> : "Update Password"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}