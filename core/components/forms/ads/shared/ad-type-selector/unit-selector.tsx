import { boxShadow } from '@/core/utils/cn';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

type UnitSelectorProps<TForm extends FieldValues> = {
    control: Control<TForm>;
    name: FieldPath<TForm>;
    onSelect?: (code: string) => void;
}

const UNIT_OPTIONS = [
    { value: 'KM' },
    { value: 'ML' },
];

export default function UnitSelector<TForm extends FieldValues>({ control, name, onSelect }: UnitSelectorProps<TForm>) {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("common")
    const { field: { onChange, value } } = useController({ control, name });

    const handleSelect = (unit: string) => {
        setIsOpen(false);
        onChange(unit)
        onSelect?.(unit);
    };

    const renderItem = ({ item: { value } }: { item: { value: string } }) => (
        <TouchableOpacity
            className="flex-row items-center p-3 border-b border-gray-200"
            onPress={() => handleSelect(value)}
            activeOpacity={0.7}
        >
            <Text className="flex-1 text-base text-gray-700 font-medium">{t(`unit.${value}`)}</Text>
        </TouchableOpacity>
    );

    return (
        <View
            className='flex-1 items-center justify-center bordered-box px-6'
            style={boxShadow().button}
        >
            <TouchableOpacity
                className="flex-row items-center gap-2 overflow-hidden"
                onPress={() => setIsOpen(true)}
                activeOpacity={0.7}
            >
                <Text className="text-base text-gray-600 dark:text-white font-medium">{t(`unit.${value}`) || t("unit.KM")}</Text>
                <Ionicons name='chevron-down' size={20} color="gray" />
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