import Checkbox from '@/core/components/ui/input/checkbox';
import useSearchStore, { MultiFilterKeys } from '@/core/store/search.store';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

interface Option { id: string; label: string; value: string; }

interface Props {
    filterKey: MultiFilterKeys;
    options: Option[];
}

export const MultiSelectContent = ({ filterKey, options }: Props) => {
    const selectedValues = useSearchStore((state) => state.draftFilters[filterKey] as string[]);
    const toggleMultiFilter = useSearchStore((state) => state.toggleDraftMultiFilter);

    const renderOption = ({ item }: { item: Option }) => {
        const isSelected = selectedValues?.includes(item.value);

        return (
            <TouchableOpacity
                className="flex-row items-center p-3 my-1 border-b border-gray-200"
                onPress={() => toggleMultiFilter(filterKey, item.value)}
            >
                <View className="flex-1">
                    <Text className="font-medium">{item.label}</Text>
                </View>
                <Checkbox size={20} checked={isSelected} disabled />
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={renderOption}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text className="text-center text-gray-500 py-4">No {filterKey} match your filters</Text>}
        />
    );

};
