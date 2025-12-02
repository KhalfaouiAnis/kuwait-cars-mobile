import React, { useState } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

type UnitSelectorProps<TForm extends FieldValues> = {
    control: Control<TForm>;
    name: FieldPath<TForm>;
    onSelect?: (code: string) => void;
}

const UNIT_OPTIONS = [
    { label: 'KM', value: 'KM' },
    { label: 'ML', value: 'ML' },
];

export default function UnitSelector<TForm extends FieldValues>({ control, name, onSelect }: UnitSelectorProps<TForm>) {
    const [isOpen, setIsOpen] = useState(false);
    const { field: { onChange, value } } = useController({ control, name });

    const handleSelect = (unit: string) => {
        setIsOpen(false);
        onChange(unit)
        onSelect?.(unit);
    };

    const renderItem = ({ item: { value, label } }: { item: { label: string, value: string } }) => (
        <TouchableOpacity
            className="flex-row items-center p-3 border-b border-gray-200"
            onPress={() => handleSelect(value)}
            activeOpacity={0.7}
        >
            <Text className="flex-1 text-base text-gray-900 font-medium">{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View className='flex-1 items-center justify-center border-transparent bg-white py-3'
            style={{ elevation: 2, shadowColor: 'rgba(0, 0, 0, 0.4)', shadowRadius: 1, shadowOpacity: 0.2, shadowOffset: { width: 4, height: 4 } }}
        >
            <TouchableOpacity
                className="items-center justify-center overflow-hidden"
                onPress={() => setIsOpen(true)}
                activeOpacity={0.7}
            >
                <Text className="text-base text-gray-900 font-medium">{value || "KM"}</Text>
            </TouchableOpacity>
            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="bg-white rounded-lg w-40 overflow-hidden">
                            <FlatList
                                data={UNIT_OPTIONS}
                                keyExtractor={(item) => item.value}
                                renderItem={renderItem}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}
