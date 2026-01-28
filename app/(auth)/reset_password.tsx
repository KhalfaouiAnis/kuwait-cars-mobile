import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import AuthTextInput from "@/core/components/ui/input/text/auth-input";
import { DIMENSIONS } from "@/core/constants";
import { useResetPassword } from "@/core/hooks/auth/useAuth";
import { boxShadow } from "@/core/utils/cn";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function ResetPasswordScreen() {
    const { control, errors, isSubmitting, handleSubmit, onSubmit } = useResetPassword()
    const { t } = useTranslation("auth");

    return (
        <FormWrapper title={t("resetPassword")}>
            <Text className="mt-6 text-base text-center dark:text-white">
                {t("createYourNewPassword")}
            </Text>
            <View className="pt-2 px-4 my-4 gap-y-4">
                <AuthTextInput
                    name="phone"
                    control={control}
                    icon="call-outline"
                    placeholder={t("phoneNumber")}
                    error={errors.phone?.ref?.name}
                    label={t("yourPhone")}
                />
                <AuthTextInput
                    name="password"
                    control={control}
                    error={errors.password?.ref?.name}
                    label={t("newPassword")}
                    endIcon="eye-outline"
                    icon="lock-closed-outline"
                    placeholder={t("createNewPassword")}
                />
                <AuthTextInput
                    control={control}
                    name="confirmPassword"
                    error={errors.confirmPassword?.ref?.name}
                    label={t("confirmPassword")}
                    endIcon="eye-outline"
                    icon="lock-closed-outline"
                    placeholder={t("confirmNewPassword")}
                />
            </View>
            <View className="px-4 pb-4 items-center">
                <TouchableOpacity
                    className="bg-primary-500 py-3 rounded-3xl items-center mt-4"
                    style={{
                        boxShadow: boxShadow(4, 6, 20).button.boxShadow,
                        width: DIMENSIONS.width / 2 + 20,
                    }}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    <Text className="text-xl font-inter-semibold text-center text-black">
                        {isSubmitting ? <ActivityIndicator size="small" color="#fff" /> : t("resetPassword")}
                    </Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}