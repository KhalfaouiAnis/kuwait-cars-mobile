import { AdvertisementInterface } from '@/core/types';
import { ReactNode } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import Advertisement from './advertisement';

interface Props {
    view: "vertical" | "horizontal"
    ads: AdvertisementInterface[],
    hasNextPage: boolean
    isFetchingNextPage: boolean
    isLoading: boolean
    fetchNextPage: any,
    refetch: any,
    isDark?: boolean,
    emptyStateComponent?: ReactNode
}

export const InfinitAdsListing = ({ ads, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage, refetch, view, isDark, emptyStateComponent }: Props) => {
    return (
        <FlatList
            data={ads}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View className="mb-2 me-1">
                    <Advertisement data={item} view={view} isDark={isDark} />
                </View>
            )}
            onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
            onEndReachedThreshold={0.5}
            refreshing={isLoading}
            onRefresh={refetch}
            contentContainerStyle={ads.length === 0 ? { flex: 1 } : { paddingBottom: 50, position: "relative", zIndex: 2 }}
            showsVerticalScrollIndicator={false}
            className="bg-transparent me-2"
            removeClippedSubviews={false}
            ListEmptyComponent={!isLoading ? () => emptyStateComponent : null}
            ListFooterComponent={
                isFetchingNextPage ? <ActivityIndicator size="small" style={{ backgroundColor: "#FAED02" }} /> : null
            }
        />
    );
};