import { AdvertisementMedia } from '@/core/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from "expo-image";
import { ReactNode, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import VideoPlayer from './video-player';

const screenWidth = Dimensions.get('window').width;

const containerWidth = screenWidth - 22;
const containerHeight = 220;

type CarouselProps = {
    items: AdvertisementMedia[];
    onItemPress?: (item: AdvertisementMedia, index: number) => void;
    badge?: ReactNode;
    showIndicators?: boolean;
    className?: string;
};

export default function Carousel({ items, onItemPress, badge, showIndicators = true, className = '' }: CarouselProps) {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentIndex(index);
    };

    return (
        <View className={`w-full ${className}`}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                className="w-full"
            >
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        className="w-full flex-1 items-center justify-center relative me-1 bg-transparent"
                        onPress={() => onItemPress?.(item, index)}
                        activeOpacity={0.8}
                    >
                        <View className="overflow-hidden relative bg-transparent">
                            <View style={[styles.container, { width: containerWidth, height: containerHeight }]}>
                                {
                                    item.media_type === "VIDEO" ? (<VideoPlayer source={item.transformed_url} />) : (
                                        <Image
                                            style={styles.image}
                                            source={{ uri: item.transformed_url }}
                                            placeholder={{ blurhash: "LFDQn%_4?IWC~qj[?H%L00ay?aof" }}
                                            contentFit='fill'
                                            transition={200}
                                        />
                                    )
                                }
                            </View>
                            {badge && (
                                <View className="absolute top-2 start-2">
                                    {badge}
                                </View>
                            )}
                            {showIndicators && (
                                <View className="absolute bottom-3 end-4 bg-gray-500 rounded-lg px-3 py-1 flex-row items-center gap-1">
                                    <Ionicons name={item.media_type === "VIDEO" ? "videocam-outline" : "images-outline"} size={14} color="white" />
                                    <Text className="text-white text-xs ms-1">{currentIndex + 1}/{items.length}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderRadius: 8,
        borderWidth: 1,
    },
    image: {
        flex: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "transparent"
    },
});