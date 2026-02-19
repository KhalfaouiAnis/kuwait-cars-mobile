import { DIMENSIONS } from "@/core/constants";
import { useDropdown } from "@/core/hooks/use-dropdown";
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
import { BaseSelectInputProps } from "../..";

export default function ProvinceSelector<TForm extends FieldValues, O>({
    name,
    control,
    label,
    options,
    adapter,
    required,
    translatedValue,
    placeholder,
}: BaseSelectInputProps<TForm, O>) {
    const { dark } = useTheme()
    const { t } = useTranslation("common");
    const { isRTL } = useUserPreferencesStore();
    const { triggerRef, coords, open, close, isVisible } = useDropdown()
    const { field: { onChange, value }, fieldState: { error } } = useController({ control, name });

    const normalizedOptions = useMemo(() => {
        if (!Array.isArray(options)) return [];
        const mapFn = adapter?.map || ((item: any) => item);
        return options.map(mapFn);
    }, [options, adapter]);

    const renderSelectOption = useCallback((option: GlobalSelectOption, handleSelect: any) => (
        <Pressable onPress={() => handleSelect(option)}>
            <View style={[styles.selectOption, { backgroundColor: adapter.isSelected(value, option.value) ? "#D9D9D9" : "white" }]}>
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
                className="relative ps-4 self-center justify-center border-[0.5px] px-3"
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
            <Modal
                transparent
                visible={isVisible}
                animationType="fade"
                onRequestClose={close}
            >
                <Pressable
                    onPress={close}
                    className="flex-1 justify-center items-center bg-black/10"
                >
                    <View
                        style={{
                            top: coords.top,
                            borderRadius: 20,
                            bottom: coords.bottom,
                            ...boxShadow().button,
                            [isRTL ? "left" : "right"]: coords.left,
                        }}
                        className="absolute bg-white p-4 dark:bg-darkish rounded-lg flex-1 max-h-80 min-h-0"
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
        borderRadius: 20,
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
    }
});