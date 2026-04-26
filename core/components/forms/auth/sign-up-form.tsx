import Checkbox from "@/core/components/ui/input/checkbox/checkbox";
import { DIMENSIONS, PURE_PROVINCES } from "@/core/constants";
import useAuth from "@/core/hooks/auth/useAuth";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow } from "@/core/utils/cn";
import { SelectAdapters } from "@/core/utils/select-adapters";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import ProvinceSelector from "../../ui/input/select/province-selector";
import BaseTextInput from "../../ui/input/text/base-text-input";

export default function SignUpForm() {
  const { useSignUp } = useAuth();
  const { t } = useTranslation("auth");
  const { isRTL } = useUserPreferencesStore()
  const { control, handleSubmit, onSubmit, isSubmitting } = useSignUp();

  return (
    <View className="pt-8 px-4 pb-10">
      <View className="gap-6 items-center">
        <BaseTextInput
          required
          name="fullname"
          control={control}
          icon="person-outline"
          omitValidationError={false}
          translatedPlaceholder={t("yourName")}
        />
        <BaseTextInput
          required
          name="phone"
          maxLength={8}
          control={control}
          icon="call-outline"
          keyboardType="phone-pad"
          omitValidationError={false}
          translatedPlaceholder={t("phoneNumber")}
        />
        <BaseTextInput
          required
          name="password"
          secureTextEntry
          control={control}
          endIcon="eye-outline"
          icon="lock-closed-outline"
          omitValidationError={false}
          translatedPlaceholder={t("password")}
        />
        <ProvinceSelector
          required
          name="province"
          control={control}
          options={PURE_PROVINCES}
          omitValidationError={false}
          placeholder={t("yourProvince")}
          adapter={SelectAdapters.fromObject("province")}
        />
        <BaseTextInput
          name="email"
          control={control}
          icon="mail-outline"
          omitValidationError={false}
          keyboardType="email-address"
          translatedPlaceholder={t("yourEmail")}
        />
      </View>
      <View className="flex-row items-center gap-x-1 mt-4 ms-4" style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <Checkbox checked={false} size={28} color="#4CAF50" />
        <Text className="text-base text-secondary-900 dark:text-grayish">
          {t("rememberMe")}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          boxShadow: boxShadow(4, 6, 20).button.boxShadow,
          width: DIMENSIONS.width / 2 + 20,
          height: 50,
        }}
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        className="bg-primary-500 items-center justify-center rounded-3xl self-center mt-4"
      >
        <Text className="text-lg font-inter-semibold text-center text-black">
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            t("signUp")
          )}
        </Text>
      </TouchableOpacity>
      <Link href={"/(auth)/signin"} className="items-center mt-4">
        <Text className="text-base text-center dark:text-grayish">
          {t("haveAccount")}{" "}
          <Text className="font-inter-semibold text-grayish">
            {t("signIn")}
          </Text>
        </Text>
      </Link>
    </View>
  );
}
