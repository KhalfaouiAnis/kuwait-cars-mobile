import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function Reset({ reset }: { reset: () => void }) {
    const { t } = useTranslation("common")

    return (
        <View>
            <TouchableOpacity className='p-2' onPress={reset}>
                <Text className='text-error'>
                    {t("reset")}
                </Text>
            </TouchableOpacity>
        </View>
    )
}