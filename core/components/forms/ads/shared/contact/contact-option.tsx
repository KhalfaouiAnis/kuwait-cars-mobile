import Checkbox from "@/core/components/ui/input/checkbox";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

interface Props {
    icon: ReactNode
    setValue?: any
    getValue?: any
}

export default function ReceiveCall({ icon, getValue, setValue }: Props) {
    const { t } = useTranslation("common")

    return (
        <View className="flex-row items-center justify-between border border-gray-200 dark:border-primary-500 p-2">
            {icon}
            <Text className="dark:text-white font-inter-semibold">{t("createAd.ReceiveCalls")}</Text>
            <Checkbox onValueChange={(value) => setValue?.("receive_calls", value)} checked={getValue?.("receive_calls")} />
        </View>
    )
}