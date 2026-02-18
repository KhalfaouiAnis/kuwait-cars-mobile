import { DIMENSIONS } from "@/core/constants";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { GlobalSelectOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    FieldValues,
    useController,
    useFormContext,
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

export default function AdProvinceSelector<TForm extends FieldValues, O>({
    name,
    options,
    adapter,
    required,
    translatedValue,
    placeholder,
}: BaseSelectInputProps<TForm, O>) {
    const { isRTL } = useUserPreferencesStore();
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
    const [isMeasured, setIsMeasured] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const iconRef = useRef<View | null>(null);
    const { t } = useTranslation("common");
    const { dark } = useTheme()
    const { control } = useFormContext()
    const {
        field: { onChange, value }, fieldState: { error }
    } = useController({ control, name });

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
        setShowModal(false);
    }, [onChange])

    const renderItem = ({ item }: { item: GlobalSelectOption }) => (
        renderSelectOption(item, handleSelect)
    )

    const keyExtractor = useCallback((item: GlobalSelectOption) => item.id, []);

    const openDropdown = () => {
        setIsMeasured(false);
        iconRef.current && iconRef.current.measure((x, y, width, height, pageX, pageY) => {
            setDropdownPos({ top: pageY + height + 8, left: 38 });
            setIsMeasured(true);
            setShowModal(true);
        });
    };

    const currentDisplayLabel = useMemo(() => {
        if (translatedValue && value) return t(`colors.${value}`);

        return adapter.getLabel(value) ?? t(placeholder || "")
    }, [value, translatedValue, adapter, placeholder, t]);

    return (
        <Pressable
            ref={iconRef}
            onPress={openDropdown}
            className="relative ps-6 self-center justify-center border-[0.5px]"
            style={[styles.wrapper, { borderColor: error ? "#FF123D" : "#A8A8A8" }]}
        >
            <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons
                    size={20}
                    name="town-hall"
                    color={dark ? "white" : "gray"}
                />
                <Text className={`${value ? "text-black" : "text-gray-400"} dark:text-white font-inter`}>
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
            <Modal
                transparent
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <Pressable
                    onPress={() => setShowModal(false)}
                    className="flex-1 justify-center items-center bg-black/10"
                >
                    <View
                        style={{
                            top: dropdownPos.top,
                            start: isRTL ? dropdownPos.left : undefined,
                            end: isRTL ? undefined : dropdownPos.left,
                            opacity: isMeasured ? 1 : 0,
                            borderRadius: 20,
                            ...boxShadow().button
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
        </Pressable>
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