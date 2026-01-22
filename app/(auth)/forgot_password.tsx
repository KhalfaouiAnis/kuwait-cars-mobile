import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import AuthTextInput from "@/core/components/ui/input/text/auth-input";
import { DIMENSIONS } from "@/core/constants";
import { useFormHook } from "@/core/hooks/use-form-hook";
import { RequestResetPasswordInterface, RequestResetPasswordSchema } from "@/core/types/schema/auth";
import { boxShadow } from "@/core/utils/cn";
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
            <View className="py-6 px-4 items-center">
                <AuthTextInput
                    control={control}
                    name="phone"
                    error={errors.phone?.message}
                    keyboardType="phone-pad"
                    customIcon={<Ionicons name="logo-whatsapp" size={20} color="#25D366" className="ms-2" />}
                    placeholder={t("enterWhatsappNumber")}
                />
                <Text className="my-2 text-gray-400 text-base text-center">{t("or")}</Text>
                <AuthTextInput
                    control={control}
                    name="email"
                    error={errors.email?.message}
                    icon="mail-outline"
                    placeholder={t("enterEmail")}
                />
                <TouchableOpacity
                    className="bg-primary-500 py-3 rounded-full items-center mt-20"
                    style={{
                        boxShadow: boxShadow(4, 6, 20).button.boxShadow,
                        width: DIMENSIONS.width / 2 + 20,
                    }}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    <Text className="text-2xl font-inter-semibold text-center text-black">
                        {isSubmitting ? <ActivityIndicator size="small" color="#fff" /> : t("resetPassword")}
                    </Text>
                </TouchableOpacity>
            </View>
        </FormWrapper>
    )
}