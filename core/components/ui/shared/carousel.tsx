import { Ionicons } from '@expo/vector-icons';
import { Image } from "expo-image";
import { ReactNode, useRef, useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

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

    // const scrollToIndex = (index: number) => {
    //     scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
    // };

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
                        className="w-full flex-1 items-center justify-center relative mr-2"
                        onPress={() => onItemPress?.(item, index)}
                        activeOpacity={0.8}
                    >
                        <View className="w-full h-64 rounded-lg overflow-hidden shadow-md relative">
                            <Image
                                source={item.url}
                                className="w-full h-full"
                                style={{ width: screenWidth - 40, height: 260 }}
                                contentFit="cover"
                            />
                            <View className="absolute top-2 left-2">
                                {badge}
                            </View>
                            {showIndicators && (
                                <View className="absolute bottom-4 right-4 bg-gray-500 rounded-lg px-3 py-1 flex-row items-center">
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