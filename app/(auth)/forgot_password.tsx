import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import InputWithIcon from "@/core/components/ui/input/input-with-icon";
import { useFormHook } from "@/core/hooks/use-form-hook";
import { EmailSchema, EmailType } from "@/core/types/schema/auth";
import { Link } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function ForgotPasswordScreen() {
    const { control, formState: { errors, isSubmitting }, handleSubmit } = useFormHook(EmailSchema, { defaultValues: { email: "" } })

    const onSubmit = (data: EmailType) => {

    }

    return (
        <FormWrapper title="Forgot Password">
            <Text className="mt-6 text-base text-center">
                Please enter your email to reset the password
            </Text>
            <View className="pt-20 px-4">
                <Text className="text-base font-semibold pl-6 mb-2">Your Email</Text>
                <InputWithIcon
                    control={control}
                    name="email"
                    error={errors.email?.message}
                    icon="mail-outline" placeholder="Enter your email" />
                <TouchableOpacity className="bg-primary-500 py-3  rounded-lg items-center mt-20"
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    <Text className="text-lg font-semibold text-secondary-900">
                        {isSubmitting ? <ActivityIndicator size="small" color="primary" /> : "Reset Password"}
                    </Text>
                </TouchableOpacity>
                <Link href={"/verify_password"}>Verify password</Link>
                <Link href={"/password_reset_confirmation"}>confirm password reset</Link>
                <Link href={"/reset_password"}>reset password</Link>
                <Link href={"/authentication_success"}>Success</Link>
            </View>
        </FormWrapper>
    )
}