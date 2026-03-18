import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Pressable, Text } from "react-native";

interface Props {
    title: string;
    active: boolean,
    handleOpen: () => void
}

export default function FilterButton({ title, handleOpen, active }: Props) {
    const { t } = useTranslation("common");
    const { dark } = useTheme()

    return (
        <Pressable
            onPress={handleOpen}
            className={`flex-row items-center ${active ? "border-b-2 border-primary-500" : "border-b border-gray-300"}`}

        >
            <Text className="font-inter text-black dark:bg-darkish text-sm dark:text-white/75">
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