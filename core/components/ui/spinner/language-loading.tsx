import useUserPreferencesStore from "@/core/store/preferences.store";
import { ActivityIndicator, Text, View } from "react-native";

export default function LanguageLoadingSpinner() {
    const { isI18nReady } = useUserPreferencesStore()

    if (!isI18nReady) return (
        <View className="absolute inset-0 bg-black/50 justify-center items-center z-50">
            <ActivityIndicator size="large" color="#007AFF" />
            <Text className="text-white text-lg">Loading trnaslations...</Text>
        </View>
    )
}
