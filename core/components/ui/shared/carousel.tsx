import { DIMENSIONS } from "@/core/constants";
import { AdvertisementMedia } from "@/core/types";
import { useMappingHelper } from "@shopify/flash-list";
import { ReactNode, useRef, useState } from "react";
import {
  ScrollView,
  View,
} from "react-native";
import CarouselItem from "./carousel/carousel-item";

export type CarouselProps = {
  items: AdvertisementMedia[];
  onItemPress?: (item: AdvertisementMedia, index?: number) => void;
  badge?: ReactNode;
  showIndicators?: boolean;
  className?: string;
};

export default function Carousel({
  badge,
  items,
  onItemPress,
  className = "",
  showIndicators = true,
}: CarouselProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { getMappingKey } = useMappingHelper();

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / DIMENSIONS.width);
    setCurrentIndex(index);
  };

  return (
    <View className={`flex-1 ${className}`}>
      {
        items.length > 0 ? (
          <ScrollView
            horizontal
            pagingEnabled
            ref={scrollViewRef}
            onScroll={handleScroll}
            decelerationRate="fast"
            snapToAlignment="start"
            scrollEventThrottle={16}
            snapToInterval={DIMENSIONS.width}
            showsHorizontalScrollIndicator={false}
          >
            {
              items.map((item, index) => (
                <CarouselItem
                  item={item}
                  index={index}
                  badge={badge}
                  key={getMappingKey(item.public_id, index)}
                  currentIndex={currentIndex}
                  totalItems={items.length}
                  showIndicators={showIndicators}
                  onItemPress={onItemPress}
                />
              ))
            }
          </ScrollView>
        ) : (
          <CarouselItem item={items[0]} totalItems={1} badge={badge} showIndicators={showIndicators} onItemPress={onItemPress} />
        )
      }
    </View>
  );
}
