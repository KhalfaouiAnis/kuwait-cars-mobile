import { renderOption } from '@/core/components/ui/shared/render-option';
import useSearchStore, { MultiFilterKeys } from '@/core/store/search.store';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, TouchableOpacity } from 'react-native';

interface Option { id: string; label: string; value: string; }

interface Props {
    filterKey: MultiFilterKeys;
    options: Option[];
}

export const MultiSelectContent = ({ filterKey, options }: Props) => {
    const { t } = useTranslation("car_categories")
    const selectedValues = useSearchStore((state) => state.draftFilters[filterKey] as string[]);
    const toggleMultiFilter = useSearchStore((state) => state.toggleDraftMultiFilter);

    const renderItem = ({ item }: { item: Option }) => {
        const isSelected = selectedValues?.includes(item.value);

        return (
            <TouchableOpacity
                className="flex-row items-center my-1"
                onPress={() => toggleMultiFilter(filterKey, item.value)}
            >
                {renderOption({ ...item, label: t(filterKey === "exterior_color" ? `colors.${item.label}` : `${item.label}`) }, isSelected)}
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text className="text-center text-gray-500 py-4">No {filterKey} match your filters</Text>}
        />
    );

};
