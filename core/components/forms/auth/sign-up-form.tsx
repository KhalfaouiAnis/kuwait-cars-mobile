import Checkbox from "@/core/components/ui/input/checkbox";
import { DIMENSIONS, PROVINCES } from "@/core/constants";
import { useSignUp } from "@/core/hooks/auth/useAuth";
import { boxShadow } from "@/core/utils/cn";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import ProvinceSelect from "../../ui/input/select/province-select";
import AuthTextInput from "../../ui/input/text/auth-input";
import { renderProvinceAreaOption } from "../../ui/shared/render-option";

export default function SignUpForm() {
  const { t } = useTranslation("auth");
  const { control, handleSubmit, onSubmit, isSubmitting, errors } = useSignUp();

  return (
    <View className="pt-8 px-4 pb-10">
      <View className="gap-6 items-center">
        <AuthTextInput
          control={control}
          name="fullname"
          icon="person-outline"
          placeholder={t("yourName")}
          requiredMark
          error={errors.fullname?.message}
        />
        <AuthTextInput
          control={control}
          name="phone"
          keyboardType="phone-pad"
          icon="call-outline"
          placeholder={t("phoneNumber")}
          requiredMark
          error={errors.phone?.message}
        />
        <AuthTextInput
          control={control}
          name="password"
          secureTextEntry
          icon="lock-closed-outline"
          placeholder={t("yourPass")}
          requiredMark
          endIcon="eye-outline"
          error={errors.password?.message}
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
        />
        <AuthTextInput
          control={control}
          name="email"
          icon="mail-outline"
          keyboardType="email-address"
          placeholder={t("yourEmail")}
          error={errors.email?.message}
        />
      </View>
      <View className="flex-row items-center gap-x-1 mt-4">
        <Checkbox checked={false} size={28} color="#4CAF50" />
        <Text className="text-base text-secondary-900 dark:text-white">
          {t("rememberMe")}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          boxShadow: boxShadow(4, 6, 20).button.boxShadow,
          width: DIMENSIONS.width / 2 + 20,
        }}
        className="bg-primary-500 py-3 rounded-full self-center mt-4"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <Text className="text-2xl font-inter-semibold text-center text-black">
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            t("signUp")
          )}
        </Text>
      </TouchableOpacity>
      <Link href={"/(auth)/signin"} className="items-center mt-4">
        <Text className="text-base text-center dark:text-white">
          {t("haveAccount")}{" "}
          <Text className="font-inter-semibold text-grayish dark:text-white">
            {t("signIn")}
          </Text>
        </Text>
      </Link>
    </View>
  );
}
