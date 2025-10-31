import { YEARS as YearsConstant } from '@/core/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import SearchField from './search-field';

interface YearFilterContentProps {
    selectedYears: string[];
    onToggleYear: (value: string) => void;
}

const YearFilterContent: React.FC<YearFilterContentProps> = ({ selectedYears, onToggleYear }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredYears = useMemo(() => {
        let years = YearsConstant;

        if (selectedYears.length > 0) {
            years = YearsConstant.filter(year => selectedYears.includes(year.label));
        }

        if (searchQuery) {
            years = years.filter(year => year.label.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        return years;
    }, [selectedYears, searchQuery]);

    const renderYearOption = ({ item }: { item: typeof YearsConstant[0] }) => {
        const isSelected = selectedYears.includes(item.value);
        return (
            <TouchableOpacity
                className={`flex-row items-center p-3 my-1 border-b border-gray-200 ${isSelected ? 'bg-primary-500' : ''}`}
                onPress={() => onToggleYear(item.value)}
            >
                <View className="flex-1">
                    <Text className="font-medium">{item.label}</Text>
                </View>
                <Ionicons
                    name='checkmark-circle'
                    size={20}
                    color='gray'
                />
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1">
            <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FlatList
                data={filteredYears}
                keyExtractor={(item) => item.id}
                renderItem={renderYearOption}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text className="text-center text-gray-500 py-4">No year match your filters</Text>}
            />
        </View>
    );
};

const renderYearFilters = (selected: (string | number)[], onToggle: (value: string | number) => void) => (
    <YearFilterContent selectedYears={selected as string[]} onToggleYear={onToggle} />
);

export default renderYearFilters;