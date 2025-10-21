import useUserPreferencesStore from "@/core/lib/stores/preferences.store";
import { ActivityIndicator, Text, View } from "react-native";

export default function LanguageLoadingPortal() {
    const { isI18NLoading } = useUserPreferencesStore()

    if (isI18NLoading) return (
        <View className="absolute inset-0 bg-black/50 justify-center items-center z-50">
            <ActivityIndicator size="large" color="#007AFF" />
            <Text className="text-white text-lg">Loading trnaslations...</Text>
        </View>
    )
}
