import { SelectOption } from '@/core/types';
import { Ionicons } from '@expo/vector-icons';
import { clsx } from 'clsx';
import React, { ReactNode, useState } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { FlatList, Modal, Pressable, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type SelectInputProps<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    renderOption: (option: SelectOption, selected?: string | number | boolean) => ReactNode
    options: SelectOption[]
    onChangeText?: (text: string) => void;
    defaultValue?: string;
    required?: boolean;
    error?: string;
    label?: string;
    primary?: boolean
    icon?: ReactNode,
    extraPadding?: boolean
    isDark?: boolean
}

export default function SelectInput<TForm extends FieldValues>({ onChangeText, control, name, error, options, renderOption, primary, label, required, icon, isDark, extraPadding, ...props }: SelectInputProps<TForm>) {
    const [showModal, setShowModal] = useState(false);
    const { field: { onChange, value } } = useController({ control, name });

    const renderSelectOption = (option: SelectOption, handleSelect: any) => (
        <Pressable onPress={() => handleSelect(option.value)}>
            {renderOption(option, value)}
        </Pressable>
    );

    const handleSelect = (value: string) => {
        onChange(value);
        setShowModal(false)
    };

    return (
        <View className="w-full">
            {label && <Text className="text-base font-semibold pl-6 mb-1 dark:text-white text-black">{label}</Text>}
            <Pressable onPress={() => setShowModal(true)}>
                <View className={clsx('flex-row items-center border dark:border-primary-500', {
                    "border-primary-500 rounded-lg": primary,
                    "border-transparent elevation-sm": !primary && !error,
                    "border-error": error,
                    "px-3 py-1": !extraPadding,
                    "p-3": extraPadding,
                })}>
                    <View className='items-center me-2'>
                        {icon}
                    </View>
                    <View>
                        <TextInput
                            className="text-[#333] dark:text-white"
                            value={value}
                            editable={false}
                            pointerEvents="none"
                            {...props}
                        />
                        <Modal
                            visible={showModal}
                            animationType="slide"
                            transparent
                            onRequestClose={() => setShowModal(false)}
                        >
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => setShowModal(false)}
                                className="flex-1 justify-end bg-black/20">
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => { }}
                                    className="bg-white dark:bg-darkish pt-6 mb-10 rounded-t-3xl p-4 w-full -max-h-screen-safe-or-80 min-h-0">
                                    <FlatList
                                        data={options}
                                        keyExtractor={(item) => item.id}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item }) => renderSelectOption(item, handleSelect)}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    <View className='ms-auto flex-row items-end'>
                        {required && (
                            <View>
                                <Text className="text-error">*</Text>
                            </View>
                        )}
                        <Ionicons name='chevron-forward' size={20} color={isDark ? "white" : "black"} />
                    </View>
                </View>
            </Pressable>
        </View>
    );
}