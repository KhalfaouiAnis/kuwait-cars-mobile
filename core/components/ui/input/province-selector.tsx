import useUserPreferencesStore from '@/core/store/preferences.store';
import { ProvinceArea, ProvinceOption } from '@/core/types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { clsx } from 'clsx';
import React, { ReactNode, useState } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';

type ProvinceSelectorProps<TForm extends FieldValues> = {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    renderOption: (option: ProvinceArea, selected?: string) => ReactNode
    options: ProvinceOption[]
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    label?: string;
    isDark?: boolean
    primary?: boolean
}

export default function ProvinceSelector<TForm extends FieldValues>({ control, name, error, options, renderOption, label, required, isDark, placeholder, primary }: ProvinceSelectorProps<TForm>) {
    const { t } = useTranslation("common")
    const { isRTL } = useUserPreferencesStore()

    const [showModal, setShowModal] = useState(false);
    const { field: { onChange, value } } = useController({ control, name });

    const renderSelectOption = (option: ProvinceOption, handleSelect: any) => (
        <Pressable onPress={() => handleSelect(option)}>
            {renderOption({ label: t("provinces." + option.province) || "", value: option?.province }, value?.province)}
        </Pressable>
    );

    const handleSelect = (option: ProvinceOption) => {
        onChange(option);
        setShowModal(false)
    };

    return (
        <View style={{ direction: isRTL ? "rtl" : "ltr" }}>
            {label && <Text className="text-base font-semibold pl-6 mb-1 dark:text-white text-black">{label}</Text>}
            <Pressable onPress={() => setShowModal(true)}
                className={clsx('flex-row items-center py-4 ps-3 pe-2 justify-between border dark:border-primary-500 dark:bg-darkish', {
                    "border-error": error,
                    "border-primary-500 rounded-lg border": primary,
                    "border-transparent elevation-sm": !primary && !error,
                })}
            >
                <View className='flex-row items-center gap-2'>
                    <MaterialCommunityIcons name="town-hall" size={20} color={isDark ? "white" : "gray"} />
                    <Text className={`${value?.province ? 'text-[#333]' : 'text-gray-400'} dark:text-white`}>
                        {value?.province ? t("provinces." + value?.province) : placeholder}
                    </Text>
                </View>
                <View className='flex-row'>
                    <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} size={20} color={isDark ? "white" : "black"} />
                    {required && (
                        <View>
                            <Text className="text-error">*</Text>
                        </View>
                    )}
                </View>
            </Pressable>
            {error && <Text className="text-error text-sm ms-2">{error}</Text>}
            <Modal
                visible={showModal}
                animationType="fade"
                transparent
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="dark:bg-darkish dark:border-primary-500 border bg-transparent border-transparent w-80 overflow-hidden">
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.province}
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