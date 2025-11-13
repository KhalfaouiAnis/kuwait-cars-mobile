import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import InputWithIcon from "@/core/components/ui/input/input-with-icon";
import { useResetPassword } from "@/core/hooks/auth/useAuth";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function ResetPasswordScreen() {
    const { control, errors, isSubmitting, handleSubmit, onSubmit } = useResetPassword()

    return (
        <FormWrapper title="Reset Password">
            <Text className="mt-6 text-base text-center">
                Create your new password
            </Text>
            <View className="pt-2 px-4 my-1">
                <InputWithIcon
                    icon="call-outline"
                    placeholder="Phone Number"
                    name="phone"
                    error={errors.phone?.message}
                    control={control}
                    label="Your Phone"
                />
                <InputWithIcon
                    name="password"
                    control={control}
                    error={errors.password?.message}
                    label="New Password" endIcon="eye-outline"
                    icon="lock-closed-outline" placeholder="Create New Password"
                />
                <InputWithIcon
                    control={control}
                    name="confirmPassword"
                    error={errors.confirmPassword?.message}
                    label="Confirm Password" endIcon="eye-outline"
                    icon="lock-closed-outline" placeholder="Confirm Password"
                />
            </View>
            <View className="px-4">
                <TouchableOpacity className="bg-primary-500 py-3 mt-4 rounded-lg items-center"
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}>
                    <Text className="text-lg font-semibold text-secondary-900">
                        {isSubmitting ? <ActivityIndicator size="small" color="primary" /> : "Reset password"}
                    </Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}