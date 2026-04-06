import AdMediaGalleryComponent from '@/core/components/layout/ads/ad-details/ad-media-gallery';
import { hideSystemBars, showSystemBars } from '@/core/lib/navigation-bar';
import { AdvertisementInterface } from '@/core/types';
import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Dimensions, Pressable, View } from 'react-native';

const { width } = Dimensions.get("screen");

export default function GalleryScreen() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { id, currentIndex } = useLocalSearchParams<{ id: string, currentIndex: string }>();

    const ad = queryClient.getQueryData<AdvertisementInterface>(["ads", "detail", id])

    useEffect(() => {
        hideSystemBars(false)

        return () => {
            showSystemBars()
        }
    }, [])

    if (!ad) return null;

    return (
        <View style={{ width, position: "relative" }}>
            <StatusBar hidden />
            <Pressable
                onPress={() => router.back()}
                style={{ width: 30, height: 30, borderRadius: 5 }}
                className="absolute top-12 start-8 items-center justify-center bg-grayish z-20"
            >
                <Ionicons name="chevron-back-outline" color="white" size={20} />
            </Pressable>
            <AdMediaGalleryComponent ad={ad} currentIndex={Number(currentIndex)} />
        </View>
    );
}