import { FilterConfigKey } from '@/core/constants/ad';
import useSearchStore, { MultiFilterKeys } from '@/core/store/search.store';
import { FilterConfigItem } from '@/core/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MultiSelectContent } from './multi-select-content';
import SearchField from './search-field';

export const SmartFilterContent = ({ activeKey, filterConfig }: { activeKey: FilterConfigKey, filterConfig: Record<string, FilterConfigItem> }) => {
    const { t } = useTranslation("car_categories")

    const config = filterConfig[activeKey];
    const { draftFilters, toggleDraftMultiFilter, setDraftFilter } = useSearchStore((state) => state);

    const selectedValues = draftFilters.region as string[];

    const filteredOptions = useMemo(() => {
        let list = [...config.options.map(item => ({
            ...item,
            label: t(activeKey === "exterior_color" ? `colors.${item.label}` : `${item.label}`),
            value: activeKey === "model" ? item.value.split("/")?.[1] : item.value,
            regionId: item.regionId && t(item.regionId),
        }))];

        if (config.showRegionHelper && draftFilters.region && draftFilters?.region?.length > 0) {
            if (draftFilters.region?.includes(t("All"))) return list;
            list = list.filter(opt => opt.regionId && draftFilters?.region?.includes(opt.regionId));
        }

        if (config.showSearch && draftFilters.q) {
            const search = draftFilters.q.trim().toLowerCase();
            list = list.filter(opt => opt.label.toLowerCase().includes(search));
        }

        return list;
    }, [draftFilters, config.options, config.showRegionHelper, config.showSearch, activeKey, t]);

    return (
        <View className="flex-1">
            {config.showRegionHelper && (
                <View className="mb-1">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
                        {["All", "Asian", "Chinese", "European", "American"].map((region) => {
                            const isSelected = selectedValues.includes(t(region));
                            return (
                                <TouchableOpacity
                                    key={region}
                                    className={`mx-1 px-4 py-2 rounded-full border ${isSelected ? 'border-primary-500 bg-gray-100' : 'border-primary-500'}`}
                                    onPress={() => toggleDraftMultiFilter("region", t(region))}
                                >
                                    <Text className={`${isSelected ? 'font-medium' : 'text-gray-600'}`}>
                                        {t(region)}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            )}
            {config.showSearch && (
                <SearchField searchQuery={draftFilters.q} setSearchQuery={(value) => setDraftFilter("q", value)} />
            )}
            <MultiSelectContent
                filterKey={activeKey as MultiFilterKeys}
                options={filteredOptions}
            />
        </View>
    );
};
