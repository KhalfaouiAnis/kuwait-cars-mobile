import { COUNTRIES } from '@/core/constants/';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

type PhoneInputProps<TForm extends FieldValues> = {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    onChangeText?: (fullNumber: string) => void;
    showCode?: boolean;
    placeHolder?: string
    value?: string;
    label?: string;
    error?: string;
};

type Country = {
    name: string;
    cca2: string;
    callingCode: string[];
    flag: string;
};

export default function PhoneInput<TForm extends FieldValues>({ onChangeText, control, name, error, label, showCode = false, placeHolder = "PHONE NUMBER" }: PhoneInputProps<TForm>) {
    const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setShowModal(false);
        updateFullNumber();
    };

    const handlePhoneChange = (text: string) => {
        setPhoneNumber(text);
        updateFullNumber();
    };

    const updateFullNumber = () => {
        const fullNumber = `+${selectedCountry.callingCode[0]}${phoneNumber}`;
        onChangeText?.(fullNumber);
    };

    const renderCountryItem = ({ item }: { item: Country }) => (
        <TouchableOpacity
            className="flex-row items-center p-4 border-b border-gray-200"
            onPress={() => handleCountrySelect(item)}
            activeOpacity={0.7}
        >
            <Text className="mr-3 text-lg">{item.flag}</Text>
            <View className="flex-1">
                <Text className="text-base font-medium text-white">{item.name}</Text>
                <Text className="text-sm text-gray-500">+{item.callingCode[0]}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="w-full">
            {label && <Text className="text-base font-semibold pl-6 mb-1 dark:text-white text-black">{label}</Text>}
            <View className='flex-row items-center border-primary-500 border rounded-lg p-2'>
                <TouchableOpacity
                    className={`flex-row items-center pl-2 py-1 border-e border-e-primary-500 ${error ? 'border-red-500' : ''}`}
                    onPress={() => setShowModal(true)}
                    activeOpacity={0.7}
                    disabled
                >
                    <Text className="mr-1 text-2xl">{selectedCountry.flag}</Text>
                    {showCode && (<Text className="mr-1 text-base">+{selectedCountry.callingCode}</Text>)}
                    <Ionicons name="chevron-down" size={20} color="#8E8E93" />
                </TouchableOpacity>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className={`flex-1 ps-1 h-full ${error ? 'border-red-500' : 'text-[#333] dark:text-white'}`}
                            value={value}
                            onChangeText={(text) => {
                                handlePhoneChange(text)
                                onChange(text)
                            }}
                            keyboardType="phone-pad"
                            placeholder={placeHolder}
                            returnKeyType="done"
                        />
                    )}
                />
                <Text className='me-auto text-error'>*</Text>
            </View>
            {error && <Text className="text-error text-sm ms-2">{error}</Text>}
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setShowModal(false)}
            >
                <View className="flex-1 bg-white pt-10 mb-10">
                    <View className="flex-row items-center p-4 border-b border-gray-200">
                        <TouchableOpacity onPress={() => setShowModal(false)} className="mr-3">
                            <Ionicons name="close" size={24} color="#8E8E93" />
                        </TouchableOpacity>
                        <Text className="text-lg font-semibold">Select Country</Text>
                    </View>
                    <FlatList
                        data={COUNTRIES}
                        keyExtractor={(item) => item.cca2}
                        renderItem={renderCountryItem}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                        getItemLayout={(data, index) => ({ length: 72, offset: 72 * index, index })}
                    />
                </View>
            </Modal>
        </View>
    );
}