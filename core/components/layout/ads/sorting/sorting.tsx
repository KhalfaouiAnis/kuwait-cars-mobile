import useUserPreferencesStore from "@/core/store/preferences.store";
import useSearchStore, { SortingItem } from "@/core/store/search.store";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const sortOptions: (SortingItem & { label: string })[] = [
    { field: 'price', direction: "asc", label: "lowestPrice" },
    { field: 'price', direction: "desc", label: "highestPrice" },
    { field: 'created_at', direction: "desc", label: "newest" },
    { field: 'created_at', direction: "asc", label: "oldest" },
];

export const SortingContent = () => {
    const { t } = useTranslation("common")
    const isRTL = useUserPreferencesStore(state => state.isRTL)
    const { draftFilters: { sorting }, setExternalFilter } = useSearchStore((state) => state);

    const renderItem = ({ item }: { item: typeof sortOptions[0] }) => {
        const isSelected = sorting.field === item.field && sorting.direction === item.direction

        return (
            <TouchableOpacity
                onPress={() => setExternalFilter("sorting", item)}
                className={`flex-row items-center p-3 my-1 border-b border-gray-200 ${isSelected ? 'bg-primary-500' : 'bg-white dark:bg-darkish'}`}
            >
                <View className="flex-1" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                    <Text className="font-medium dark:text-white">{t(`sort.${item.label}`)}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View className="flex-1">
            <FlatList
                data={sortOptions}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => `${item.field}__${item.direction}`}
            />
        </View>
    );
};