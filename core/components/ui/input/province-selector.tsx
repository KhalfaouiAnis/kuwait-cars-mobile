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
        <View >
            {label && <Text className="text-base font-semibold pl-6 mb-1 dark:text-white text-black">{label}</Text>}
            <Pressable onPress={() => setShowModal(true)}
                className={clsx('flex-row items-center p-4 justify-between border dark:border-primary-500 dark:bg-darkish', {
                    "border-error": error,
                    "border-primary-500 rounded-lg border": primary,
                    "border-transparent elevation-sm": !primary && !error,
                })}
            >
                <View className='flex-row items-center gap-2'>
                    <MaterialCommunityIcons name="town-hall" size={24} color={isDark ? "white" : "black"} />
                    <Text className="text-[#333] dark:text-white">
                        {t("provinces." + value?.province) || placeholder}
                    </Text>
                </View>
                <View className='flex-row'>
                    {required && (
                        <View>
                            <Text className="text-error">*</Text>
                        </View>
                    )}
                    <Ionicons name='chevron-forward' size={20} color={isDark ? "white" : "black"} />
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