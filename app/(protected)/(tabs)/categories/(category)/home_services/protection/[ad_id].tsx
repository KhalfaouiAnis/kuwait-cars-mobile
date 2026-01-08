import Container from "@/core/components/ui/container";
import BackArrow from "@/core/components/ui/shared/back-arrow";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { useToggleFavorite } from "@/core/services/ads/ad.mutations";
import { useAdDetailQuery } from "@/core/services/ads/ad.queries";
import useRecentlyViewedStore from "@/core/store/recently-viewed-ad.store";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View } from 'react-native';

import AdvertisementDetails from "@/core/components/layout/ads/ad-details";
import { AdCardSkeleton } from "@/core/components/layout/skeletons/ad-skeleton-card";
import { FavoriteButton } from "@/core/components/ui/button/favorite-button";
import { FlagButton } from "@/core/components/ui/button/flag-button";
import { ShareButton } from "@/core/components/ui/button/share-button";
import useUserPreferencesStore from "@/core/store/preferences.store";

export default function ProtectionAdDetails() {
    const { ad_id } = useLocalSearchParams<{ ad_id: string }>();
    const addView = useRecentlyViewedStore((state) => state.addView);
    const { isRTL } = useUserPreferencesStore()
    const { protectAction } = useAuthGuard();
    const { mutate } = useToggleFavorite();
    const { data: adDetail, isLoading, error, isFetching } = useAdDetailQuery(ad_id);

    useEffect(() => {
        if (ad_id) {
            addView(ad_id);
        }
    }, [ad_id, addView]);

    if (error) return null;

    const isDataReady = !isLoading && adDetail !== undefined;
    const isFavorited = adDetail?.is_favorited ?? false;
    const isFlagged = adDetail?.is_flagged ?? false;

    console.log("ffff: ", isFetching);


    return (
        <Container scrollable header={
            <View style={{ direction: isRTL ? "rtl" : "ltr" }} className="flex-row items-center justify-between mb-2 mt-4 px-4">
                <BackArrow />
                <View className="flex-row items-center gap-x-3">
                    <FlagButton onPress={() => { }} isFlagged={isFlagged} />
                    <ShareButton onPress={() => { }} />
                    <FavoriteButton disabled={!isDataReady} isFavorite={isFavorited} onPress={() => protectAction(() => mutate(ad_id))} />
                </View>
            </View>
        }>
            {
                !isDataReady ? <AdCardSkeleton /> : (
                    <AdvertisementDetails adDetail={adDetail} />
                )
            }
        </Container>
    )
}

