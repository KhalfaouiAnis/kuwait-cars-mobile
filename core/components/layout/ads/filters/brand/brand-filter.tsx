import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import SearchField from '../search-field';
import CarOriginList from './car-origin';

const carRegions: { label: string, value: string }[] = [
    { label: 'All', value: 'all' },
    { label: 'Asian', value: 'asian' },
    { label: 'American', value: 'american' },
    { label: 'European', value: 'european' },
];

const mockCars = [
    { id: '1', label: 'Toyota Camry', value: 'toyota-camry', brand: 'asian', icon: 'car-sport' },
    { id: '2', label: 'Honda Civic', value: 'honda-civic', brand: 'asian', icon: 'car-sport' },
    { id: '3', label: 'Ford Mustang', value: 'ford-mustang', brand: 'american', icon: 'car-sport' },
    { id: '4', label: 'Tesla Model 3', value: 'tesla-model3', brand: 'american', icon: 'car-sport' },
    { id: '5', label: 'BMW X5', value: 'bmw-x5', brand: 'european', icon: 'car-sport' },
];

interface BrandFilterContentProps {
    selectedBrands: (string | number)[];
    onToggleBrand: (value: string | number) => void;
}

const BrandFilterContent: React.FC<BrandFilterContentProps> = ({ selectedBrands, onToggleBrand }) => {
    const [selectedRegions, setselectedRegions] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCars = useMemo(() => {
        let cars = mockCars;

        if (selectedRegions.length > 0 && !selectedRegions.includes('all')) {
            cars = cars.filter(car => selectedRegions.includes(car.brand));
        }

        // Search filter
        if (searchQuery) {
            cars = cars.filter(car => car.label.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        return cars;
    }, [selectedRegions, searchQuery]);

    const handleToggleRegion = (region: string) => {
        if (region === 'all') {
            setselectedRegions(['all']);
        } else {
            const current = selectedRegions;
            const newRegions = current.includes('all') || current.includes(region)
                ? current.filter(r => r !== 'all' && r !== region)
                : [...current.filter(r => r !== 'all'), region];
            setselectedRegions(newRegions);
        }
    };

    const renderBrandOption = ({ item }: { item: typeof mockCars[0] }) => {
        const isSelected = selectedBrands.includes(item.value);
        return (
            <TouchableOpacity
                className={`flex-row items-center p-3 my-1 border-b border-gray-200 ${isSelected ? 'bg-primary-500' : ''}`}
                onPress={() => onToggleBrand(item.value)}
            >
                <Ionicons name={item.icon as any} size={24} color="gray" className="mr-3" />
                <View className="flex-1">
                    <Text className="font-medium">{item.label}</Text>
                    <Text className="text-sm text-gray-500 capitalize">{item.brand}</Text>
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
            <CarOriginList regions={carRegions} selectedRegions={selectedRegions} toggleSelect={handleToggleRegion} />
            <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FlatList
                data={filteredCars}
                keyExtractor={(item) => item.id}
                renderItem={renderBrandOption}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text className="text-center text-gray-500 py-4">No brand match your filters</Text>}
            />
        </View>
    );
};

const renderBrandFilters = (selected: (string | number)[], onToggle: (value: string | number) => void) => (
    <BrandFilterContent selectedBrands={selected} onToggleBrand={onToggle} />
);

export default renderBrandFilters;