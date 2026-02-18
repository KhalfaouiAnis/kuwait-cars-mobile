import Checkbox from "@/core/components/ui/input/checkbox/checkbox";
import { DIMENSIONS } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { FieldValues, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { BaseTextInputProps } from "../..";

export default function AdContactOption<TForm extends FieldValues>({ control, name, label }: BaseTextInputProps<TForm>) {
    const { field: { onChange, value } } = useController({ control, name });
    const { icon, color } = getIconAndColor(name as any)
    const { t } = useTranslation("common")

    return (
        <View
            style={styles.wrapper}
            className="flex-row items-center justify-between border-[0.5px] border-grayish px-5"
        >
            <Ionicons name={icon as any} size={24} color={color} />
            <Text className="dark:text-white font-inter">{t(label || "")}</Text>
            <Checkbox onValueChange={onChange} checked={value} />
        </View>
    )
}

function getIconAndColor(name: "contact_whatsapp" | "receive_calls" | "xcar_calls" | "xcar_chat") {
    switch (name) {
        case "contact_whatsapp":
            return { icon: "logo-whatsapp", color: "#25D366" }
        case "receive_calls":
            return { icon: "call-outline", color: "#00A6DA" }
        case "xcar_calls":
            return { icon: "call-outline", color: "#FAED02" }
        case "xcar_chat":
            return { icon: "chatbox-ellipses-outline", color: "#FAED02" }
        default:
            return { icon: "logo-whatsapp", color: "#25D366" }
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: 60,
        borderRadius: 20,
        alignSelf: "center",
        ...boxShadow().button,
        width: DIMENSIONS.width - 60,
    }
});