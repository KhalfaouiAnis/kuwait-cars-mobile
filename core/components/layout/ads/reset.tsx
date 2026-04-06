import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";

export default function Reset({ reset, disabled }: { reset: () => void, disabled?: boolean }) {
    const { t } = useTranslation("common")

    return (
        <TouchableOpacity className='p-2' onPress={reset} disabled={disabled}>
            <Text disabled={disabled} className='text-error disabled:text-black/50 dark:disabled:text-white/50'>
                {t("reset")}
            </Text>
        </TouchableOpacity>
    )
}