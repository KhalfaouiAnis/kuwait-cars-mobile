import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import VerificationCode from "@/core/components/ui/input/verification-code";
import { useOTP } from "@/core/hooks/auth/useAuth";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function OTPVerificationScreen() {
    const { t } = useTranslation("auth");

    const { phone } = useLocalSearchParams()
    const { verifyOtp } = useOTP()

    return (
        <FormWrapper title="OTP Verification">
            <Text className="mt-12 text-base text-center dark:text-white">
                {t("sendOTPPhone")}
            </Text>
            <Text className="mt-6 text-base text-center text-error">
                {phone}
            </Text>
            <View className="pt-8 px-4">
                <VerificationCode numberOfElements={4} onComplete={async (otp) => verifyOtp(phone as string, otp)} />
                <Text className="mt-6 text-base text-center">10 minutes</Text>
                {/* <Timer
                    duration={60}
                    // onComplete={handleResend}
                    showLabel={false}
                    className="text-base text-center mt-8"
                /> */}
                <Text className="mt-4 text-base text-center dark:text-white">{t("doNotSendOTP")} <Text className="text-primary-500">{t("sendOTP")}</Text></Text>
                <TouchableOpacity className="bg-primary-500 py-3 rounded-lg items-center mt-12">
                    <Text className="text-lg font-semibold text-secondary-900 disabled:text-gray-100">{t("submit")}</Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}