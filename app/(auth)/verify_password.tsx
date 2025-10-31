import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import VerificationCode from "@/core/components/ui/input/verification-code";
import { Text, TouchableOpacity, View } from "react-native";

export default function VerifyPasswordResetCodeScreen() {
    return (
        <FormWrapper title="Check Your Email">
            <Text className="mt-6 text-base text-center">
                We sent a reset link to moha...@gmail.com
            </Text>
            <Text className="mt-1 text-base text-center">
                enter 5 digit code that mentioned in the email
            </Text>
            <View className="pt-20 px-4">
                <VerificationCode numberOfElements={5} />
                <TouchableOpacity className="bg-primary-500 py-3  rounded-lg items-center mt-20">
                    <Text className="text-lg font-semibold text-secondary-900">Verify Code</Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}