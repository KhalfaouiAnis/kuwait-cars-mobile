import { DIMENSIONS } from "@/core/constants";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { GlobalSelectOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React, { useMemo, useState } from "react";
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
import Checkbox from "../checkbox";

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
    const { isRTL, theme } = useUserPreferencesStore()
    const isDark = theme !== "light"
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

    const currentDisplayLabel = useMemo(() => {
        if (translatedValue && value) return t(`colors.${value}`);

        return adapter.getLabel(value) ?? t(placeholder||"")
    }, [value, translatedValue, adapter, placeholder, t]);

    return (
        <Pressable
            style={styles.wrapper}
            onPress={() => setShowModal(true)}
            className={clsx("relative ps-6 self-center justify-center border-[0.5px] border-grayish", {
                "border-error": error,
            })}
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
                    color={isDark ? "white" : "black"}
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
                            keyExtractor={(item) => item.id as string}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => renderSelectOption(item, handleSelect)}
                            contentContainerClassName="pb-4 px-1.5 gap-y-2"
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
    }
});