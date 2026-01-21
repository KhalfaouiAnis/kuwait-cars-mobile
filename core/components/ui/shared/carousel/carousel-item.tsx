import { AdvertisementMedia } from "@/core/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { CarouselProps } from "../carousel";
import VideoPlayer from "../video-player";

const screenWidth = Dimensions.get("window").width;
const containerWidth = screenWidth - 22;
const containerHeight = 220;

interface Props {
  item: AdvertisementMedia;
}

export default function CarouselItem({
  item,
  index,
  onItemPress,
  badge,
  showIndicators,
  currentIndex,
  items,
}: Partial<CarouselProps> & {
  item: AdvertisementMedia;
  index: number;
  currentIndex: number;
}) {
  return (
    <TouchableOpacity
      key={index}
      className="w-full flex-1 items-center justify-center relative me-1 bg-transparent"
      onPress={() => onItemPress?.(item, index)}
      activeOpacity={0.8}
    >
      <View className="overflow-hidden relative bg-transparent">
        <View
          style={[
            styles.container,
            { width: containerWidth, height: containerHeight },
          ]}
        >
          {item.media_type === "VIDEO" ? (
            <VideoPlayer source={item.transformed_url} />
          ) : (
            <Image
              style={styles.image}
              source={{ uri: item.transformed_url }}
              placeholder={{ blurhash: "LFDQn%_4?IWC~qj[?H%L00ay?aof" }}
              contentFit="fill"
              transition={200}
            />
          )}
        </View>
        {badge && <View className="absolute top-2 start-2">{badge}</View>}
        {showIndicators && (
          <View className="absolute bottom-3 end-4 bg-gray-500 rounded-lg px-3 py-1 flex-row items-center gap-1">
            <Ionicons
              name={
                item.media_type === "VIDEO"
                  ? "videocam-outline"
                  : "images-outline"
              }
              size={14}
              color="white"
            />
            <Text className="text-white text-xs ms-1">
              {currentIndex + 1}/{items?.length}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: 8,
    borderWidth: 1,
  },
  image: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
});
