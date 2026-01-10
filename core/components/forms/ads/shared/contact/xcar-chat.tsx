import Checkbox from "@/core/components/ui/input/checkbox";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface Props {
    label: string,
    setValue?: any
    getValue?: any
}

export default function XCarChat({ label, getValue, setValue }: Props) {
    return (
        <View className="flex-row items-center justify-between bordered-box px-2 py-4"
            style={boxShadow().button}
        >
            <Ionicons name="chatbox-ellipses-outline" size={24} color="#00A6DA" />
            <Text className="dark:text-white font-inter-semibold">{label}</Text>
            <Checkbox onValueChange={(value) => setValue?.("xcar_chat", value)} checked={getValue?.("xcar_chat")} />
        </View>
    )
}