import AdCategoryIndex from "@/core/components/layout/ads/ad-listing-index";
import { AD_TYPES } from "@/core/constants/ad";
import { useUsedCarsFilterConfig } from "@/core/hooks/ad/useFilterConfig";
import useSearchStore from "@/core/store/search.store";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function UsedCarsCategoryScreen() {
    const setExternalFilter = useSearchStore(state => state.setExternalFilter)
    const filterConfig = useUsedCarsFilterConfig()

    useFocusEffect(
        useCallback(() => {
            setExternalFilter("ad_type", AD_TYPES.used_cars)
            setExternalFilter("ad_category", undefined)
        }, [setExternalFilter])
    );

    return (
        <AdCategoryIndex
            filterConfig={filterConfig}
        />
    )
}