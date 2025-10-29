import { SelectOption } from '@/core/types';
import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode, useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FlatList, Modal, Pressable, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type SelectInputProps<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    onChangeText?: (text: string) => void;
    value?: string;
    error?: string;
    renderOption: (option: SelectOption) => ReactNode
    options: SelectOption[]
}

export default function SelectInput<TForm extends FieldValues>({ onChangeText, control, name, error, options, renderOption, ...props }: SelectInputProps<TForm>) {
    const [showModal, setShowModal] = useState(false);

    const renderSelectOption = (option: SelectOption, handleSelect: any) => (
        <Pressable
            onPress={() => handleSelect(option.label)}
        >
            {renderOption(option)}
        </Pressable>
    );

    return (
        <View className="w-full">
            <Pressable onPress={() => setShowModal(true)}>
                <View className='flex-row items-center justify-between p-3'
                    style={{
                        elevation: 2,
                        backgroundColor: "white", shadowColor: 'rgba(0, 0, 0, 0.4)', shadowRadius: 1, shadowOpacity: 0.2, shadowOffset: {
                            width: 4, height: 4
                        }
                    }}
                >
                    <Controller
                        name={name}
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            const handleSelect = (option: string) => {
                                onChange(option);
                                setShowModal(false)
                            };
                            return (
                                <View>
                                    <TextInput
                                        className={` ${error ? 'border-red-500' : 'text-[#333]'}`}
                                        value={value}
                                        editable={false}
                                        pointerEvents="none"
                                        {...props}
                                    />
                                    <Modal
                                        visible={showModal}
                                        animationType="slide"
                                        transparent={false}
                                        className='h-fit'
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
                                                    <Text className="text-lg font-semibold">Select</Text>
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
                            )
                        }}
                    />
                    <View>
                        <Ionicons name='chevron-forward' size={20} />
                    </View>
                </View>
            </Pressable>
            {error && <Text className="text-error text-sm mt-1 ml-2">{error}</Text>}
        </View>
    );
}