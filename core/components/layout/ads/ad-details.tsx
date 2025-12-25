import Container from "@/core/components/ui/container";
import BackArrow from "@/core/components/ui/shared/back-arrow";
import { IMAGES } from "@/core/constants/images";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { useToggleFavorite } from "@/core/services/ads/ad.mutations";
import { useAdDetailQuery } from "@/core/services/ads/ad.queries";
import useRecentlyViewedStore from "@/core/store/recently-viewed-ad.store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View } from 'react-native';
import { AdCardSkeleton } from "../skeletons/ad-skeleton-card";

import { FavoriteButton } from "@/core/components/ui/button/favorite-button";
import { FlagButton } from "@/core/components/ui/button/flag-button";
import { ShareButton } from "@/core/components/ui/button/share-button";
import { authStore } from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { formatSmartDate } from "@/core/utils/date";
import { haversineDistance } from "@/core/utils/location";
import { getYear } from "date-fns";
import { useTranslation } from "react-i18next";
import { ChatCTA } from "../communication/ad-cta/chat";
import { ContactCTA } from "../communication/ad-cta/contact";
import { WhatsappCTA } from "../communication/ad-cta/whatsapp";

export default function AdDetails() {
    const { t } = useTranslation("listings")
    const { ad_id } = useLocalSearchParams<{ ad_id: string }>();
    const addView = useRecentlyViewedStore((state) => state.addView);
    const { isRTL, theme } = useUserPreferencesStore()
    const { protectAction } = useAuthGuard();
    const { mutate } = useToggleFavorite();
    const { data: adDetail, isLoading, error } = useAdDetailQuery(ad_id);
    const user = authStore?.getState()?.user

    const isDark = theme !== "light"

    useEffect(() => {
        if (ad_id) {
            addView(ad_id);
        }
    }, [ad_id, addView]);

    if (error) return null;

    const thumbnail = adDetail?.media.find(pic => pic.media_type === "THUMBNAIL")?.transformed_url
    const images = adDetail!.media.filter(pic => pic.media_type === "IMAGE");

    return (
        <Container scrollable header={
            <View style={{ direction: isRTL ? "rtl" : "ltr" }} className="flex-row items-center justify-between mb-2 mt-4 px-4">
                <BackArrow />
                <View className="flex-row items-center gap-x-3">
                    <FlagButton onPress={() => { }} isFlagged={adDetail!.is_flagged || false} />
                    <ShareButton onPress={() => { }} />
                    <FavoriteButton isFavorite={adDetail!.is_favorited || false} onPress={() => protectAction(() => mutate(adDetail!.id))} />
                </View>
            </View>
        }>
            {
                isLoading ? <AdCardSkeleton /> : (
                    <View className="flex-1 p-1" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                        <View>
                            <Image source={{ uri: thumbnail }} style={{ height: 260, objectFit: "cover", borderRadius: 8 }} />
                            <View className="w-full rounded-lg flex-row gap-x-2 items-center justify-center mt-[2px] py-2">
                                {
                                    images.slice(0, 2).map((image, index) => (
                                        <View key={index} className="p-2 rounded-lg bg-white dark:bg-darkish border border-primary-500">
                                            <Image source={{ uri: image.transformed_url }} style={{ height: 70, width: 90, objectFit: "cover", borderRadius: 8 }} />
                                        </View>
                                    ))
                                }
                            </View>
                            <View className="px-4">
                                <View className="gap-y-2 py-1">
                                    <Text className="font-inter-semibold dark:text-white">{adDetail!.title}</Text>
                                    <View className="flex-row items-center justify-between">
                                        <Text className="font-inter-medium text-lg dark:text-white">{adDetail!.model}</Text>
                                        <Text className="font-inter-semibold text-lg dark:text-white">${adDetail!.price}</Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Ionicons name="location-outline" size={22} color={isDark ? "white" : "black"} />
                                        <Text className="font-inter text-base dark:text-white">
                                            {adDetail!.area ? adDetail!.area.area : adDetail!.province.province}
                                        </Text>
                                        <Text className="font-inter text-gray-400 ms-1">
                                            {haversineDistance(user?.province.latitude, user?.province.longitude, adDetail?.province.latitude, adDetail?.province.longitude)}km
                                        </Text>
                                    </View>
                                </View>
                                <View className="border-y border-gray-200 gap-y-2 py-3">
                                    <View className="flex-row items-center justify-between">
                                        <Text className="font-inter-bold dark:text-white">{t("specification")}</Text>
                                        <Text className="font-inter text-xs text-gray-400">{formatSmartDate(adDetail!.created_at)}</Text>
                                    </View>
                                    <View className="flex-row items-center justify-center gap-x-3">
                                        <View className="border border-primary-500 rounded-md items-center justify-center py-1 px-4 ">
                                            <Text className="font-inter-semibold dark:text-white">{adDetail!.year}</Text>
                                            <Text className="dark:text-white">{t("year")}</Text>
                                        </View>
                                        <View className="border border-primary-500 rounded-md items-center justify-center py-1 px-4 ">
                                            <Text className="font-inter-semibold dark:text-white">{t(`unit.${adDetail!.mileage_unit}`)}</Text>
                                            <Text className="text-sm text-gray-400">{adDetail!.mileage}</Text>
                                        </View>
                                        <View className="border border-primary-500 rounded-md items-center justify-center py-1 px-4 ">
                                            <Text className="font-inter-semibold dark:text-white">{t(adDetail!.transmission || "Auto")}</Text>
                                            <Text className="dark:text-white">{t("transmission")}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View className="gap-y-1 py-3">
                                    <Text className="font-inter-bold dark:text-white">{t("description")}</Text>
                                    <Text numberOfLines={3} className="font-inter font-light text-start dark:text-gray-200">
                                        {adDetail!.description}
                                    </Text>
                                </View>
                                <View>
                                    <View className="flex-row items-center border border-primary-500 rounded-lg p-2 gap-x-2">
                                        <Image
                                            contentFit="cover"
                                            source={{ uri: adDetail!.user?.avatar?.original_url }}
                                            style={{ borderRadius: 50, width: 40, height: 40 }} />
                                        <View>
                                            <Text className="font-inter-semibold dark:text-white">{adDetail!.user?.fullname}</Text>
                                            <Text className="dark:text-white">{t("since")} {adDetail!.user?.created_at && getYear(adDetail!.user.created_at)}</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center justify-center gap-x-6 mt-3">
                                        <ChatCTA label={t("chatCall")} />
                                        <WhatsappCTA label={t("whatsApp")} />
                                        <ContactCTA label={t("contact")} />
                                    </View>
                                </View>
                                <View className="gap-y-1 mt-2 mb-4">
                                    <Text className="font-inter-semibold">{t("similarAds")}</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <View className="bg-white rounded-xl py-1 px-2 flex-row gap-x-2 items-center border border-transparent dark:border-primary-500 dark:bg-darkish me-4">
                                            <Image source={IMAGES.CarChevrolet} style={{ height: 80, width: 130, borderRadius: 8 }} contentFit="cover" />
                                            <View className="gap-y-5">
                                                <Text className="font-inter-medium max-w-36 dark:text-white" numberOfLines={2}>Mercedes Benz C-Class - 2023</Text>
                                                <View className="flex-row items-center justify-end">
                                                    <Text className="me-10 font-inter-medium dark:text-white">$52500</Text>
                                                    <FavoriteButton isFavorite={adDetail?.is_favorited || false} onPress={() => { }} />
                                                </View>
                                            </View>
                                        </View>
                                        <View className="bg-white rounded-xl py-1 px-2 flex-row gap-x-2 items-center border border-transparent dark:border-primary-500 dark:bg-darkish me-4">
                                            <Image source={IMAGES.CarChevrolet} style={{ height: 80, width: 130, borderRadius: 8 }} contentFit="cover" />
                                            <View className="gap-y-5">
                                                <Text className="font-inter-medium max-w-36 dark:text-white" numberOfLines={2}>Chevrolet Corvette - 2023</Text>
                                                <View className="flex-row items-center justify-end">
                                                    <Text className="me-10 font-inter-medium dark:text-white">$52500</Text>
                                                    <FavoriteButton isFavorite={adDetail?.is_favorited || false} onPress={() => { }} />
                                                </View>
                                            </View>
                                        </View>
                                        <View className="bg-white rounded-xl py-1 px-2 flex-row gap-x-2 items-center border border-transparent dark:border-primary-500 dark:bg-darkish me-4">
                                            <Image source={IMAGES.CarChevrolet} style={{ height: 80, width: 130, borderRadius: 8 }} contentFit="cover" />
                                            <View className="gap-y-5">
                                                <Text className="font-inter-medium max-w-36 dark:text-white" numberOfLines={2}>Toyota - 2021</Text>
                                                <View className="flex-row items-center justify-end">
                                                    <Text className="me-10 font-inter-medium dark:text-white">$52500</Text>
                                                    <FavoriteButton isFavorite={adDetail?.is_favorited || false} onPress={() => { }} />
                                                </View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
        </Container>
    )
}