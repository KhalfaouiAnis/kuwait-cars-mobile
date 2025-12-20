import { useAdsQuery } from '@/core/services/ads/ad.queries';
import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import Ad from './Ad';

export const ProductListScreen = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useAdsQuery();
    // Flatten the pages of data into a single array for the FlatList
    const products = data?.pages.flatMap((page) => page.data) ?? [];

    if (isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Ad data={item} view='horizontal' />}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}
            onEndReachedThreshold={0.5}
            refreshing={isLoading}
            onRefresh={refetch}
            ListFooterComponent={
                isFetchingNextPage ? <ActivityIndicator size="small" /> : null
            }
        />
    );
};