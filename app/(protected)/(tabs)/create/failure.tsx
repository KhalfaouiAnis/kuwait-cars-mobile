import Container from "@/core/components/ui/container";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

export default function AdPublishFailure() {
    const { t } = useTranslation("common")

    return (
        <Container>
            <View className="flex-1 items-center justify-center mt-32">
                <View className="flex-1">
                    <View className="items-center justify-center">
                        <Ionicons name="close-circle-outline" color="#FF123D" size={50} />
                    </View>
                    <View className="px-4 mt-8">
                        <Text className="text-2xl text-center font-inter-bold">{t("createAd.Failure")}</Text>
                        <Text className="mt-2 text-base text-center">{t("createAd.adPublishFailure")}</Text>
                    </View>
                </View>
                <View className="px-4 flex-1 w-full">
                    <Pressable className="bg-primary-500 py-3 mt-4 rounded-lg items-center"
                        onPress={() => router.canGoBack() && router.back()}
                    >
                        <Text className="text-lg font-inter-bold text-secondary-900">{t("createAd.back")}</Text>
                    </Pressable>
                </View>
            </View>
        </Container>
    )
}