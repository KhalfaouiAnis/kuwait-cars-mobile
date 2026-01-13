import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';

const ITEM_SIZE = Dimensions.get('window').width / 2;

export default function AdSpecifications({ children }: { children: any }) {
    const scrollRef = useRef<ScrollView>(null);
    const scrollPos = useRef(0);

    const scrollNext = () => {
        scrollPos.current += ITEM_SIZE;
        scrollRef.current?.scrollTo({
            x: scrollPos.current,
            animated: true,
        });
    };

    return (
        <View className='flex-row items-center gap-3' style={{ direction: "ltr" }}>
            <ScrollView
                horizontal
                ref={scrollRef}
                pagingEnabled
                snapToInterval={ITEM_SIZE}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                    scrollPos.current = e.nativeEvent.contentOffset.x;
                }}
                contentContainerClassName='gap-3'
            >
                {children}
            </ScrollView>
            <TouchableOpacity onPress={scrollNext} className='h-14 w-10 items-center justify-center bg-primary-500 rounded-lg'>
                <Ionicons name='chevron-forward' size={20} />
            </TouchableOpacity>
        </View>
    );
}