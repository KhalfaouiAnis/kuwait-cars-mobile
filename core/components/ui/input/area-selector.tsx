import { AreaOption, ProvinceArea } from '@/core/types';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { clsx } from 'clsx';
import React, { ReactNode, useState } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
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
    const [showModal, setShowModal] = useState(false);
    const { field: { onChange, value } } = useController({ control, name });

    const renderSelectOption = (option: AreaOption, handleSelect: any) => (
        <Pressable onPress={() => handleSelect(option)}>
            {renderOption({ label: option.label, value: option?.area }, value?.area)}
        </Pressable>
    );

    const handleSelect = (option: AreaOption) => {
        onChange(option);
        setShowModal(false)
    };

    return (
        <View >
            {label && <Text className="text-base font-semibold ps-6 mb-1 dark:text-white text-black">{label}</Text>}
            <Pressable onPress={() => setShowModal(true)}
                className={clsx('flex-row items-center p-4 justify-between border dark:border-primary-500 dark:bg-darkish', {
                    "border-error": error,
                    "border-primary-500 rounded-lg border": primary,
                    "border-transparent elevation-sm": !primary && !error,
                })}
            >
                <View className='flex-row items-center gap-2'>
                    <MaterialIcons name="location-city" size={24} color={isDark ? "white" : "black"} />
                    <Text className="dark:text-white">
                        {value?.label || placeholder}
                    </Text>
                </View>
                <View className='flex-row'>
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