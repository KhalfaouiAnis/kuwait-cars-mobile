import Checkbox from '@/core/components/ui/input/checkbox';
import { YEARS as YearsConstant } from '@/core/constants';
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

        if (searchQuery) {
            years = years.filter(year => year.label.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        return years;
    }, [searchQuery]);

    const renderYearOption = ({ item }: { item: typeof YearsConstant[0] }) => {
        const isSelected = selectedYears.includes(item.value as string);
        return (
            <TouchableOpacity
                className={`flex-row items-center p-3 my-1 border-b border-gray-200`}
                onPress={() => onToggleYear(item.value as string)}
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