import { DIMENSIONS, PROVINCES } from "@/core/constants";
import { useDropdown } from "@/core/hooks/use-dropdown";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { GlobalSelectOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo } from "react";
import {
    FieldValues,
    Path,
    useController,
    useWatch
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

export default function AreaSelector<TForm extends FieldValues, O>({
    name,
    adapter,
    control,
    label,
    required,
    placeholder,
    translatedValue,
}: BaseSelectInputProps<TForm, O>) {
    const { dark } = useTheme()
    const { t } = useTranslation("common");
    const { isRTL } = useUserPreferencesStore();
    const { triggerRef, coords, open, close, isVisible } = useDropdown()
    const { field: { onChange, value }, fieldState: { error } } = useController({ control, name });

    const selectedProvince = useWatch({
        control,
        name: 'province' as Path<TForm>,
    });

    const renderSelectOption = useCallback((option: GlobalSelectOption, handleSelect: any) => (
        <Pressable onPress={() => handleSelect(option)}>
            <View style={[styles.selectOption, { backgroundColor: adapter.isSelected(value, option.value) ? "#D9D9D9" : "white" }]}>
                <Text className="text-center text-xs font-inter-semibold">{adapter.getLabel(option.value)}</Text>
            </View>
        </Pressable>
    ), [adapter, value])

    const areaOptions: GlobalSelectOption[] = useMemo(() => {
        if (!selectedProvince) return [];
        const options = PROVINCES.find(prov => prov.province === selectedProvince?.province)?.areas
        if (!Array.isArray(options)) return [];
        return (options).map(adapter.map)
    }, [selectedProvince, adapter]);

    useEffect(() => {
        if (value && !areaOptions.find(opt => opt.id === value.area)) {
            onChange(null);
        }
    }, [selectedProvince, areaOptions, onChange, value]);

    const handleSelect = useCallback((option: GlobalSelectOption) => {
        onChange(option.value);
        close()
    }, [close, onChange])

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
                <Text className="text-base font-inter ps-4 mb-1 dark:text-white text-blue">
                    {label}
                </Text>
            )}
            <Pressable
                ref={triggerRef}
                onPress={open}
                className="relative ps-4 self-center justify-center border-[0.5px]"
                style={[styles.wrapper, { borderColor: error ? "#FF123D" : "#A8A8A8" }]}
            >
                <View className="flex-row items-center gap-2">
                    <MaterialIcons
                        name="location-city"
                        size={20}
                        color={dark ? "white" : "black"}
                    />
                    <Text className={`${value ? "text-black" : "text-gray-400"} dark:text-white`}>
                        {currentDisplayLabel}
                    </Text>
                </View>
                <View className="flex-row items-center absolute end-2.5">
                    {required && (
                        <View>
                            <Text className="text-error">*</Text>
                        </View>
                    )}
                    <Ionicons
                        name={isRTL ? "chevron-back" : "chevron-forward"}
                        size={20}
                        color={dark ? "white" : "black"}
                    />
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
                            data={areaOptions}
                            renderItem={renderItem}
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