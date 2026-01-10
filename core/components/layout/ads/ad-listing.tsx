import { EmptyState } from '@/core/components/ui/shared/empty-state';
import { useAdsQuery } from '@/core/services/ads/ad.queries';
import { AdvertisementInterface } from '@/core/types';
import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { AdSkeletonList } from '../skeletons/ad-skeleton-list';
import Advertisement from './advertisement';

interface Props {
    view: "vertical" | "horizontal"
    isDark?: boolean,
}

export const AdsListing = ({ view, isDark }: Props) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useAdsQuery();

    const ads = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data?.pages]);

    if (isLoading) return <AdSkeletonList />;

    const renderItem = ({ item }: { item: AdvertisementInterface }) => (
        <View className="mb-4 me-2">
            <Advertisement data={item} view={view} isDark={isDark} />
        </View>
    )

    return (
        <FlatList
            data={ads}
            onRefresh={refetch}
            refreshing={isLoading}
            renderItem={renderItem}
            className="bg-transparent"
            onEndReachedThreshold={0.5}
            removeClippedSubviews={false}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={!isLoading ? <EmptyState showReset={false} /> : null}
            onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
            contentContainerStyle={ads.length === 0 ? { flex: 1 } : { paddingBottom: 50, position: "relative", zIndex: 2 }}
            ListFooterComponent={
                isFetchingNextPage ? <ActivityIndicator size="small" style={{ backgroundColor: "#FAED02" }} /> : null
            }
        />
    );
};