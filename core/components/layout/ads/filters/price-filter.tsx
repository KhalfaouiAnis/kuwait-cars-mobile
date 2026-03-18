import { DIMENSIONS, OVERALL_MAX_PRICE, OVERALL_MIN_PRICE } from '@/core/constants';
import useUserPreferencesStore from '@/core/store/preferences.store';
import useSearchStore from '@/core/store/search.store';
import { formatViews } from '@/core/utils';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

// TODO: refactor and reuse for mileage filter
export const PriceFilterContent = () => {
    const { t } = useTranslation("common")
    const { isRTL } = useUserPreferencesStore()
    const price = useSearchStore((state) => state.draftFilters.price);
    const setFilter = useSearchStore((state) => state.setDraftFilter);

    const currentPrice = price || [OVERALL_MIN_PRICE + 1500, OVERALL_MAX_PRICE - 20000];

    return (
        <View
            className="border-[0.5px] justify-center mx-auto border-grayish px-4"
            style={{ direction: isRTL ? "rtl" : "ltr", borderRadius: 10, width: DIMENSIONS.width - 40, height: 235, backgroundColor: "#F5F5F5" }}>
            <Text className="text-lg font-semibold">{t("advancedSearch.priceRange")}</Text>

            <View className='flex-row gap-4 items-center justify-center mt-4'>
                <Text className="flex-1 bg-white border border-[#D0D5DD] rounded-md p-2 font-semibold">{t("advancedSearch.min")}</Text>
                <Text className="flex-1 bg-white border border-[#D0D5DD] rounded-md p-2 font-semibold">{t("advancedSearch.max")}</Text>
            </View>

            <View className="flex-row justify-between mt-4 mx-1">
                <Text className="text-xs font-inter-semibold">KD {formatViews(currentPrice[0]?.toFixed(0))}</Text>
                <Text className="text-xs font-inter-semibold">KD {formatViews(currentPrice[1]?.toFixed(0))}</Text>
            </View>

            <MultiSlider
                step={100}
                min={OVERALL_MIN_PRICE}
                max={OVERALL_MAX_PRICE}
                allowOverlap={false}
                sliderLength={DIMENSIONS.width - 120}
                selectedStyle={{ backgroundColor: '#FF123D' }}
                containerStyle={{ alignSelf: 'center', margin: 0 }}
                values={currentPrice || [OVERALL_MIN_PRICE, OVERALL_MAX_PRICE / 2]}
                trackStyle={{ height: 6, backgroundColor: '#A8A8A8', borderRadius: 8 }}
                onValuesChangeFinish={(values) => setFilter('price', values as [number, number])}
                markerStyle={{ backgroundColor: '#FF123D', width: 18, height: 18, borderRadius: 10, borderColor: "#E9EFFE", borderWidth: 1, marginTop: 4 }}
            />
        </View>
    );
};