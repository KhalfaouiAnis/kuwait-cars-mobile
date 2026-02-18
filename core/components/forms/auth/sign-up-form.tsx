import Checkbox from "@/core/components/ui/input/checkbox/checkbox";
import { DIMENSIONS, PROVINCES } from "@/core/constants";
import { useSignUp } from "@/core/hooks/auth/useAuth";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow } from "@/core/utils/cn";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import ProvinceSelect from "../../ui/input/select/province-select";
import BaseTextInput from "../../ui/input/text/base-text-input";
import { renderProvinceAreaOption } from "../../ui/shared/render-option";

export default function SignUpForm() {
  const { t } = useTranslation("auth");
  const { isRTL } = useUserPreferencesStore()
  const { control, handleSubmit, onSubmit, isSubmitting, errors } = useSignUp();

  return (
    <View className="pt-8 px-4 pb-10">
      <View className="gap-6 items-center">
        <BaseTextInput
          control={control}
          name="fullname"
          icon="person-outline"
          translatedPlaceholder={t("yourName")}
          required
        />
        <BaseTextInput
          control={control}
          name="phone"
          keyboardType="phone-pad"
          icon="call-outline"
          translatedPlaceholder={t("phoneNumber")}
          maxLength={8}
          required
        />
        <BaseTextInput
          control={control}
          name="password"
          secureTextEntry
          icon="lock-closed-outline"
          translatedPlaceholder={t("password")}
          required
          endIcon="eye-outline"
        />
        <ProvinceSelect
          control={control}
          name="province"
          required
          options={PROVINCES}
          renderOption={(option, selected) =>
            renderProvinceAreaOption(option, selected)
          }
          placeholder={t("yourProvince")}
          error={errors.province?.ref?.name}
        />
        <BaseTextInput
          name="email"
          control={control}
          icon="mail-outline"
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
