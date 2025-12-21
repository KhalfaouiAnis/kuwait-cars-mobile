import { useAdsQuery } from '@/core/services/ads/ad.queries';
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
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

    if (isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

    return (
        <FlatList
            data={ads}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View className="mb-2 me-1">
                    <Advertisement data={item} view={view} isDark={isDark} />
                </View>
            )}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}
            onEndReachedThreshold={0.5}
            refreshing={isLoading}
            onRefresh={refetch}
            contentContainerStyle={{ paddingBottom: 50, position: "relative", zIndex: 2 }}
            showsVerticalScrollIndicator={false}
            className="bg-transparent me-2"
            removeClippedSubviews={false}
            ListFooterComponent={
                isFetchingNextPage ? <ActivityIndicator size="small" className='text-primary-500 bg-primary-500' /> : null
            }
        />
    );
};