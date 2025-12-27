import Checkbox from "@/core/components/ui/input/checkbox";
import { TFunction } from "i18next";
import { ReactNode } from "react";
import { Text, View } from "react-native";

interface Props {
    t: TFunction,
    icon: ReactNode
    setValue?: any
    getValue?: any
}

export default function ReceiveCall({ t, icon, getValue, setValue }: Props) {
    return (
        <View className="flex-row items-center justify-between border border-gray-200 dark:border-primary-500 p-2">
            {icon}
            <Text className="dark:text-white">{t("ReceiveCalls")}</Text>
            <Checkbox onValueChange={(value) => setValue?.("receive_calls", value)} checked={getValue?.("receive_calls")} />
        </View>
    )
}