import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import { Text, TouchableOpacity, View } from "react-native";

export default function PasswordResetConfirmationScreen() {
    return (
        <FormWrapper title="Password Reset">
            <Text className="mt-6 text-base text-center">
                Your password has been successfully reset. 
            </Text>
            <Text className="mt-1 text-base text-center">
                click confirm to set a new password
            </Text>
            <View className="mt-32 px-4">
                <TouchableOpacity className="bg-primary-500 py-3  rounded-lg items-center mt-20">
                    <Text className="text-lg font-semibold text-secondary-900">Confirm</Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}