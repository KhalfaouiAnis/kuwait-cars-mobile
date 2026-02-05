import { DIMENSIONS, PROVINCES } from "@/core/constants";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { GlobalSelectOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import {
    FieldValues,
    Path,
    useController,
    useWatch,
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

export default function AreaSelect<TForm extends FieldValues>({
    control,
    name,
    adapter,
    translatedValue,
    placeholder,
}: BaseSelectInputProps<TForm>) {
    const [showModal, setShowModal] = useState(false);
    const { isRTL, theme } = useUserPreferencesStore()
    const isDark = theme !== "light"
    const { t } = useTranslation("common");
    const selectedProvince = useWatch({
        control,
        name: 'province' as Path<TForm>,
    });
    const {
        field: { onChange, value }, fieldState: { error}
    } = useController({ control, name });

    const areaOptions: GlobalSelectOption[] = useMemo(() => {
        if (!selectedProvince) return [];
        return (PROVINCES.find(prov => prov.province === selectedProvince?.value)?.areas || []).map(adapter)
    }, [selectedProvince, adapter]);

    useEffect(() => {
        if (value && !areaOptions.find(opt => opt.id === value.area)) {
            onChange(null);
        }
    }, [selectedProvince, areaOptions, onChange, value]);

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

    const handleSelect = (value: string) => {
        onChange(value);
        setShowModal(false);
    };

    function displayLabel() {
        if (!value || value === "") return placeholder;
        if (translatedValue && value) return t(`colors.${value}`);
        return value;
    }

    return (
        <Pressable
            style={styles.wrapper}
            onPress={() => setShowModal(true)}
            className={clsx("relative items-center self-center justify-center border-[0.5px] border-grayish", {
                "border-error": error,
            })}
        >
            <Text className={`${value ? "text-black" : "text-gray-400"} dark:text-white`}>
                {displayLabel()}
            </Text>
            <View className="flex-row items-center absolute end-2.5">
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
                            data={areaOptions}
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