import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import InputWithIcon from "@/core/components/ui/input/input-with-icon";
import { useFormHook } from "@/core/hooks/use-form-hook";
import { RequestResetPasswordInterface, RequestResetPasswordSchema } from "@/core/types/schema/auth";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function ForgotPasswordScreen() {
    const { t } = useTranslation("auth");

    const { control, formState: { errors, isSubmitting }, handleSubmit } = useFormHook(RequestResetPasswordSchema,
        {
            defaultValues: { email: "", phone: "" }
        })

    const onSubmit = (data: RequestResetPasswordInterface) => { }

    return (
        <FormWrapper title={t("forgotPassword")}>
            <Text numberOfLines={2} ellipsizeMode="tail" className="mt-6 text-base text-center dark:text-white px-4">
                {t("emailToResetPassword")}
            </Text>
            <View className="pt-6 px-4">
                <InputWithIcon
                    control={control}
                    name="phone"
                    error={errors.phone?.message}
                    keyboardType="phone-pad"
                    customIcon={<Ionicons name="logo-whatsapp" size={20} color="#25D366" className="mr-2" />}
                    placeholder={t("enterWhatsappNumber")}
                />
                <Text className="my-2 text-gray-400 text-base text-center">{t("or")}</Text>
                <InputWithIcon
                    control={control}
                    name="email"
                    error={errors.email?.message}
                    icon="mail-outline"
                    placeholder={t("enterEmail")}
                />

                <TouchableOpacity className="bg-primary-500 py-3  rounded-lg items-center mt-20"
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    <Text className="text-lg font-semibold text-secondary-900">
                        {isSubmitting ? <ActivityIndicator size="small" color="primary" /> : t("resetPassword")}
                    </Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}