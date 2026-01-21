import { IMAGES } from "@/core/constants/images";
import { useViewTracker } from "@/core/hooks/ad/useViewTracker";
import { useIncrementAdViews } from "@/core/services/ads/ad.mutations";
import { AdvertisementInterface } from "@/core/types";
import { formatViews } from "@/core/utils";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { memo, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import VideoPlayer from "../../ui/shared/video-player";

const { width, height } = Dimensions.get("window");

const ShowAdComponent = memo(function Advertisement({
  ad,
  isVisible,
}: {
  ad: AdvertisementInterface;
  isVisible: boolean;
}) {
  const [activeHorizontalIndex, setActiveHorizontalIndex] = useState(0);
  const { mutate: recordView } = useIncrementAdViews();
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
          snapToAlignment="center"
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScroll}
          showsHorizontalScrollIndicator={false}
        >
          {ad.media.map((item, index) => (
            <View style={{ width, height }} key={`${item.public_id}__${index}`}>
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
        <Ionicons name="flag-outline" color="white" size={24} />
        <Ionicons name="chatbox-ellipses-outline" color="white" size={24} />
        <Ionicons name="star-outline" color="white" size={24} />
        <Feather name="share-2" size={24} color="white" />
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
