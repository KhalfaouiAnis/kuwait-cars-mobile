import Checkbox from '@/core/components/ui/input/checkbox/checkbox';
import useUserPreferencesStore from '@/core/store/preferences.store';
import useSearchStore, { MultiFilterKeys } from '@/core/store/search.store';
import { boxShadow } from '@/core/utils/cn';
import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Option { id: string; label: string; value: string; }

interface Props {
    filterKey: MultiFilterKeys;
    options: Option[];
}

export const MultiSelectContent = ({ filterKey, options }: Props) => {
    const selectedValues = useSearchStore((state) => state.draftFilters[filterKey] as string[]);
    const toggleMultiFilter = useSearchStore((state) => state.toggleDraftMultiFilter);
    const isRTL = useUserPreferencesStore(state => state.isRTL)

    const renderItem = useCallback(({ item }: { item: Option }) => {
        const isSelected = selectedValues?.includes(item.value);

        return (
            <TouchableOpacity
                className="flex-row items-center py-3 my-2.5 mx-8 px-4 dark:bg-darkish"
                style={{
                    height: 45,
                    borderRadius: 15,
                    direction: isRTL ? "rtl" : "ltr",
                    boxShadow: boxShadow(0, 4, 4).button.boxShadow,

                }}
                onPress={() => toggleMultiFilter(filterKey, item.value)}
            >
                <View className='flex-1 ms-2'>
                    <Text className="text-lg dark:text-white">{item.label}</Text>
                </View>
                <View className='pe-2'>
                    <Checkbox size={24} checked={isSelected} disabled />
                </View>
            </TouchableOpacity>
        );
    }, [filterKey, toggleMultiFilter, selectedValues, isRTL])

    const keyExtractor = useCallback((item: Option) => item.id, []);

    return (
        <FlashList
            data={options}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text className="text-center text-gray-500 py-4">No {filterKey} match your filters</Text>}
        />
    );

};
