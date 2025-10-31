import useFiltersStore from '@/core/lib/stores/filters.store';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type FilterValues = "sorting" | "brand" | "year" | "price"

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    filterType: FilterValues
    renderFilter: (selectedValues: (string | number)[], onToggle: (value: string | number) => void) => React.ReactNode;
    title?: string;
}

const FilterModal: React.FC<FilterModalProps> = ({
    visible,
    onClose,
    filterType,
    renderFilter,
    title = 'Filters',
}) => {
    const { [filterType]: selectedValues, toggleFilter } = useFiltersStore();

    const handleToggle = (value: string | number) => {
        toggleFilter(filterType, value);
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end bg-black/20">
                <TouchableOpacity className="flex-1" onPress={onClose} activeOpacity={1} />
                <View className="bg-white rounded-t-lg p-4 pb-14 max-h-[90%] flex-1">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold capitalize">{title}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    {renderFilter(selectedValues, handleToggle)}
                </View>
            </View>
        </Modal>
    );
};

export default FilterModal;