import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { CTAProps } from "../types";

export function WhatsappCTA({ label, variant }: CTAProps) {
    return (
        <TouchableOpacity className="border border-primary-500 py-2 px-3 rounded-lg items-center justify-center">
            <Ionicons name="logo-whatsapp" size={variant === "icon" ? 20 : 24} color="#25D366" />
            {variant === "button" && <Text className="font-inter text-xs dark:text-white">{label}</Text>}
        </TouchableOpacity>
    )
}