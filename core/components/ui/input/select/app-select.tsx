import { DIMENSIONS } from "@/core/constants";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { GlobalSelectOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import {
    FieldValues,
    useController,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { BaseSelectInputProps } from "../..";
import Checkbox from "../checkbox/checkbox";

export default function AppSelect<TForm extends FieldValues, O>({
    control,
    name,
    options,
    adapter,
    required,
    translatedValue,
    placeholder,
}: BaseSelectInputProps<TForm, O>) {
    const [showModal, setShowModal] = useState(false);
    const { isRTL } = useUserPreferencesStore()
    const { dark } = useTheme()
    const { t } = useTranslation("common");
    const {
        field: { onChange, value }, fieldState: { error }
    } = useController({ control, name });

    const normalizedOptions = useMemo(() => {
        if (!Array.isArray(options)) return [];
        const mapFn = adapter?.map || ((item: any) => item);
        return options.map(mapFn);
    }, [options, adapter]);

    const renderSelectOption = (option: GlobalSelectOption, handleSelect: any) => (
        <Pressable onPress={() => handleSelect(option.value)}
            className="flex-row items-center py-3 my-2.5 mx-8 px-4"
            style={[styles.selectOption, { direction: isRTL ? "rtl" : "ltr" }]}
        >
            <View className='flex-1 ms-2'>
                <Text className="text-lg dark:text-white">{option.label}</Text>
            </View>
            <View className='pe-2'>
                <Checkbox size={24} checked={adapter.isSelected(value, option.value)} disabled />
            </View>
        </Pressable>
    );

    const handleSelect = (value: any) => {
        onChange(value);
        setShowModal(false);
    };

    const keyExtractor = useCallback((item: GlobalSelectOption) => item.id, []);

    const currentDisplayLabel = useMemo(() => {
        if (translatedValue && value) return t(`colors.${value}`);

        return adapter.getLabel(value) ?? t(placeholder || "")
    }, [value, translatedValue, adapter, placeholder, t]);

    return (
        <Pressable
            style={[styles.wrapper, { borderColor: error ? "#FF123D" : "#A8A8A8" }]}
            onPress={() => setShowModal(true)}
            className="relative ps-6 self-center justify-center border-[0.5px]"
        >
            <Text className={`${value ? "text-black" : "text-gray-400"} dark:text-white`}>
                {currentDisplayLabel}
            </Text>
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
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setShowModal(false)}
                    className="flex-1 justify-end bg-black/20"
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { }}
                        className="bg-white dark:bg-black pt-6 mb-10 rounded-t-3xl p-4 w-full -max-h-screen-safe-or-80 min-h-0"
                    >
                        <FlatList
                            data={normalizedOptions}
                            keyExtractor={keyExtractor}
                            showsVerticalScrollIndicator={false}
                            contentContainerClassName="pb-4 px-1.5 gap-y-2"
                            renderItem={({ item }) => renderSelectOption(item, handleSelect)}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
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
        height: 45,
        borderRadius: 15,
        ...boxShadow(0, 4, 4).button,
    },
    province: {
        width: 120,
        height: 30,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        ...boxShadow(0, 4, 9).button,
    }
});