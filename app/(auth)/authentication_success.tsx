import SuccessIcon from "@/assets/svg/success";
import Container from "@/core/components/ui/container";
import { DIMENSIONS } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function AuthenticationSuccessScreen() {
    const { t } = useTranslation("auth");

    return (
        <Container>
            <View className="mt-20 items-center">
                <SuccessIcon />
            </View>
            <View className="px-4 mt-8">
                <Text className="text-2xl text-center font-inter-bold dark:text-white">{t("success")}</Text>
                <Text className="mt-2 text-base text-center dark:text-white">{t("authSuccess")}</Text>
            </View>
            <View className="px-4 mt-52">
                <TouchableOpacity
                    className="bg-primary-500 py-3 rounded-full items-center"
                    style={{
                        boxShadow: boxShadow(4, 6, 20).button.boxShadow,
                        width: DIMENSIONS.width / 2 + 20,
                    }}
                >
                    <Text className="text-2xl font-inter-semibold text-center text-black">
                        {t("updatePassword")}
                    </Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}