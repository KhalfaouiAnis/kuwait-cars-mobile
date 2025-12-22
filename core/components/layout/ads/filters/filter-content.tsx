import useSearchStore, { FilterState, MultiFilterKeys } from '@/core/store/search.store';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FILTER_CONFIG, FilterConfigKey } from './data';
import { MultiSelectContent } from './multi-select-content';
import SearchField from './search-field';

export const SmartFilterContent = ({ activeKey }: { activeKey: FilterConfigKey }) => {
    const config = FILTER_CONFIG[activeKey];
    const { draftFilters, toggleDraftMultiFilter } = useSearchStore((state) => state);
    const [localSearch, setLocalSearch] = useState('');

    const selectedValues = draftFilters.region as string[];

    const filteredOptions = useMemo(() => {
        let list = [...config.options];

        if (config.parentKey) {
            const pKey = config.parentKey as keyof FilterState;
            const parentSelections = draftFilters[pKey];

            if (Array.isArray(parentSelections)) {
                const activeSelections = parentSelections as string[];
                if (activeSelections.length > 0) {
                    list = list.filter(opt =>
                        opt.parentId && activeSelections.includes(opt.parentId)
                    );
                }
            }
        }

        if (config.showRegionHelper && draftFilters.region && draftFilters?.region?.length > 0) {
            if(draftFilters.region?.includes("All")) return list;
            list = list.filter(opt => opt.regionId && draftFilters?.region?.includes(opt.regionId));
        }

        if (config.showSearch && draftFilters.q) {
            const search = draftFilters.q.toLowerCase();
            list = list.filter(opt => opt.label.toLowerCase().includes(search));
        }

        return list;
    }, [draftFilters, config.options, config.parentKey, config.showRegionHelper, config.showSearch]);

    return (
        <View className="flex-1">
            {config.showRegionHelper && (
                <View className="mb-1">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
                        {["All","Asian","Chinese","European","American"].map((region) => {
                            const isSelected = selectedValues.includes(region);
                            return (
                                <TouchableOpacity
                                    key={region}
                                    className={`mx-1 px-4 py-2 rounded-full border ${isSelected ? 'border-primary-500 bg-gray-100' : 'border-primary-500'}`}
                                    onPress={() => toggleDraftMultiFilter("region", region)}
                                >
                                    <Text className={`${isSelected ? 'font-medium' : 'text-gray-600'}`}>
                                        {region}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            )}
            {config.showSearch && (
                <SearchField searchQuery={localSearch} setSearchQuery={setLocalSearch} />
            )}
            <MultiSelectContent
                filterKey={activeKey as MultiFilterKeys}
                options={filteredOptions}
            />
        </View>
    );
};
