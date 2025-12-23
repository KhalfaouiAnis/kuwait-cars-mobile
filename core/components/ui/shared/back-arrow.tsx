import useUserPreferencesStore from "@/core/store/preferences.store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function BackArrow() {
    const { isRTL } = useUserPreferencesStore()

    return (
        <Pressable hitSlop={10} onPress={() => router.back()}>
            <Ionicons name={isRTL ? "chevron-forward" : "chevron-back"} size={22} />
        </Pressable>
    )
}