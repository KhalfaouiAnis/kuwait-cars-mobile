import Checkbox from "@/core/components/ui/input/checkbox";
import InputWithIcon from "@/core/components/ui/input/input-with-icon";
import PhoneInput from "@/core/components/ui/input/phone-input";
import { useSignUp } from "@/core/hooks/auth/useAuth";
import { Link } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function SignUpForm() {
    const { control, handleSubmit, onSubmit, isSubmitting, errors } = useSignUp()

    return (
        <View className="pt-4 px-4 pb-10">
            <View className="gap-y-3">
                <InputWithIcon icon="person-outline" placeholder="YOUR NAME" requiredMark
                    error={errors.fullname?.message}
                    control={control} name="fullname"
                />
                <PhoneInput control={control} name="phone" error={errors.phone?.message} />
                <InputWithIcon icon="lock-closed-outline" placeholder="PASSWORD" requiredMark endIcon="eye-outline"
                    error={errors.password?.message}
                    control={control} name="password" secureTextEntry
                />
                <InputWithIcon icon="mail-outline" placeholder="YOUR EMAIL"
                    error={errors.email?.message}
                    control={control} name="email"
                />
                <InputWithIcon icon="location-outline" placeholder="YOUR CITY"
                    error={errors.city?.message}
                    control={control} name="city"
                />
            </View>
            <View className="flex-row items-center justify-between mt-20">
                <View className="flex-row items-center gap-x-1">
                    <Checkbox
                        initialValue={false}
                        size={28}
                        color="#4CAF50"
                    />
                    <Text className="text-base text-secondary-900">Remember me</Text>
                </View>
                <Link href={"/(auth)/forgot_password"} className="items-center">
                    <Text className="text-base">Password forgotten?</Text>
                </Link>
            </View>

            <TouchableOpacity className="bg-primary-500 py-3 rounded-lg items-center mt-6"
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
            >
                <Text className="text-lg font-semibold text-secondary-900">
                    {isSubmitting ? <ActivityIndicator size="small" color="primary" /> : "Sign Up"}
                </Text>
            </TouchableOpacity>
            <Link href={"/(auth)/signin"} className="items-center mt-4">
                <Text className="text-base text-center">Have an account ? <Text className="text-primary-500 font-bold">Sign In</Text> </Text>
            </Link>
        </View>
    )
}