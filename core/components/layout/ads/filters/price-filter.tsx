import useFiltersStore from '@/core/lib/stores/filters.store';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const OVERALL_MIN = 0;
const OVERALL_MAX = 100000;

const PriceFilterContent: React.FC = () => {
    const { price, setPrice } = useFiltersStore();
    const [localRange, setLocalRange] = useState(price);

    const handleRangeChange = (values: number[]) => {
        setLocalRange(values);
        setPrice(values);
    };

    return (
        <View className="border border-primary-500 px-4 py-12 rounded-xl">
            <Text className="text-lg font-semibold text-gray-700">Price Range</Text>

            <View className="flex-row justify-between mt-2 mx-2">
                <Text className="text-sm text-error">${localRange[0].toFixed(0)}</Text>
                <Text className="text-sm text-error">${localRange[1].toFixed(0)}</Text>
            </View>

            <MultiSlider
                values={localRange}
                min={OVERALL_MIN}
                max={OVERALL_MAX}
                step={100}
                sliderLength={300}
                allowOverlap={false}
                containerStyle={{ alignSelf: 'center', margin: 0 }}
                trackStyle={{ height: 6, backgroundColor: '#D80027', borderRadius: 8 }}
                selectedStyle={{ backgroundColor: '#D80027' }}
                markerStyle={{ backgroundColor: '#D80027', width: 18, height: 18, borderRadius: 10, borderColor: "#E9EFFE", borderWidth: 1, marginTop: 4 }}
                onValuesChange={handleRangeChange}
            />
        </View>
    );
};

const renderPriceFilters = () => (
    <PriceFilterContent />
);

export default renderPriceFilters;