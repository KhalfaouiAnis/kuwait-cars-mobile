import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    label: string;
    icon: ReactNode;
    href?: any
    isDark?: any
    onPress?: () => void
}

export function SettingsLink({ href, icon, label, isDark, onPress }: Props) {
    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} className="flex-row items-center">
                <View className="w-full  flex-row items-center">
                    {icon}
                    <Text className="ml-2 text-black dark:text-white">{label}</Text>
                    <Ionicons name="chevron-forward" size={20} color={isDark ? "white" : "black"} className="ml-auto" />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <Link href={href} className="flex-row items-center">
            <View className="w-full  flex-row items-center">
                {icon}
                <Text className="ml-2 text-black dark:text-white">{label}</Text>
                <Ionicons name="chevron-forward" size={20} color={isDark ? "white" : "black"} className="ml-auto" />
            </View>
        </Link>
    )
}