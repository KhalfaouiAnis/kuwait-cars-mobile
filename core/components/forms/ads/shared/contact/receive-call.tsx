import Checkbox from "@/core/components/ui/input/checkbox";
import { DIMENSIONS } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    label: string,
    setValue?: any
    getValue?: any
}

export default function ReceiveCall({ label, getValue, setValue }: Props) {
    return (
        <View className="flex-row items-center justify-between bordered-box px-4"
            style={styles.wrapper}
        >
            <Ionicons name="call-outline" size={24} color="#25D366" />
            <Text className="dark:text-white font-inter">{label}</Text>
            <Checkbox onValueChange={(value) => setValue?.("receive_calls", value)} checked={getValue?.("receive_calls")} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 50,
        alignSelf: "center",
        borderRadius: 20,
        width: DIMENSIONS.width - 60,
        ...boxShadow().button,
    }
});