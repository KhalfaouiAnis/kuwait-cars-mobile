import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { CTAProps } from "../types";

export function CallCTA({ label, variant }: CTAProps) {
    const { protectAction } = useAuthGuard();

    const handlePress = () => {
        protectAction(() => { })
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            className="border border-primary-500 py-2 px-3 rounded-lg items-center justify-center">
            <Ionicons name="call-outline" size={variant === "icon" ? 20 : 24} color={"#00A6DA"} />
            {variant === "button" && <Text className="font-inter text-xs dark:text-white">{label}</Text>}
        </TouchableOpacity>
    )
}