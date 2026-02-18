import useUserPreferencesStore from "@/core/store/preferences.store";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native';
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function BackArrow({ navigate, ignoreRTL }: { navigate?: any, ignoreRTL?: boolean }) {
    const { isRTL } = useUserPreferencesStore()
    const { dark } = useTheme();
    const onBack = () => {
        if (navigate && typeof navigate === "function") return navigate()
        router.canGoBack() && router.back()
    }

    function getIconName() {
        if (ignoreRTL) return "chevron-back";
        if (isRTL) return "chevron-forward"
        return "chevron-back"
    }

    return (
        <Pressable hitSlop={10} onPress={onBack}>
            <Ionicons name={getIconName()} size={24} color={dark ? "#ffffffb3" : "black"} />
        </Pressable>
    )
}