import { FontAwesome6 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { CTAProps } from "../types";

export function BlockCTA({ variant = "icon" }: CTAProps) {
    return (
        <TouchableOpacity className="border border-primary-500 py-2 px-3 rounded-lg items-center justify-center">
            <FontAwesome6 name="user-slash" size={variant === "icon" ? 20 : 24} color="#FF123D" />
        </TouchableOpacity>
    )
}