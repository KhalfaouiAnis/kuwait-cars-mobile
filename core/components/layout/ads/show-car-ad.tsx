import { DIMENSIONS } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { useViewTracker } from "@/core/hooks/ad/useViewTracker";
import {
  useIncrementAdViews,
  useToggleFavorite,
} from "@/core/services/ads/ad.mutations";
import useAuthStore from "@/core/store/auth.store";
import { AdvertisementInterface } from "@/core/types";
import { formatViews } from "@/core/utils";
import { Ionicons } from "@expo/vector-icons";
import { useMappingHelper } from "@shopify/flash-list";
import { Image } from "expo-image";
import { memo, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FavoriteButton } from "../../ui/button/favorite-button";
import { FlagButton } from "../../ui/button/flag-button";
import { ShareButton } from "../../ui/button/share-button";
import VideoPlayer from "../../ui/shared/video-player";

const { width, height } = DIMENSIONS

const ShowAdComponent = memo(function Advertisement({
  ad,
  isVisible,
}: {
  ad: AdvertisementInterface;
  isVisible: boolean;
}) {
  const [activeHorizontalIndex, setActiveHorizontalIndex] = useState(0);
  const { mutate: favorite } = useToggleFavorite();
  const isGuest = useAuthStore(state => state.isGuest);
  const { mutate: recordView } = useIncrementAdViews();
  const { getMappingKey } = useMappingHelper();
  useViewTracker(ad.id, isVisible, recordView);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveHorizontalIndex(index);
  };

  return (
    <View style={{ width, height, position: "relative" }}>
      {ad.media.length === 1 ? (
        <View style={{ width, height }}>
          {ad.media[0].media_type === "VIDEO" ? (
            <VideoPlayer
              autoPlay
              isVisible={isVisible}
              source={ad.media[0].transformed_url}
            />
          ) : (
            <Image
              source={{ uri: ad.media[0].transformed_url }}
              style={styles.fullScreenImage}
              contentFit="cover"
              transition={200}
            />
          )}
        </View>
      ) : (
        <ScrollView
          horizontal
          pagingEnabled
          snapToInterval={width}
          decelerationRate="fast"
          snapToAlignment="start"
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScroll}
          showsHorizontalScrollIndicator={false}
        >
          {ad.media.map((item, index) => (
            <View style={{ width, height }} key={getMappingKey(item.public_id, index)}>
              {item.media_type === "VIDEO" ? (
                <VideoPlayer
                  autoPlay
                  isVisible={isVisible && index === activeHorizontalIndex}
                  source={item.transformed_url}
                />
              ) : (
                <Image
                  source={{ uri: item.transformed_url }}
                  style={styles.fullScreenImage}
                  contentFit="cover"
                  transition={200}
                />
              )}
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.rightSidebar}>
        <FlagButton
          isFlagged={ad.is_flagged ?? false}
          onPress={() => { }}
          disabled={isGuest}
          color="white"
          size={24}
        />
        <Ionicons name="chatbox-ellipses-outline" color="white" size={24} />
        <FavoriteButton
          isFavorite={ad.is_favorited ?? false}
          onPress={() => favorite(ad.id)}
          disabled={isGuest}
          color="white"
          size={24}
        />
        <ShareButton
          onPress={() => { }}
          disabled={isGuest}
          color="white"
          size={24}
        />
        <View>
          <Ionicons name="eye-outline" color="white" size={22} />
          <Text className="text-white text-xs text-center">
            {formatViews(ad.views || 0)}
          </Text>
        </View>
      </View>

      <View style={styles.bottomInfo}>
        <Image
          source={
            ad.user?.avatar ? { uri: ad.user.avatar } : IMAGES.DefaultAvatar
          }
          contentFit="contain"
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
          }}
        />
        <Text className="font-inter-semibold text-white text-[8px]">
          {ad.user?.fullname}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-inter-medium text-lg text-white"
        >
          {ad.title}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="font-inter-medium text-sm text-white"
        >
          {ad.description}
        </Text>
      </View>
    </View>
  );
});

export default ShowAdComponent;

const styles = StyleSheet.create({
  rightSidebar: {
    position: "absolute",
    right: 10,
    bottom: 100,
    alignItems: "center",
    gap: 20,
  },
  bottomInfo: {
    position: "absolute",
    bottom: 40,
    left: 10,
    right: 80,
  },
  fullScreenImage: {
    width: width,
    height: height,
  },
});
