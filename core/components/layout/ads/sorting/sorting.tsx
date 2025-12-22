import useSearchStore, { SortingItem } from "@/core/store/search.store";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const sortOptions: SortingItem[] = [
    { field: 'price', direction: "asc" },
    { field: 'price', direction: "desc" },
    { field: 'created_at', direction: "desc" },
    { field: 'created_at', direction: "asc" },
];

export const SortingContent = () => {
    const { draftFilters: { sorting }, setExternalFilter } = useSearchStore((state) => state);

    const renderItem = ({ item }: { item: typeof sortOptions[0] }) => {
        const isSelected = sorting.field === item.field && sorting.direction === item.direction

        return (
            <TouchableOpacity
                className={`flex-row items-center p-3 my-1 border-b border-gray-200 ${isSelected ? 'bg-primary-500' : ''}`}
                onPress={() => setExternalFilter("sorting", item)}
            >
                <View className="flex-1">
                    <Text className="font-medium">{item.field} {item.direction}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View className="flex-1">
            <FlatList
                data={sortOptions}
                keyExtractor={(item) => `${item.field}__${item.direction}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};