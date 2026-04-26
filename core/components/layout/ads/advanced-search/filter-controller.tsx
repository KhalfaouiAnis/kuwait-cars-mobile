import FilterButton from "@/core/components/layout/ads/advanced-search/filter-button";
import { FilterUIStrategy } from "@/core/configuration/filters";
import useSearchStore, { MultiFilterKeys } from "@/core/store/search.store";
import { GlobalSelectOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useDropdown } from "react-native-anchor-dropdown";
import { MileageFilterContent } from "../filters/mileage-filter";
import { PriceFilterContent } from "../filters/price-filter";

const FilterController = ({ filterKey, label, config }: { filterKey: MultiFilterKeys, label: string, config: any }) => {
    const toggleMultiFilter = useSearchStore((state) => state.toggleDraftMultiFilter);
    const applyFilters = useSearchStore((state) => state.applyFilters);
    const {
        triggerRef,
        coords,
        isVisible,
        onDropdownLayout,
        close,
        toggle,
    } = useDropdown({ maxHeight: 200, gap: 8, placement: "auto" });
    const selectedValues = useSearchStore(state => state.appliedFilters)
    const { t } = useTranslation("common");

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
            <View style={[styles.selectOption, { backgroundColor: selectedValues[filterKey]?.includes(option.value) ? "#ffb84e" : "white" }]}>
                <Text className="text-center text-xs font-inter-semibold">{t(config.adapter.getLabel(option.value?.label || option.label))}</Text>
            </View>
        </Pressable>
    ), [filterKey, config.adapter, t, selectedValues])

    const keyExtractor = useCallback((item: GlobalSelectOption) => item.id, []);

    const renderItem = ({ item }: { item: GlobalSelectOption }) => (
        renderSelectOption(item, handleSelect)
    )

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
            <Modal visible={isVisible} transparent animationType="fade" onRequestClose={close}>
                <Pressable style={StyleSheet.absoluteFill} onPress={close} className="flex-1">
                    <View
                        onLayout={onDropdownLayout}
                        style={config.strategy === FilterUIStrategy.DROPDOWN ? [coords, styles.dropdown] : {
                            flex: 1,
                        }}
                    >
                        {config.strategy === FilterUIStrategy.DROPDOWN && (
                            <FlatList
                                renderItem={renderItem}
                                data={normalizedOptions}
                                keyExtractor={keyExtractor}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.listContent}
                            />
                        )}
                        <TouchableWithoutFeedback onPress={close}>
                            <View className="flex-1 justify-center items-center bg-black/70">
                                <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                                    <View>
                                        {config.strategy === FilterUIStrategy.PRICE && <PriceFilterContent />}
                                        {config.strategy === FilterUIStrategy.MILEAGE && <MileageFilterContent />}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

export default FilterController;

const styles = StyleSheet.create({
    dropdown: {
        position: "absolute",
        backgroundColor: "white",
        borderRadius: 20,
        width: "auto",
        padding: 4,
        ...boxShadow().button,
    },
    listContent: {
        gap: 12,
        padding: 6,
        paddingBottom: 12,
    },
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
