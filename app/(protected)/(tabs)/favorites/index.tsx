import Advertisement from "@/core/components/layout/ads/advertisement";
import MainHeader from "@/core/components/layout/header/main-header";
import { AdSkeletonList } from "@/core/components/layout/skeletons/ad-skeleton-list";
import Container from "@/core/components/ui/container";
import { EmptyState } from "@/core/components/ui/shared/empty-state";
import { useMyFavoritedAdsQuery } from "@/core/services/ads/ad.queries";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from 'react-native';

export default function FavoritesScreen() {
    const { t } = useTranslation("common")
    const { data, isLoading } = useMyFavoritedAdsQuery();

    return (
        <Container header={<MainHeader drawer back={false} />}>
            <View className="w-full mt-6">
                <View className="flex-row items-center justify-center mb-6">
                    <Text className="font-inter-bold text-center text-3xl text-black dark:text-white">{t("profile.myFavories")}</Text>
                </View>
                {
                    isLoading ? <AdSkeletonList /> : (
                        <FlatList
                            data={data}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <View className="mb-2 me-1">
                                <Advertisement data={item} view="vertical" />
                            </View>}
                            contentContainerStyle={{ paddingBottom: 180 }}
                            showsVerticalScrollIndicator={false}
                            removeClippedSubviews={false}
                            ListEmptyComponent={!isLoading ? <EmptyState showReset={false} title="" description="noFavoritedAds" /> : null}
                        />
                    )
                }
            </View>
        </Container>
    )
}