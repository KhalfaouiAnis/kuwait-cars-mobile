import { EmptyState } from '@/core/components/ui/shared/empty-state';
import { useAdsQuery } from '@/core/services/ads/ad.queries';
import React from 'react';
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
    const ads = data?.pages.flatMap((page) => page.data) ?? [];

    if (isLoading) return <AdSkeletonList />;

    return (
        <FlatList
            data={ads}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View className="mb-4 me-2">
                    <Advertisement data={item} view={view} isDark={isDark} />
                </View>
            )}
            onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
            onEndReachedThreshold={0.5}
            refreshing={isLoading}
            onRefresh={refetch}
            contentContainerStyle={ads.length === 0 ? { flex: 1 } : { paddingBottom: 50, position: "relative", zIndex: 2 }}
            showsVerticalScrollIndicator={false}
            className="bg-transparent"
            removeClippedSubviews={false}
            ListEmptyComponent={!isLoading ? <EmptyState /> : null}
            ListFooterComponent={
                isFetchingNextPage ? <ActivityIndicator size="small" style={{ backgroundColor: "#FAED02" }} /> : null
            }
        />
    );
};