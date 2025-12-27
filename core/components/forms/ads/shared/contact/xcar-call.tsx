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

export default function XCarCall({ t, getValue, setValue }: Props) {
    return (
        <View className="flex-row items-center justify-between bordered-box p-2"
            style={BOX_SHADOW.button}
        >
            <Ionicons name="call-outline" size={24} color="#00A6DA" />
            <Text className="dark:text-white">{t("ReceiveCallViaXCar")}</Text>
            <Checkbox onValueChange={(value) => setValue?.("xcar_calls", value)} checked={getValue?.("xcar_calls")} />
        </View>
    )
}