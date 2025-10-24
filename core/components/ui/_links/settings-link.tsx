import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ReactNode } from "react";
import { Text, View } from "react-native";

interface Props {
    href: any
    label: string;
    icon: ReactNode
}

export function SettingsLink({ href, icon, label }: Props) {
    return (
        <Link href={href} className="flex-row items-center">
            <View className="w-full  flex-row items-center">
                {icon}
                <Text className="ml-2">{label}</Text>
                <Ionicons name="chevron-forward" size={20} className="ml-auto" />
            </View>
        </Link>
    )
}