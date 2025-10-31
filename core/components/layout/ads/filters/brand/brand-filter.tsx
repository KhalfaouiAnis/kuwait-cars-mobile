import useBrandFilter from '@/core/hooks/ad/filters/useBrand';
import { FC } from 'react';
import { FlatList, Text, View } from 'react-native';
import SearchField from '../search-field';
import CarOriginList from './car-origin';
import { renderBrandOption } from './renderBrandFilterItem';

interface BrandFilterContentProps {
    selectedBrands: (string | number)[];
    onToggleBrand: (value: string | number) => void;
}

const BrandFilterContent: FC<BrandFilterContentProps> = ({ selectedBrands, onToggleBrand }) => {
    const { selectedRegions, carRegions, filteredCars, searchQuery, setSearchQuery, handleToggleRegion } = useBrandFilter()

    return (
        <View className="flex-1">
            <CarOriginList regions={carRegions} selectedRegions={selectedRegions} toggleSelect={handleToggleRegion} />
            <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FlatList
                data={filteredCars}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => renderBrandOption({ item, selectedBrands: selectedBrands as string[], onToggleBrand })}
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