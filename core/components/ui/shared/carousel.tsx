import { Ionicons } from '@expo/vector-icons';
import { Image } from "expo-image";
import { ReactNode, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const containerWidth = screenWidth - 40;
const containerHeight = 250;

type CarouselItem = {
    url: string;
};

type CarouselProps = {
    items: CarouselItem[];
    onItemPress?: (item: CarouselItem, index: number) => void;
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
                                <Image
                                    style={styles.image}
                                    source={item.url}
                                    contentFit="contain"
                                    placeholder={{ blurhash: "LFDQn%_4?IWC~qj[?H%L00ay?aof" }}
                                    transition={500}
                                />
                            </View>
                            <View className="absolute top-2 start-2">
                                {badge}
                            </View>
                            {showIndicators && (
                                <View className="absolute bottom-4 end-4 bg-gray-500 rounded-lg px-3 py-1 flex-row items-center">
                                    <Text className="text-white text-xs mr-1">{currentIndex + 1}/{items.length}</Text>
                                    <Ionicons name="images-outline" size={14} color="white" />
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
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: "transparent",
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "transparent"
    },
});