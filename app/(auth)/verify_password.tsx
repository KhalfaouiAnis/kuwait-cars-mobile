import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import VerificationCode from "@/core/components/ui/input/verification-code";
import { DIMENSIONS } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
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
                <TouchableOpacity
                    className="bg-primary-500 py-3 rounded-full items-center mt-20"
                    style={{
                        boxShadow: boxShadow(4, 6, 20).button.boxShadow,
                        width: DIMENSIONS.width / 2 + 20,
                    }}
                >
                    <Text className="text-2xl font-inter-semibold text-center text-black">{t("verifyCode")}</Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}