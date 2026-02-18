import Checkbox from "@/core/components/ui/input/checkbox/checkbox";
import { DIMENSIONS } from "@/core/constants";
import { useSignIn } from "@/core/hooks/auth/useAuth";
import { boxShadow } from "@/core/utils/cn";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import BaseTextInput from "../../ui/input/text/base-text-input";

export default function SignInForm() {
  const { t } = useTranslation("auth");
  const { handleSubmit, onSubmit, isSubmitting, control } = useSignIn();

  return (
    <View className="pt-10 px-4 pb-10">
      <View className="gap-8 items-center">
        <BaseTextInput
          name="phone"
          maxLength={8}
          control={control}
          icon="call-outline"
          keyboardType="phone-pad"
          translatedPlaceholder={t("phoneNumber")}
        />
        <BaseTextInput
          name="password"
          secureTextEntry
          control={control}
          endIcon="eye-outline"
          icon="lock-closed-outline"
          translatedPlaceholder={t("password")}
        />
      </View>
      <View className="flex-row items-center justify-between mt-8 px-4">
        <View className="flex-row items-center gap-x-1">
          <Checkbox checked={false} size={28} />
          <Text className="text-base text-black dark:text-grayish">
            {t("rememberMe")}
          </Text>
        </View>
        <Link href={"/(auth)/forgot_password"} className="items-center">
          <Text className="text-sm font-inter-semibold text-grayish dark:text-grayish">
            {t("passwordForgotten")}
          </Text>
        </Link>
      </View>
      <TouchableOpacity
        style={{
          boxShadow: boxShadow(4, 6, 20).button.boxShadow,
          width: DIMENSIONS.width / 2 + 20,
          height: 50,
        }}
        className="bg-primary-500 items-center justify-center rounded-3xl self-center mt-20"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <Text className="text-lg font-inter-semibold text-center text-black">
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            t("signIn")
          )}
        </Text>
      </TouchableOpacity>
      <Link href={"/(auth)/signup"} className="items-center mt-4">
        <Text className="text-base text-center dark:text-grayish">
          {t("dontHaveAccount")}{" "}
          <Text className="font-inter-semibold text-grayish">
            {t("signUp")}
          </Text>
        </Text>
      </Link>
    </View>
  );
}
