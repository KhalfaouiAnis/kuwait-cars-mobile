import useUserPreferencesStore from "@/core/store/preferences.store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function BackArrow({ navigate }: { navigate?: any }) {
    const { theme, isRTL } = useUserPreferencesStore()
    const onBack = () => {
        if (navigate && typeof navigate === "function") return navigate()
        router.canGoBack() && router.back()
    }

    return (
        <Pressable hitSlop={10} onPress={onBack}>
            <Ionicons name={isRTL ? "chevron-forward" : "chevron-back"} size={24} color={theme !== "light" ? "white" : "black"} />
        </Pressable>
    )
}