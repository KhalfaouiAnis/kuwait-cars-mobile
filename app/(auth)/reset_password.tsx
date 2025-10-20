import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import InputWithIcon from "@/core/components/ui/input/input-with-icon";
import { useResetPassword } from "@/core/hooks/auth/useAuth";
import { Text, TouchableOpacity, View } from "react-native";

export default function ResetPasswordScreen() {
    const { control, errors, isSubmitting, handleSubmit, onSubmit } = useResetPassword()

    return (
        <FormWrapper title="Reset Password">
            <Text className="mt-6 text-base text-center">
                Create your new password
            </Text>
            <View className="pt-2 px-4 my-1">
                <InputWithIcon
                    control={control}
                    name="email"
                    error={errors.email?.message}
                    icon="mail-outline" placeholder="Enter your email" label="Your Email" />
                <InputWithIcon
                    control={control}
                    name="password"
                    error={errors.email?.message}
                    icon="lock-closed-outline" placeholder="Create New Password" label="New Password" endIcon="eye-outline" />
                <InputWithIcon
                    control={control}
                    name="confirmPassword"
                    error={errors.confirmPassword?.message}
                    icon="lock-closed-outline" placeholder="Confirm Password" label="Confirm Password" endIcon="eye-outline" />
            </View>
            <View className="px-4">
                <TouchableOpacity className="bg-primary-500 py-3 mt-4 rounded-lg items-center"
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}>
                    <Text className="text-lg font-semibold text-secondary-900">Reset password</Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}