import { SelectOption } from '@/core/types';
import { BOX_SHADOW } from '@/core/utils/cn';
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
    icon?: ReactNode,
    isDark?: boolean
    isRTL?: boolean
}

export default function AdSelectInput<TForm extends FieldValues>({ onChangeText, control, name, error, options, renderOption, required, icon, isDark, isRTL, ...props }: SelectInputProps<TForm>) {
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
        <Pressable onPress={() => setShowModal(true)}>
            <View className={clsx('flex-row items-center bordered-box', {
                "border-error": error,
            })}
                style={BOX_SHADOW.button}
            >
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
                                    contentContainerClassName='pb-4 px-1.5 gap-y-2'
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
                    <Ionicons name={isRTL ? "chevron-back" : 'chevron-forward'} size={20} color={isDark ? "white" : "black"} />
                </View>
            </View>
        </Pressable>
    );
}