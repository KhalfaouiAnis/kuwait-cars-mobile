import useUserPreferencesStore from "@/core/store/preferences.store";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export function ProfileDrawer() {
    const { theme } = useUserPreferencesStore()

    const openProfile = () => router.push("/profile")

    return (
        <Pressable onPress={openProfile} hitSlop={6}>
            <MaterialIcons name="sort" size={28} color={theme !== "light" ? "#ffffffb3" : "black"} />
        </Pressable>
    )
}