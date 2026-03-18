import FilterButton from "@/core/components/layout/ads/advanced-search/filter-button";
import { FilterUIStrategy } from "@/core/configuration/filters";
import { DIMENSIONS } from "@/core/constants";
import { useDropdown } from "@/core/hooks/use-dropdown";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { GlobalSelectOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PriceFilterContent } from "../filters/price-filter";

const FilterController = ({ field, config }: { field: string, config: any }) => {
    const { triggerRef, isVisible, coords, toggle, close } = useDropdown();
        const { t } = useTranslation("common");
    const { isRTL } = useUserPreferencesStore();
    const { bottom } = useSafeAreaInsets()

    const normalizedOptions = useMemo(() => {
        if (!Array.isArray(config.options)) return [];
        const mapFn = config.adapter?.map || ((item: any) => item);
        return config.options.map(mapFn);
    }, [config.options, config.adapter]);

    const renderSelectOption = useCallback((option: GlobalSelectOption, handleSelect: any) => (
        <Pressable onPress={() => handleSelect(option)}>
            <View style={[styles.selectOption]}>
                <Text className="text-center text-xs font-inter-semibold">{t(config.adapter.getLabel(option.value?.label || option.label))}</Text>
            </View>
        </Pressable>
    ), [config.adapter, t])

    const keyExtractor = useCallback((item: GlobalSelectOption) => item.id, []);

    const renderItem = ({ item }: { item: GlobalSelectOption }) => (
        renderSelectOption(item, handleSelect)
    )

    const handleSelect = useCallback((option: GlobalSelectOption) => {
        close();
    }, [close])

    const overlayStyle = config.strategy === FilterUIStrategy.DROPDOWN
        ? {
            position: 'absolute' as const,
            top: coords.top,
            [!isRTL ? 'right' : 'left']: coords.left,
            bottom: bottom + 10,
            maxHeight: DIMENSIONS.height * 0.4,
            alignSelf: 'flex-start'
        }
        : {
            alignSelf: 'center' as const,
            marginTop: 100,
            width: '90%',
        };

    return (
        <>
            <FilterButton
                ref={triggerRef}
                onPress={toggle}
                icon={config.icon}
                isActive={isVisible}
                label={config.label || field}
            />

            <Modal visible={isVisible} transparent animationType="fade">
                <Pressable className="flex-1 bg-black/10" onPress={close}>
                    <Pressable
                        style={[
                            {
                                backgroundColor: 'white',
                                borderRadius: 20,
                                ...boxShadow().button
                            },
                            overlayStyle as any
                        ]}
                        onPress={() => { }}
                    >
                        {config.strategy === FilterUIStrategy.DROPDOWN ? (
                            <FlatList
                                renderItem={renderItem}
                                data={normalizedOptions}
                                keyExtractor={keyExtractor}
                                showsVerticalScrollIndicator={false}
                                contentContainerClassName="gap-2 p-3 pb-3"
                            />
                        ) : (
                            <PriceFilterContent />
                        )}
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
        justifyContent: "center",
        ...boxShadow(0, 4, 9).button,
    }
});