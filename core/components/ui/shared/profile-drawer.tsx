import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { Pressable } from "react-native";

export function ProfileDrawer() {
const { dark } = useTheme()

    const openProfile = () => router.push("/profile")

    return (
        <Pressable onPress={openProfile} hitSlop={6}>
            <MaterialIcons name="sort" size={28} color={dark ? "#ffffffb3" : "black"} />
        </Pressable>
    )
}