import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    label: string;
    icon: ReactNode;
    href?: any;
    dark?: any;
    isRtl?: boolean;
    onPress?: () => void;
}

export function SettingsLink({ href, icon, label, isRtl, onPress }: Props) {
    const { dark } = useTheme()
    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} className="flex-row items-center">
                <View className="w-full flex-row items-center">
                    {icon}
                    <Text className="ms-2 me-2 text-black dark:text-white">{label}</Text>
                    <Ionicons name={isRtl ? 'chevron-back' : 'chevron-forward'} size={20} color={dark ? "white" : "black"} className="ms-auto" />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <Link href={href} className="flex-row items-center">
            <View className="w-full flex-row items-center">
                {icon}
                <Text className="ms-2 me-2 text-black dark:text-white">{label}</Text>
                <Ionicons name={isRtl ? 'chevron-back' : 'chevron-forward'} size={20} color={dark ? "white" : "black"} className="ms-auto" />
            </View>
        </Link>
    )
}