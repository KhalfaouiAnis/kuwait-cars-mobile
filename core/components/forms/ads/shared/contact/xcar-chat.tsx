import Checkbox from "@/core/components/ui/input/checkbox";
import { BOX_SHADOW } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { TFunction } from "i18next";
import { Text, View } from "react-native";

interface Props {
    t: TFunction,
    setValue?: any
    getValue?: any
}

export default function XCarChat({ t, getValue, setValue }: Props) {
    return (
        <View className="flex-row items-center justify-between bordered-box p-2"
            style={BOX_SHADOW.button}
        >
            <Ionicons name="chatbox-ellipses-outline" size={24} color="#00A6DA" />
            <Text className="dark:text-white">{t("ChatViaXcar")}</Text>
            <Checkbox onValueChange={(value) => setValue?.("xcar_chat", value)} checked={getValue?.("xcar_chat")} />
        </View>
    )
}