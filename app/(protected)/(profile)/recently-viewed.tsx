import ProfileHeader from "@/core/components/layout/header/profile-header";
import { AdSkeletonList } from "@/core/components/layout/skeletons/ad-skeleton-list";
import { FavoriteButton } from "@/core/components/ui/button/favorite-button";
import Container from "@/core/components/ui/container";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { useToggleFavorite } from "@/core/services/ads/ad.mutations";
import { useRecentlyViewedQuery } from "@/core/services/ads/ad.queries";
import { currentLang } from "@/core/store/preferences.store";
import { formatPassedTime } from "@/core/utils/date";
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from "react-native";

export default function RecentlyViewedAdsScreen() {
    const { protectAction } = useAuthGuard();
    const { mutate } = useToggleFavorite();
    const { data, isLoading } = useRecentlyViewedQuery()
    const { t } = useTranslation("profile");

    const locale = currentLang()

    if (isLoading) return <AdSkeletonList />

    return (
        <Container
            header={<ProfileHeader title={t("recentlyViewed")} />}>
            <View className="w-full px-2 mt-12">
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View className="mb-2 border border-primary-500 rounded-lg p-1 flex-row dark:bg-darkish">
                            <View className="w-[160px] h-[130px] items-center justify-center rounded-lg">
                                <LinearGradient
                                    className="w-[150px] h-[110px] justify-center items-center rounded-lg"
                                    colors={['#FAED02', 'transparent']}
                                    start={{ x: 0.5, y: 1 }}
                                    end={{ x: 0.5, y: 0 }}
                                >
                                    <Image
                                        source={{ uri: item.media[0].transformed_url }}
                                        contentFit="fill"
                                        style={{ width: 140, height: 100, borderRadius: 8 }} />
                                </LinearGradient>
                            </View>
                            <View className="flex-1 flex mt-4 py-4">
                                <View className="flex-row items-center justify-between px-1">
                                    <Text className="font-semibold dark:text-white">{item.title}</Text>
                                    <View style={{ direction: "rtl" }}>
                                        <Text className="font-semibold text-start text-black dark:text-white">${item.price}</Text>
                                    </View>
                                </View>
                                <View className="mt-1">
                                    <Text className="font-inter text-sm dark:text-white">{item.description}</Text>
                                </View>
                                <View className="flex-1 flex-row items-center justify-between px-1 mt-4">
                                    <Text className="text-gray-400 text-xs">{formatPassedTime(new Date().toDateString(), locale) || "viewed 12 minutes ago"}</Text>
                                    <FavoriteButton isFavorite={item?.is_favorited || false} onPress={() => protectAction(() => mutate(item.id))} />
                                </View>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={false}
                />
            </View>
        </Container>
    )
}
