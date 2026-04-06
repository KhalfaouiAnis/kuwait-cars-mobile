import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Pressable, Text } from "react-native";

interface Props {
    title: string;
    active: boolean,
    disabled?: boolean,
    handleOpen: () => void,
}

function getBorder(active: boolean, disabled: boolean) {
    const className = "flex-row items-center ";
    if (disabled) return className;
    if (active) return className.concat("border-b-2 border-blue");
    return className.concat("border-b border-gray-300")
}

export default function FilterButton({ title, handleOpen, active, disabled = false }: Props) {
    const { t } = useTranslation("common");
    const { dark } = useTheme()

    return (
        <Pressable
            disabled={disabled}
            onPress={handleOpen}
            className={getBorder(active, disabled)}
        >
            <Text disabled={disabled} className="font-inter text-black dark:bg-darkish text-sm dark:text-white/75 disabled:text-black/50 dark:disabled:text-white/50">
                {t(`advancedSearch.${title}`)}
            </Text>
            <Ionicons
                size={14}
                name="chevron-down"
                style={{ fontWeight: "900", marginStart: 4 }}
                color={dark ? "rgb(255 255 255 / 0.75)" : "black"}
            />
        </Pressable>
    )
}