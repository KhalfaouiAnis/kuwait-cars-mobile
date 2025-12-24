import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { CTAProps } from "../types";

export function WhatsappCTA({ label }: CTAProps) {
    return (
        <TouchableOpacity className="border border-primary-500 py-1 px-3 rounded-lg items-center min-w-24">
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            <Text className="font-inter text-xs">{label}</Text>
        </TouchableOpacity>
    )
}