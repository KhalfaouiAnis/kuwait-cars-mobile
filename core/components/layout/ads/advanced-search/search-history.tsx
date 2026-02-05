import Container from "@/core/components/ui/container";
import BackArrow from "@/core/components/ui/shared/back-arrow";
import { DIMENSIONS } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { useAdsQuery } from "@/core/services/ads/ad.queries";
import useUserPreferencesStore from "@/core/store/preferences.store";
import useSearchStore from "@/core/store/search.store";
import { AdvertisementInterface } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo } from "react";
import { FlatList, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft, FadeInRight, FadeOut } from 'react-native-reanimated';
import Reset from "../reset";

interface Props {
    onNewSearch: () => void
}

export default function SearchHistory({ onNewSearch }: Props) {
    const { isRTL } = useUserPreferencesStore();
    const { clearHistory } = useSearchStore();
    const { data } = useAdsQuery();

    const ads = useMemo(
        () => data?.pages.flatMap((page) => page.data.sort((ad1, ad2) => ad2.plan.price - ad1.plan.price)) ?? [],
        [data?.pages],
    );

    const renderItem = useCallback(({ item, index }: { item: AdvertisementInterface, index: number }) => {
        const path: any = `/categories/${item.ad_type}/${item.ad_category ? `${item.ad_category}/${item.id}` : `${item.id}`}`;
        const Fade = isRTL ? FadeInRight.delay(index * 100).duration(500) : FadeInLeft.delay(index * 100).duration(500)

        return (
            <Animated.View
                entering={Fade}
                exiting={FadeOut}
            >
                <Pressable
                    style={{
                        borderRadius: 20, width: 120, height: 180,
                        boxShadow: boxShadow(4, 6, 20).button.boxShadow,
                    }}
                    onPress={() => router.push(path)}
                    className="items-center justify-between pt-1 pb-6"
                >
                    <Image
                        contentFit="cover"
                        style={{ width: 110, height: 120, borderRadius: 20 }}
                        source={item?.media?.[0] ? { uri: item.media[0].transformed_url } : IMAGES.CarHyunday}
                    />
                    <Text numberOfLines={1} ellipsizeMode="tail" className="font-inter text-sm px-1">{item?.title}</Text>
                </Pressable>
            </Animated.View>
        )
    }, [isRTL]);

    const keyExtractor = useCallback((item: AdvertisementInterface) => item.id.toString(), []);

    const handleLoadHistory = () => {

    };

    useFocusEffect(
        useCallback(handleLoadHistory, [])
    )

    return (
        <Container>
            <View className="flex-row justify-between gap-2 mt-3 ms-4 me-4 items-center">
                <BackArrow />
                <Text className="text-center text-lg font-inter-medium">Saved searches</Text>
                <Reset reset={clearHistory} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ direction: isRTL ? "rtl" : "ltr" }}
                contentContainerStyle={{ paddingBottom: 120, paddingTop: 20 }}
            >
                <View className="gap-4 mx-8">
                    <View className="flex-row items-center gap-2 ms-4">
                        <Ionicons name="search-outline" color="#A8A8A8" size={20} />
                        <Text className="text-grayish">Recent search</Text>
                    </View>
                    <View
                        style={{
                            boxShadow: boxShadow().button.boxShadow, borderRadius: 20, borderWidth: 0.5, borderColor: "#A8A8A8",
                            width: DIMENSIONS.width - 80, height: 160
                        }}
                        className="self-center justify-end gap-6 p-6">
                        <View className="flex-row items-center gap-6">
                            <Ionicons name="car-sport-outline" size={20} />
                            <Text className="text-center">used car</Text>
                        </View>
                        <View className="flex-row items-center gap-6">
                            <Ionicons name="car-sport-outline" size={20} />
                            <Text className="text-center">mercedes-bens</Text>
                        </View>
                        <Text className="text-center text-grayish">searching again</Text>
                    </View>
                </View>
                <Text className="text-grayish ms-12 mt-12">Highlighted ads</Text>
                <FlatList
                    data={ads}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={{ gap: 20, paddingHorizontal: 20, flexDirection: isRTL ? 'row-reverse' : "row" }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName=" py-6"
                />
                <TouchableOpacity
                    onPress={onNewSearch}
                    className="bg-primary-500 flex-row justify-center self-center rounded-[22px] items-center gap-4 mt-6"
                    style={{
                        boxShadow: boxShadow(4, 6, 20).button.boxShadow,
                        width: 250,
                        height: 55,
                    }}
                >
                    <Ionicons name="search-outline" size={20} />
                    <Text className="text-center font-inter-medium">
                        start searching
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </Container>
    )
}