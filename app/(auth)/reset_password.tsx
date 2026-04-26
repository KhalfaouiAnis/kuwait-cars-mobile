import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import BaseTextInput from "@/core/components/ui/input/text/base-text-input";
import { DIMENSIONS } from "@/core/constants";
import useAuth from "@/core/hooks/auth/useAuth";
import { boxShadow } from "@/core/utils/cn";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function ResetPasswordScreen() {
    const { useResetPassword } = useAuth();
    const { control, handleSubmit, onSubmit, isSubmitting } = useResetPassword()
    const { t } = useTranslation("auth");

    return (
        <FormWrapper title={t("resetPassword")}>
            <Text className="mt-6 text-base text-center dark:text-white">
                {t("createYourNewPassword")}
            </Text>
            <View className="pt-2 px-4 my-4 gap-y-4">
                <BaseTextInput
                    name="phone"
                    control={control}
                    icon="call-outline"
                    omitValidationError={false}
                    translatedLabel={t("yourPhone")}
                    translatedPlaceholder={t("phoneNumber")}
                />
                <BaseTextInput
                    name="password"
                    control={control}
                    endIcon="eye-outline"
                    icon="lock-closed-outline"
                    omitValidationError={false}
                    translatedLabel={t("newPassword")}
                    translatedPlaceholder={t("createNewPassword")}
                />
                <BaseTextInput
                    control={control}
                    endIcon="eye-outline"
                    name="confirmPassword"
                    icon="lock-closed-outline"
                    omitValidationError={false}
                    translatedLabel={t("confirmPassword")}
                    translatedPlaceholder={t("confirmNewPassword")}
                />
            </View>
            <View className="px-4 pb-4 items-center">
                <TouchableOpacity
                    className="bg-primary-500 justify-center rounded-3xl items-center mt-4"
                    style={{
                        boxShadow: boxShadow(4, 6, 20).button.boxShadow,
                        width: DIMENSIONS.width / 2 + 20,
                        height: 50,
                    }}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    <Text className="text-lg font-inter-semibold text-center text-black">
                        {isSubmitting ? <ActivityIndicator size="small" color="#fff" /> : t("resetPassword")}
                    </Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}