import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { CTAProps } from "../types";

export function ChatCTA({ label, variant }: CTAProps) {
    return (
        <TouchableOpacity className="border border-primary-500 py-1 px-3 rounded-lg items-center min-w-24">
            <Ionicons name="chatbox-ellipses-outline" size={variant === "icon" ? 20 : 24} color={"#00A6DA"} />
            {variant === "button" && <Text className="font-inter text-xs dark:text-white">{label}</Text>}
        </TouchableOpacity>
    )
}