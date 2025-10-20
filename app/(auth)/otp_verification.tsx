import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import VerificationCode from "@/core/components/ui/input/verification-code";
import { useOTP } from "@/core/hooks/auth/useAuth";
import { useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function OTPVerificationScreen() {
    const { email } = useLocalSearchParams()
    const { verifyOtp } = useOTP()

    return (
        <FormWrapper title="OTP Verification">
            <Text className="mt-12 text-base text-center">
                We will send you a one time password on this Mobile Number
            </Text>
            <Text className="mt-6 text-base text-center text-error">
                +965 50 00 00 00
            </Text>
            <View className="pt-8 px-4">
                <VerificationCode numberOfElements={4} onComplete={async (otp) => verifyOtp(email as string, otp)} />
                <Text className="mt-6 text-base text-center">00:30</Text>
                <Text className="mt-4 text-base text-center">Do not send OTP ? <Text className="text-primary-500">Send OTP</Text></Text>
                <TouchableOpacity className="bg-primary-500 py-3 rounded-lg items-center mt-12">
                    <Text className="text-lg font-semibold text-secondary-900 disabled:text-gray-100">Submit</Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}