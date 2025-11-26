import { SelectOption } from '@/core/types';
import { Ionicons } from '@expo/vector-icons';
import { clsx } from 'clsx';
import React, { ReactNode, useState } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { FlatList, Modal, Pressable, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type SelectInputProps<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    renderOption: (option: SelectOption) => ReactNode
    options: SelectOption[]
    onChangeText?: (text: string) => void;
    value?: string;
    required?: boolean;
    error?: string;
    label?: string;
    primary?: boolean
    icon?: ReactNode,
}

export default function SelectInput<TForm extends FieldValues>({ onChangeText, control, name, error, options, renderOption, primary, label, required, icon, ...props }: SelectInputProps<TForm>) {
    const [showModal, setShowModal] = useState(false);
    const { field: { onChange, value } } = useController({ control, name });

    const renderSelectOption = (option: SelectOption, handleSelect: any) => (
        <Pressable
            onPress={() => handleSelect(option.label)}
        >
            {renderOption(option)}
        </Pressable>
    );

    const handleSelect = (option: string) => {
        onChange(option);
        setShowModal(false)
    };

    return (
        <View className="w-full">
            {label && <Text className="text-base font-semibold pl-6 mb-1">{label}</Text>}
            <Pressable onPress={() => setShowModal(true)}>
                <View className={clsx('flex-row items-center p-3 border bg-white', {
                    "border-primary-500 rounded-lg": primary,
                    "border-error": error,
                    "border-transparent": !primary && !error,
                })}
                    style={primary ? {} : {
                        elevation: 2, shadowColor: 'rgba(0, 0, 0, 0.4)', shadowRadius: 1, shadowOpacity: 0.2, shadowOffset: { width: 4, height: 4 },
                    }}
                >
                    <View className='items-center me-2'>
                        {icon}
                    </View>
                    <View>
                        <TextInput
                            className="text-[#333]"
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
                                    className="bg-white pt-2 mb-10 rounded-t-2xl p-4 w-full -max-h-screen-safe-or-80 min-h-0">
                                    <View className="flex-row items-center p-4">
                                        <TouchableOpacity onPress={() => setShowModal(false)} className="mr-3">
                                            <Ionicons name="close" size={24} color="#8E8E93" />
                                        </TouchableOpacity>
                                    </View>
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
                        <Ionicons name='chevron-forward' size={20} />
                    </View>
                </View>
            </Pressable>
            {/* {error && <Text className="text-error text-sm mt-1 ml-2">{error}</Text>} */}
        </View>
    );
}