import { DIMENSIONS } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { useUpdatePassword } from "@/core/hooks/user/use-profile";
import useAuthStore from "@/core/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { TFunction } from "i18next";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { toast } from "sonner-native";
import BaseTextInput from "../../ui/input/text/base-text-input";

export default function ChangePasswordForm({ t }: { t: TFunction }) {
  const { user } = useAuthStore();
  const { protectAction } = useAuthGuard();
  const { control, handleSubmit, onSubmit, isSubmitting, errors } =
    useUpdatePassword(user?.phone);

  const onError = () => {
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([_, error]) => {
        if (error.message) {
          toast.error(`${error.message}`);
        }
      });
    }
  };

  const handleUpdate = () => {
    protectAction(handleSubmit(onSubmit, onError));
  };

  return (
    <View className="flex-1 mt-2 bg-white dark:bg-black px-4 py-2 gap-y-8">
      <View className="flex-1 flex-row items-center justify-between w-full px-4 py-1">
        <View>
          <Text className="font-inter-semibold text-xl dark:text-white">
            {user?.fullname}
          </Text>
        </View>
        <View className="items-end">
          <View className="relative">
            <Image
              source={
                user?.avatar
                  ? { uri: user?.avatar.original_url }
                  : IMAGES.DefaultAvatar
              }
              style={{ width: 75, height: 75, borderRadius: 50 }}
              contentFit="cover"
            />
            <Pressable className="absolute -left-7 bottom-1 z-10 bg-white rounded-full p-2">
              <Ionicons name="camera-outline" size={24} />
            </Pressable>
          </View>
        </View>
      </View>

      <View className="flex-1 items-center mt-2 gap-y-6">
        <BaseTextInput
          control={control}
          name="password"
          secureTextEntry
          translatedLabel={t("profile.newPassword")}
          icon="lock-closed-outline"
          translatedPlaceholder={t("profile.newPassword")}
          endIcon="eye-outline"
          required
        />
        <BaseTextInput
          required
          secureTextEntry
          control={control}
          endIcon="eye-outline"
          name="confirmPassword"
          icon="lock-closed-outline"
          translatedLabel={t("profile.confirmPassword")}
          translatedPlaceholder={t("profile.confirmNewPassword")}
        />
      </View>
      <View className="flex-1 items-center pt-12">
        <TouchableOpacity
          className="bg-primary-500 py-3 rounded-3xl items-center disabled:bg-yellow-200"
          onPress={handleUpdate}
          disabled={isSubmitting}
          style={{ width: DIMENSIONS.width - 80 }}
        >
          <Text className="text-lg font-semibold text-secondary-900">
            {isSubmitting ? (
              <ActivityIndicator size="small" color="primary" />
            ) : (
              t("profile.updatePass")
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
