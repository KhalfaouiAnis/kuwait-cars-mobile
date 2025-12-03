import Checkbox from '@/core/components/ui/input/checkbox';
import React, { useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import SearchField from './search-field';

interface ModelFilterContentProps {
    selectedModels: string[];
    onToggleModel: (value: string) => void;
}

const ModelFilterContent: React.FC<ModelFilterContentProps> = ({ selectedModels, onToggleModel }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredModels = useMemo(() => {
        let models = MOCK_MODELS;

        if (searchQuery) {
            models = models.filter(model => model.label.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        return models;
    }, [searchQuery]);

    const renderModelOption = ({ item }: { item: typeof MOCK_MODELS[0] }) => {
        const isSelected = selectedModels.includes(item.value as string);
        return (
            <TouchableOpacity
                className={`flex-row items-center p-3 my-1 border-b border-gray-200 ${isSelected ? 'bg-primary-500' : ''}`}
                onPress={() => onToggleModel(item.value as string)}
            >
                <View className="flex-1">
                    <Text className="font-medium">{item.label}</Text>
                </View>
                <Checkbox size={20} checked={isSelected} />
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1">
            <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FlatList
                data={filteredModels}
                keyExtractor={(item) => item.id}
                renderItem={renderModelOption}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text className="text-center text-gray-500 py-4">No model match your filters</Text>}
            />
        </View>
    );
};

const renderModelFilters = (selected: (string | number)[], onToggle: (value: string | number) => void) => (
    <ModelFilterContent selectedModels={selected as string[]} onToggleModel={onToggle} />
);

export default renderModelFilters;

const MOCK_MODELS = [
    {
        id: "1",
        label: "Land Cruisze",
        value: "Land Cruisze",
    },
    {
        id: "2",
        label: "Prado",
        value: "prado",
    },
    {
        id: "3",
        label: "Camry",
        value: "Camry",
    },
    {
        id: "4",
        label: "Corolla Cross",
        value: "Corolla Cross",
    },
    {
        id: "5",
        label: "Corolla",
        value: "Corolla",
    },
    {
        id: "6",
        label: "Yaris",
        value: "Yaris",
    },
    {
        id: "7",
        label: "Yaris Cross",
        value: "Yaris Cross",
    },
    {
        id: "8",
        label: "Aygo",
        value: "Aygo",
    },
    {
        id: "9",
        label: "Crown Signa",
        value: "Crown Signa",
    },
    {
        id: "10",
        label: "Sequoia",
        value: "Sequoia",
    },
];