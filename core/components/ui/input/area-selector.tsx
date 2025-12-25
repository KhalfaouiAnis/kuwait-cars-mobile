import useUserPreferencesStore from '@/core/store/preferences.store';
import { AreaOption, ProvinceArea } from '@/core/types';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { clsx } from 'clsx';
import React, { ReactNode, useState } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';

type AreaSelectorProps<TForm extends FieldValues> = {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    renderOption: (option: ProvinceArea, selected?: string) => ReactNode
    options: AreaOption[]
    placeholder?: string;
    error?: string;
    label?: string;
    isDark?: boolean
    primary?: boolean
}

export default function AreaSelector<TForm extends FieldValues>({ control, name, error, options, renderOption, label, isDark, placeholder, primary }: AreaSelectorProps<TForm>) {
    const { t } = useTranslation("common")
    const { isRTL } = useUserPreferencesStore()

    const [showModal, setShowModal] = useState(false);
    const { field: { onChange, value } } = useController({ control, name });

    const renderSelectOption = (option: AreaOption, handleSelect: any) => (
        <Pressable onPress={() => handleSelect(option)}>
            {renderOption({ label: t("areas." + option.area), value: option?.area }, value?.area)}
        </Pressable>
    );

    const handleSelect = (option: AreaOption) => {
        onChange(option);
        setShowModal(false)
    };

    return (
        <View style={{ direction: isRTL ? "rtl" : "ltr" }}>
            {label && <Text className="text-base font-semibold ps-6 mb-1 dark:text-white text-black">{label}</Text>}
            <Pressable onPress={() => setShowModal(true)}
                className={clsx('flex-row items-center p-4 justify-between border dark:border-primary-500 dark:bg-darkish', {
                    "border-error": error,
                    "border-primary-500 rounded-lg border": primary,
                    "border-transparent elevation-sm": !primary && !error,
                })}
            >
                <View className='flex-row items-center gap-2'>
                    <MaterialIcons name="location-city" size={20} color={isDark ? "white" : "gray"} />
                    <Text className={`${value?.area ? 'text-[#333]': 'text-gray-400'} dark:text-white`}>
                        {value?.area ? t("areas." + value?.area) : placeholder}
                    </Text>
                </View>
                <View className='flex-row'>
                    <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} size={20} color={isDark ? "white" : "black"} />
                </View>
            </Pressable>
            <Modal
                visible={showModal}
                animationType="fade"
                transparent
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="dark:bg-darkish dark:border-primary-500 border bg-transparent border-transparent -max-h-screen-safe-offset-8 w-80 overflow-hidden">
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item?.area}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => renderSelectOption(item, handleSelect)}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}