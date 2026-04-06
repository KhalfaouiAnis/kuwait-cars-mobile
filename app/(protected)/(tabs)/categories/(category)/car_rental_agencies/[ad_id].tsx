import { useAdDetailQuery } from "@/core/services/ads/ad.queries";
import useRecentlyViewedStore from "@/core/store/recently-viewed-ad.store";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

import AdDetail from "@/core/components/layout/ads/ad-details/ad-detail";
import { AdCardSkeleton } from "@/core/components/layout/skeletons/ad-skeleton-card";

export default function CarRentalAgenciesAdDetails() {
    const { ad_id } = useLocalSearchParams<{ ad_id: string }>();
    const addView = useRecentlyViewedStore((state) => state.addView);
    const { data: adDetail, isLoading, error } = useAdDetailQuery(ad_id);

    useEffect(() => {
        if (ad_id) {
            addView(ad_id);
        }
    }, [ad_id, addView]);

    if (error) return null;

    const isDataReady = !isLoading && adDetail !== undefined;

    if (!isDataReady) return <AdCardSkeleton />;

    return <AdDetail adDetail={adDetail} />
}

