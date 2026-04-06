import ShowAdComponent from "@/core/components/layout/ads/show-car-ad";
import MainHeader from "@/core/components/layout/header/main/main-header";
import { AdSkeletonList } from "@/core/components/layout/skeletons/ad-skeleton-list";
import { AD_TYPES } from "@/core/constants/ad";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { useAdsQuery } from "@/core/services/ads/ad.queries";
import useSearchStore from "@/core/store/search.store";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, TouchableOpacity, View } from "react-native";

const { height } = Dimensions.get("window");

export default function ShowCarsCategoryScreen() {
  const setExternalFilter = useSearchStore(state => state.setExternalFilter)
  const [activeVerticalIndex, setActiveVerticalIndex] = useState(0);
  const { protectAction } = useAuthGuard()

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

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems.length > 0) {
        setActiveVerticalIndex(viewableItems[0].index);
      }
    },
  ).current;

  useFocusEffect(
    useCallback(() => {
      setExternalFilter("ad_type", AD_TYPES.show);
      setExternalFilter("ad_category", undefined);
    }, [setExternalFilter]),
  );

  const handleNavigate = () => {
    protectAction(() => router.push("/create"))
  }

  if (isLoading) return <AdSkeletonList />;

  return (
    <View className="relative">
      <View className="w-full absolute top-8 -start-2 z-20">
        <MainHeader back={true} />
      </View>
      <FlatList
        data={ads}
        pagingEnabled
        onRefresh={refetch}
        refreshing={isLoading}
        snapToInterval={height}
        decelerationRate="fast"
        snapToAlignment="center"
        nestedScrollEnabled
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ShowAdComponent
            ad={item}
            isVisible={index === activeVerticalIndex}
          />
        )}
        onEndReached={() =>
          hasNextPage && !isFetchingNextPage && fetchNextPage()
        }
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 50,
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              size="small"
              style={{ backgroundColor: "#FAED02" }}
            />
          ) : null
        }
      />
      <TouchableOpacity
        className="absolute right-2 bottom-8 z-20 p-2 rounded-full bg-primary-500"
        onPress={handleNavigate}
      >
        <Ionicons name="add" size={38} />
      </TouchableOpacity>
    </View>
  );
}
