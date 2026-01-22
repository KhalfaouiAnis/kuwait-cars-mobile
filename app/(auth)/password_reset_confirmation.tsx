import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import { DIMENSIONS } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function PasswordResetConfirmationScreen() {
    const { t } = useTranslation("auth");

    return (
        <FormWrapper title={t("passwordReset")}>
            <Text className="mt-6 text-base text-center dark:text-white px-4">
                {t("passSuccessReset")}
            </Text>
            <View className="mt-32 px-4">
                <TouchableOpacity
                    className="bg-primary-500 py-3 rounded-full items-center mt-20"
                    style={{
                        boxShadow: boxShadow(4, 6, 20).button.boxShadow,
                        width: DIMENSIONS.width / 2 + 20,
                    }}
                >
                    <Text className="text-2xl font-inter-semibold text-center text-black">
                        {t("confirm")}
                    </Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}