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

export default function ReceiveCall({ t, getValue, setValue }: Props) {
    return (
        <View className="flex-row items-center justify-between bordered-box p-2"
            style={BOX_SHADOW.button}
        >
            <Ionicons name="call-outline" size={24} color="#25D366" />
            <Text className="dark:text-white">{t("ReceiveCalls")}</Text>
            <Checkbox onValueChange={(value) => setValue?.("receive_calls", value)} checked={getValue?.("receive_calls")} />
        </View>
    )
}