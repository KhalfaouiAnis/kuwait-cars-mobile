import FilterButton from "@/core/components/layout/ads/advanced-search/filter-button";
import { FilterUIStrategy } from "@/core/configuration/filters";
import { DIMENSIONS } from "@/core/constants";
import { useDropdown } from "@/core/hooks/use-dropdown";
import useUserPreferencesStore from "@/core/store/preferences.store";
import useSearchStore, { MultiFilterKeys } from "@/core/store/search.store";
import { GlobalSelectOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MileageFilterContent } from "../filters/mileage-filter";
import { PriceFilterContent } from "../filters/price-filter";

const FilterController = ({ filterKey, label, config }: { filterKey: MultiFilterKeys, label: string, config: any }) => {
    const toggleMultiFilter = useSearchStore((state) => state.toggleDraftMultiFilter);
    const applyFilters = useSearchStore((state) => state.applyFilters);
    const { triggerRef, isVisible, coords, toggle, close } = useDropdown();
    const selectedValues = useSearchStore(state => state.appliedFilters)
    const { isRTL } = useUserPreferencesStore();
    const { t } = useTranslation("common");
    const { bottom } = useSafeAreaInsets()

    const normalizedOptions = useMemo(() => {
        if (!Array.isArray(config.options)) return [];
        const mapFn = config.adapter?.map || ((item: any) => item);
        return config.options.map(mapFn);
    }, [config.options, config.adapter]);

    const handleSelect = useCallback((option: GlobalSelectOption) => {
        toggleMultiFilter(filterKey, option.value)
        applyFilters()
        close();
    }, [filterKey, close, toggleMultiFilter, applyFilters])

    const renderSelectOption = useCallback((option: GlobalSelectOption, handleSelect: any) => (
        <Pressable onPress={() => handleSelect(option)}>
            <View style={[styles.selectOption, { backgroundColor: selectedValues[filterKey]?.includes(option.value) ? "#D9D9D9" : "white" }]}>
                <Text className="text-center text-xs font-inter-semibold">{t(config.adapter.getLabel(option.value?.label || option.label))}</Text>
            </View>
        </Pressable>
    ), [filterKey, config.adapter, t, selectedValues])

    const keyExtractor = useCallback((item: GlobalSelectOption) => item.id, []);

    const renderItem = ({ item }: { item: GlobalSelectOption }) => (
        renderSelectOption(item, handleSelect)
    )

    const overlayStyle = config.strategy === FilterUIStrategy.DROPDOWN
        ? {
            position: 'absolute' as const,
            top: coords.top,
            [!isRTL ? 'right' : 'left']: coords.left,
            bottom: bottom + 10,
            maxHeight: DIMENSIONS.height * 0.4,
            alignSelf: 'flex-start',
            borderRadius: 20,
            ...boxShadow().button,
            backgroundColor: 'white',
        }
        : {
            alignSelf: 'center' as const,
            marginTop: 100,
            width: '90%',
        }

    return (
        <>
            <FilterButton
                label={label}
                ref={triggerRef}
                onPress={toggle}
                icon={config.icon}
                isActive={isVisible}
                family={config.family}
            />

            <Modal visible={isVisible} transparent animationType="fade">
                <Pressable className="flex-1 bg-black/10" onPress={close}>
                    <Pressable
                        style={[overlayStyle as any]}
                        onPress={() => { }}
                    >
                        {config.strategy === FilterUIStrategy.DROPDOWN && (
                            <FlatList
                                renderItem={renderItem}
                                data={normalizedOptions}
                                keyExtractor={keyExtractor}
                                showsVerticalScrollIndicator={false}
                                contentContainerClassName="gap-2 p-3 pb-3"
                            />
                        )}
                        {config.strategy === FilterUIStrategy.PRICE && <PriceFilterContent />}
                        {config.strategy === FilterUIStrategy.MILEAGE && <MileageFilterContent />}
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
};

export default FilterController;

const styles = StyleSheet.create({
    selectOption: {
        height: 30,
        minWidth: 100,
        borderRadius: 12,
        paddingHorizontal: 6,
        alignItems: "center",
        ...boxShadow().button,
        justifyContent: "center",
    }
});