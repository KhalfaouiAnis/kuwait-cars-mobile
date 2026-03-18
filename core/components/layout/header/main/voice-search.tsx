import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export default function VoiceSearch() {
    const { dark } = useTheme();

    return (
        <Ionicons
            name="mic-outline"
            size={22}
            color={dark ? "#B3B3B3" : "black"}
        />
    )
}