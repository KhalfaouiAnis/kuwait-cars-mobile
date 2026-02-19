import { EmptyState } from "@/core/components/ui/shared/empty-state";
import { useAdsQuery } from "@/core/services/ads/ad.queries";
import { AdvertisementInterface } from "@/core/types";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, View } from "react-native";
import { AdSkeletonList } from "../skeletons/ad-skeleton-list";
import Advertisement from "./advertisement";

interface Props {
  view: "vertical" | "horizontal";
}

export const AdsListing = ({ view }: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useAdsQuery();

  const ads = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data?.pages],
  );

  const renderItem = useCallback(({ item }: { item: AdvertisementInterface }) => (
    <Advertisement data={item} view={view} />
  ), [view]);

  const ItemSeparator = useCallback(() => (
    <View style={{ height: 12 }} />
  ), []);

  const keyExtractor = useCallback((item: AdvertisementInterface) => item.id.toString(), []);

  if (isLoading) return <AdSkeletonList />;

  return (
    <FlashList
      data={ads}
      pagingEnabled
      onRefresh={refetch}
      snapToInterval={330}
      refreshing={isLoading}
      renderItem={renderItem}
      decelerationRate="fast"
      snapToAlignment="start"
      onEndReachedThreshold={0.9}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={<EmptyState showReset={false} />}
      onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
      contentContainerStyle={
        ads.length === 0
          ? { flex: 1 }
          : { paddingBottom: 50 }
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator
            size="small"
            style={{ backgroundColor: "#FAED02" }}
          />
        ) : null
      }
    />
  );
};
