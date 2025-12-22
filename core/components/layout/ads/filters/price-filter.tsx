import { OVERALL_MAX_PRICE, OVERALL_MIN_PRICE } from '@/core/constants';
import useSearchStore from '@/core/store/search.store';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Text, View } from 'react-native';

// TODO: refactor and reuse for mileage filter
export const PriceFilterContent = () => {
    const price = useSearchStore((state) => state.draftFilters.price);
    const setFilter = useSearchStore((state) => state.setDraftFilter);

    const currentPrice = price || [OVERALL_MIN_PRICE, OVERALL_MAX_PRICE];

    return (
        <View className="border border-primary-500 px-4 py-12 rounded-xl">
            <Text className="text-lg font-semibold text-gray-700">Price Range</Text>

            <View className='flex-row gap-2 items-center justify-center mt-4'>
                <Text className="flex-1 border border-gray-100 rounded-md p-2 font-semibold text-gray-700">Min</Text>
                <Text className="flex-1 border border-gray-100 rounded-md p-2 font-semibold text-gray-700">Max</Text>
            </View>

            <View className="flex-row justify-between mt-4 mx-2">
                <Text className="text-sm text-error">${currentPrice[0]?.toFixed(0)}</Text>
                <Text className="text-sm text-error">${currentPrice[1]?.toFixed(0)}</Text>
            </View>

            <MultiSlider
                values={currentPrice || [OVERALL_MIN_PRICE, OVERALL_MAX_PRICE / 2]}
                min={OVERALL_MIN_PRICE}
                max={OVERALL_MAX_PRICE}
                step={100}
                sliderLength={300}
                allowOverlap={false}
                containerStyle={{ alignSelf: 'center', margin: 0 }}
                trackStyle={{ height: 6, backgroundColor: '#D80027', borderRadius: 8 }}
                selectedStyle={{ backgroundColor: '#D80027' }}
                markerStyle={{ backgroundColor: '#D80027', width: 18, height: 18, borderRadius: 10, borderColor: "#E9EFFE", borderWidth: 1, marginTop: 4 }}
                onValuesChange={(values) => setFilter('price', values as [number, number])}
            />
        </View>
    );
};