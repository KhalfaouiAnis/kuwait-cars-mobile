import { DIMENSIONS } from "@/core/constants";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { GlobalSelectOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import {
    FieldValues,
    useController
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import { useDropdown } from "react-native-anchor-dropdown";
import { BaseSelectInputProps } from "../..";

export default function ProvinceSelector<TForm extends FieldValues, O>({
    name,
    control,
    label,
    options,
    adapter,
    required,
    placeholder,
    translatedValue,
    omitValidationError,
}: BaseSelectInputProps<TForm, O>) {
    const { dark } = useTheme()
    const { t } = useTranslation("common");
    const { isRTL } = useUserPreferencesStore();
    const {
        triggerRef,
        coords,
        isVisible,
        onDropdownLayout,
        close,
        open,
    } = useDropdown({ maxHeight: 200, gap: 8, placement: "auto" });
    const { field: { onChange, value }, fieldState: { error } } = useController({ control, name });

    const normalizedOptions = useMemo(() => {
        if (!Array.isArray(options)) return [];
        const mapFn = adapter?.map || ((item: any) => item);
        return options.map(mapFn);
    }, [options, adapter]);

    const renderSelectOption = useCallback((option: GlobalSelectOption, handleSelect: any) => (
        <Pressable onPress={() => handleSelect(option)}>
            <View style={[styles.selectOption, { backgroundColor: adapter.isSelected(value, option.value) ? "#ffb84e" : "white" }]}>
                <Text className="text-center text-xs font-inter-semibold">{adapter.getLabel(option.value)}</Text>
            </View>
        </Pressable>
    ), [adapter, value])


    const handleSelect = useCallback((option: GlobalSelectOption) => {
        onChange(option.value);
        close();
    }, [onChange, close])

    const renderItem = ({ item }: { item: GlobalSelectOption }) => (
        renderSelectOption(item, handleSelect)
    )

    const keyExtractor = useCallback((item: GlobalSelectOption) => item.id, []);

    const currentDisplayLabel = useMemo(() => {
        if (translatedValue && value) return t(`colors.${value}`);

        return adapter.getLabel(value) ?? t(placeholder || "")
    }, [value, translatedValue, adapter, placeholder, t]);

    return (
        <View
            collapsable={false}
            style={{ direction: isRTL ? "rtl" : "ltr" }}>
            {label && (
                <Text className="text-base font-inter ps-4 mb-1 dark:text-white text-blue">{label}</Text>
            )}
            <Pressable
                onPress={open}
                ref={triggerRef}
                className="relative ps-4 self-center justify-center px-3"
                style={[styles.wrapper, { borderColor: error ? "#FF123D" : "#A8A8A8" }]}
            >
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons
                            size={20}
                            name="town-hall"
                            color={dark ? "white" : "black"}
                        />
                        <Text className={`${value ? "text-black" : "text-gray-400"} dark:text-white ps-3`}>
                            {currentDisplayLabel}
                        </Text>
                    </View>
                    <View className="flex-row mx-2 items-center">
                        <Ionicons
                            name={isRTL ? "chevron-back" : "chevron-forward"}
                            size={20}
                            color={dark ? "white" : "black"}
                        />
                        {required && (
                            <View>
                                <Text className="text-error">*</Text>
                            </View>
                        )}
                    </View>
                </View>
            </Pressable>
            {!omitValidationError && error && <Text className="font-inter text-red-400 mt-1 ms-2 font-semibold text-sm dark:text-white">{t(`validation.${error?.ref?.name}`)}</Text>}
            <Modal
                transparent
                visible={isVisible}
                animationType="fade"
                onRequestClose={close}
            >
                <Pressable style={StyleSheet.absoluteFill} onPress={close} className="flex-1">
                    <View
                        onLayout={onDropdownLayout}
                        style={[coords, styles.dropdown]}
                    >
                        <FlatList
                            renderItem={renderItem}
                            data={normalizedOptions}
                            keyExtractor={keyExtractor}
                            showsVerticalScrollIndicator={false}
                            contentContainerClassName="gap-3 p-1.5 pb-3"
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 60,
        borderRadius: 22,
        borderWidth: 0.7,
        ...boxShadow().button,
        width: DIMENSIONS.width - 60,
    },
    selectOption: {
        height: 30,
        borderRadius: 12,
        paddingHorizontal: 6,
        alignItems: "center",
        justifyContent: "center",
        ...boxShadow(0, 4, 9).button,
    },
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
});