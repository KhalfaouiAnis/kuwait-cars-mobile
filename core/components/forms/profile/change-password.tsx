import { IMAGES } from "@/core/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from "react-native";

import InputWithIcon from "@/core/components/ui/input/input-with-icon";
import { useUpdatePassword } from "@/core/hooks/user/use-profile";
import useAuthStore from "@/core/lib/stores/auth.store";
import { toast } from "sonner-native";

export default function ChangePasswordForm({ t }: { t: (key: string) => string }) {
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
        <View className="flex-1 mt-2 bg-white dark:bg-darkish px-4 py-2 gap-y-8">
            <View className="flex-1 flex-row border border-primary-500 rounded-lg items-center justify-between w-full px-4 py-1">
                <View>
                    <Text className="font-inter-semibold text-xl dark:text-white">{user?.fullname}</Text>
                </View>
                <View className="items-end">
                    <View className="relative">
                        <Image
                            source={user?.avatar
                                ? { uri: `${process.env.EXPO_PUBLIC_API_URL}${user?.avatar}` }
                                : IMAGES.DefaultAvatar}
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
                    control={control}
                    name="password"
                    secureTextEntry
                    label={t("newPassword")}
                    icon="lock-closed-outline"
                    placeholder={t("newPassword")}
                    requiredMark
                    endIcon="eye-outline"
                    error={errors.password?.message}
                />
                <InputWithIcon
                    control={control}
                    name="confirmPassword"
                    secureTextEntry
                    label={t("confirmPassword")}
                    icon="lock-closed-outline"
                    placeholder={t("confirmNewPassword")}
                    requiredMark
                    endIcon="eye-outline"
                    error={errors.password?.message}
                />
            </View>
            <View className="flex-1 pt-12">
                <TouchableOpacity
                    className="bg-primary-500 py-3 rounded-lg items-center"
                    onPress={handleSubmit(onSubmit, onError)}
                    disabled={isSubmitting}
                >
                    <Text className="text-lg font-semibold text-secondary-900">
                        {isSubmitting ? <ActivityIndicator size="small" color="primary" /> : t("updatePass")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}