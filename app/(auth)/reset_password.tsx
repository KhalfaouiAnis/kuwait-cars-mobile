import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import InputWithIcon from "@/core/components/ui/input/input-with-icon";
import { useResetPassword } from "@/core/hooks/auth/useAuth";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function ResetPasswordScreen() {
    const { control, errors, isSubmitting, handleSubmit, onSubmit } = useResetPassword()
    const { t } = useTranslation("auth");

    return (
        <FormWrapper title="Reset Password">
            <Text className="mt-6 text-base text-center dark:text-white">
                {t("createYourNewPassword")}
            </Text>
            <View className="pt-2 px-4 my-4 gap-y-4">
                <InputWithIcon
                    name="phone"
                    control={control}
                    icon="call-outline"
                    placeholder={t("phoneNumber")}
                    error={errors.phone?.message}
                    label={t("yourPhone")}
                />
                <InputWithIcon
                    name="password"
                    control={control}
                    error={errors.password?.message}
                    label={t("newPassword")}
                    endIcon="eye-outline"
                    icon="lock-closed-outline"
                    placeholder={t("createNewPassword")}
                />
                <InputWithIcon
                    control={control}
                    name="confirmPassword"
                    error={errors.confirmPassword?.message}
                    label={t("confirmPassword")}
                    endIcon="eye-outline"
                    icon="lock-closed-outline"
                    placeholder={t("confirmNewPassword")}
                />
            </View>
            <View className="px-4 pb-4">
                <TouchableOpacity className="bg-primary-500 py-3 mt-4 rounded-lg items-center"
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}>
                    <Text className="text-lg font-semibold text-secondary-900">
                        {isSubmitting ? <ActivityIndicator size="small" color="primary" /> : t("resetPassword")}
                    </Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}