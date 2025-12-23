import AppModal from "@/core/components/ui/dialog/modal";
import { FilterConfigItem } from "@/core/constants/ad";
import useSearchStore, { CombinedFilterKeys, MultiFilterKeys } from "@/core/store/search.store";
import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Reset from "../reset";
import { SortingContent } from "../sorting/sorting";
import { SmartFilterContent } from "./filter-content";
import { PriceFilterContent } from "./price-filter";

interface Props {
    isDark: boolean,
    setView: Dispatch<SetStateAction<"horizontal" | "vertical">>
    filterConfig: Record<string, FilterConfigItem>
}

export const MainFilters = ({ isDark, setView, filterConfig }: Props) => {
    const [activeKey, setActiveKey] = useState<keyof typeof filterConfig | null>(null);
    const { syncDraftToApplied, applyFilters, draftFilters, resetDraftFilter } = useSearchStore();

    const handleOpen = (key: keyof typeof filterConfig) => {
        syncDraftToApplied();
        setActiveKey(key);
    };

    return (
        <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="pe-2">
                <Pressable>
                    <View className="ml-2 border border-[#EFEFEF] p-2 rounded-lg flex-row items-center dark:bg-darkish">
                        <Text className="mr-2 text-black dark:text-white">Filters</Text>
                        <Ionicons name="filter" size={16} color={isDark ? "white" : "black"} style={{ fontWeight: "bold" }} />
                    </View>
                </Pressable>
                {Object.entries(filterConfig).map(([key, config]) => (
                    <Pressable
                        key={key}
                        onPress={() => handleOpen(key as any)}
                        disabled={draftFilters[config?.parentKey as MultiFilterKeys]?.length === 0}
                    >
                        <View className="ml-2 border border-[#EFEFEF] p-2 rounded-lg flex-row items-center dark:bg-darkish">
                            <Text className="mr-2 text-black dark:text-white">{config.title}</Text>
                            <Ionicons name="chevron-down" size={16} color={isDark ? "white" : "black"} style={{ fontWeight: "bold" }} />
                        </View>
                    </Pressable>
                ))}
                <Pressable onPress={() => handleOpen("price")}>
                    <View className="ml-2 border border-[#EFEFEF] p-2 rounded-lg flex-row items-center dark:bg-darkish">
                        <Text className="mr-2 text-black dark:text-white">Price</Text>
                        <Ionicons name="chevron-down" size={16} color={isDark ? "white" : "black"} style={{ fontWeight: "bold" }} />
                    </View>
                </Pressable>
            </ScrollView>
            <View className="flex-row items-center mt-2 gap-x-2 px-2">
                <Pressable className="border border-[#EFEFEF] p-2 rounded-lg flex-row items-center gap-x-2 dark:bg-darkish"
                    onPress={() => setView(prevState => prevState === "horizontal" ? "vertical" : "horizontal")}>
                    <Fontisto name="nav-icon-list-a" size={16} color={isDark ? "white" : "black"} />
                    <Text className="text-black dark:text-white">change view</Text>
                </Pressable>
                <Pressable className="border border-[#EFEFEF] p-2 rounded-lg flex-row items-center gap-x-2 dark:bg-darkish"
                    onPress={() => handleOpen("sorting")}>
                    <MaterialCommunityIcons name="sort" size={18} color={isDark ? "white" : "black"} />
                    <Text className="text-black dark:text-white">sort by</Text>
                </Pressable>
                <Text className="text-black dark:text-white ms-auto me-3">Used Cars</Text>
            </View>
            <AppModal
                visible={!!activeKey}
                onClose={() => {
                    applyFilters()
                    setActiveKey(null)
                }}
                header={<Reset reset={() => resetDraftFilter(activeKey as CombinedFilterKeys)} />}
                renderContent={() => {
                    if (!activeKey) return null;

                    if (activeKey === "price") {
                        return <PriceFilterContent />
                    } else if (activeKey === "sorting") {
                        return <SortingContent />
                    }
                    if (activeKey) return (
                        <SmartFilterContent activeKey={activeKey} filterConfig={filterConfig} />
                    )
                }}
            />
        </>
    );
};
