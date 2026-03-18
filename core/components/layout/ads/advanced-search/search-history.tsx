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
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft, FadeInRight, FadeOut } from 'react-native-reanimated';
import Reset from "../reset";

interface Props {
    onNewSearch: () => void
}

export default function SearchHistory({ onNewSearch }: Props) {
    const { isRTL } = useUserPreferencesStore();
    const { clearHistory } = useSearchStore();
    const { data, isLoading } = useAdsQuery();
    const { dark } = useTheme()


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
                <Text className="text-center text-lg font-inter-medium dark:text-white">Saved searches</Text>
                <Reset reset={clearHistory} />
            </View>
            <View className="gap-4 mx-8 mt-4">
                <View className="flex-row items-center gap-2">
                    <Ionicons name="search-outline" color={dark ? "white" : "#1F51FF"} size={20} />
                    <Text className="text-blue dark:text-white">Recent search</Text>
                </View>
                <View
                    style={{
                        boxShadow: boxShadow().button.boxShadow, borderRadius: 20, borderWidth: 0.5, borderColor: "#A8A8A8",
                        width: DIMENSIONS.width - 80, height: 160
                    }}
                    className="self-center justify-end gap-5 p-6">
                    <View className="gap-5">
                        <View className="flex-row items-center">
                            <Ionicons name="car-sport-outline" size={20} color={dark ? "white" : "black"} />
                            <Text className="text-center flex-1 font-inter dark:text-white">used car</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Image
                                style={{ height: 20, width: 20, borderRadius: 100 }}
                                source={IMAGES.CarMercedesLogo}
                                contentFit="contain"
                            />
                            <Text className="text-center flex-1 font-inter dark:text-white">mercedes-bens</Text>
                        </View>
                    </View>
                    <Text className="text-center text-orange font-inter">searching again</Text>
                </View>
            </View>
            <Text className="text-blue ms-6 mt-12 dark:text-white">Highlighted ads</Text>
            {
                isLoading ? <ActivityIndicator size="large" color="#FFF12E" /> : (
                    <FlatList
                        data={ads}
                        horizontal
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={{ gap: 20, paddingHorizontal: 10, flexDirection: isRTL ? 'row-reverse' : "row" }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerClassName="py-6"
                    />
                )
            }
            <TouchableOpacity
                onPress={onNewSearch}
                className="bg-primary-500 flex-row justify-center self-center rounded-[22px] items-center gap-4 mt-auto mb-safe-offset-0"
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
        </Container>
    )
}