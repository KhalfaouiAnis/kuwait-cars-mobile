import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function PasswordResetConfirmationScreen() {
    const { t } = useTranslation("auth");

    return (
        <FormWrapper title="Password Reset">
            <Text className="mt-6 text-base text-center dark:text-white">
                {t("passSuccessReset")}
            </Text>
            <View className="mt-32 px-4">
                <TouchableOpacity className="bg-primary-500 py-3  rounded-lg items-center mt-20">
                    <Text className="text-lg font-semibold text-secondary-900">{t("confirm")}</Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}