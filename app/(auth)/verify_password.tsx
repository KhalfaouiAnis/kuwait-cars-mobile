import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import VerificationCode from "@/core/components/ui/input/verification-code";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function VerifyPasswordResetCodeScreen() {
    const { t } = useTranslation("auth");

    return (
        <FormWrapper title={t("CheckYourEmail")}>
            <Text className="mt-6 text-base text-center dark:text-white">
                {t("sentResetLinkTo")} moha...@gmail.com
            </Text>
            <Text className="mt-1 text-base text-center dark:text-white">
                {t("enter5Digit")}
            </Text>
            <View className="pt-20 px-4">
                <VerificationCode numberOfElements={5} />
                <TouchableOpacity className="bg-primary-500 py-3  rounded-lg items-center mt-20">
                    <Text className="text-lg font-semibold text-secondary-900">{t("verifyCode")}</Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}