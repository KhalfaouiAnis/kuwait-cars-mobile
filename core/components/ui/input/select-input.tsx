import { CATEGORIES } from '@/core/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FlatList, Modal, Pressable, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type SelectInputProps<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    onChangeText?: (text: string) => void;
    value?: string;
    error?: string;
}


export default function SelectInput<TForm extends FieldValues>({ onChangeText, control, name, error, ...props }: SelectInputProps<TForm>) {
    const [category, setCategory] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSelectCategory = (text: string) => {
        setCategory(text);
        setShowModal(false)
        onChangeText?.(text)
    };

    const renderSelectItem = ({ item: { label } }: { item: { id: string, label: string } }) => (
        <TouchableOpacity
            className="flex-row items-center py-3 my-1 mx-2 px-2 border-b border-gray-200 shadow-sm"
            onPress={() => handleSelectCategory(label)}
            activeOpacity={0.7}
        >
            <View className='ms-3'>
                <Ionicons name="car-outline" size={24} color="black" />
            </View>
            <View className='flex-1 ms-4'>
                <Text className="text-lg">{label}</Text>
            </View>
            <View className='pe-2'>
                <Ionicons name='chevron-down' size={16} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="w-full">
            <Pressable onPress={() => setShowModal(true)}>
                <View className='flex-row items-center justify-between border-[#FBFBFB] bg-gray-50 border-2 p-3 shadow-md'>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className={` ${error ? 'border-red-500' : 'text-[#333]'}`}
                                value={value}
                                editable={false}
                                onChangeText={(text) => {
                                    handleSelectCategory(text)
                                    onChange(text)
                                }}
                                {...props}
                            />
                        )}
                    />
                    <View>
                        <Ionicons name='chevron-forward' size={20} />
                    </View>
                </View>
            </Pressable>
            {error && <Text className="text-error text-sm mt-1 ml-2">{error}</Text>}
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setShowModal(false)}
            >
                <View className="flex-1 bg-white pt-10 mb-10">
                    <View className="flex-row items-center p-4">
                        <TouchableOpacity onPress={() => setShowModal(false)} className="mr-3">
                            <Ionicons name="close" size={24} color="#8E8E93" />
                        </TouchableOpacity>
                        <Text className="text-lg font-semibold">Select</Text>
                    </View>
                    <FlatList
                        data={CATEGORIES}
                        keyExtractor={(item) => item.id}
                        renderItem={renderSelectItem}
                    />
                </View>
            </Modal>
        </View>
    );
}