import Checkbox from "@/core/components/ui/input/checkbox/checkbox";
import { DIMENSIONS } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    label: string,
    setValue?: any
    getValue?: any
}

export default function WhatsappContact({ label, getValue, setValue }: Props) {
    return (
        <View className="flex-row items-center justify-between border border-grayish px-4"
            style={styles.wrapper}
        >
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            <Text className="dark:text-white font-inter">{label}</Text>
            <Checkbox onValueChange={(value) => setValue?.("contact_whatsapp", value)} checked={getValue?.("contact_whatsapp")} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 50,
        borderRadius: 20,
        alignSelf: "center",
        ...boxShadow().button,
        width: DIMENSIONS.width - 60,
    }
});