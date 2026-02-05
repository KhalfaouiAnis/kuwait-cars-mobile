import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

interface Props {
    filterKey: any;
    title: string;
    isDark: boolean;
    handleOpen: (filterKey: any) => void
}

export default function FilterButton({ filterKey, title, isDark, handleOpen }: Props) {
    const { t } = useTranslation("common");

    return (
        <Pressable onPress={() => handleOpen(filterKey)}>
            <View className="ml-2 border border-[#EFEFEF] p-2 rounded-3xl flex-row items-center dark:bg-black">
                <Text className="ms-2 text-black dark:text-white">
                    {t(`advancedSearch.${title}`)}
                </Text>
                <Ionicons
                    name="chevron-down"
                    size={16}
                    color={isDark ? "white" : "black"}
                    style={{ fontWeight: "900", paddingTop: 2 }}
                />
            </View>
        </Pressable>
    )
}