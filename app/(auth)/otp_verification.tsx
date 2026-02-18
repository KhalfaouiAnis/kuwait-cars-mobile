import OTPVerificationInput from "@/core/components/base/otp-verification-input";
import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import { ResendOTPTimer } from "@/core/components/ui/shared/resend-otp-timer";
import { DIMENSIONS } from "@/core/constants";
import { useOTP } from "@/core/hooks/auth/useAuth";
import { boxShadow } from "@/core/utils/cn";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function OTPVerificationScreen() {
    const { t } = useTranslation("auth");

    const { phone } = useLocalSearchParams()
    const { verifyOtp } = useOTP()

    return (
        <FormWrapper title={t("OTPVerification")}>
            <Text className="mt-12 text-base text-center dark:text-white">
                {t("sendOTPPhone")}
            </Text>
            <Text className="mt-6 text-base text-center text-error">
                {phone}
            </Text>
            <View className="pt-8 px-4 items-center">
                <OTPVerificationInput numberOfElements={4} onComplete={async (otp) => verifyOtp(phone as string, otp)} />
                <View className="mt-8">
                    <ResendOTPTimer
                        onResend={() => { }}
                    />
                </View>
                <Text className="mt-4 text-base text-center dark:text-white">{t("doNotSendOTP")} <Text className="text-primary-500">{t("sendOTP")}</Text></Text>
                <TouchableOpacity
                    className="bg-primary-500 justify-center rounded-3xl items-center mt-12"
                    style={{
                        boxShadow: boxShadow(4, 6, 20).button.boxShadow,
                        width: DIMENSIONS.width / 2 + 20,
                        height: 50,
                    }}
                >
                    <Text className="text-lg font-inter-semibold text-center text-black disabled:text-gray-100">
                        {t("submit")}
                    </Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}