import { AdsListing } from "@/core/components/layout/ads/ad-listing";
import { MainFilters } from "@/core/components/layout/ads/filters/main-filters";
import MainHeader from "@/core/components/layout/header/main-header";
import Container from "@/core/components/ui/container";
import { AD_TYPES, MOTORCYCLES_FILTER_CONFIG } from "@/core/constants/ad";
import useUserPreferencesStore from "@/core/store/preferences.store";
import useSearchStore from "@/core/store/search.store";
import { Ionicons } from "@expo/vector-icons";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { View } from 'react-native';

export default function HomeServicesCategoryScreen() {
    const {setExternalFilter, resetAll } = useSearchStore(state => state)
    const { theme } = useUserPreferencesStore()
    const isDark = theme !== "light"
    const [view, setView] = useState<"vertical" | "horizontal">('vertical');
    const { ad_category } = useLocalSearchParams<{ ad_category: string }>()

    useFocusEffect(
        useCallback(() => {
            setExternalFilter("ad_type", AD_TYPES.home_services)
            setExternalFilter("ad_category", ad_category)
            return resetAll
        }, [setExternalFilter, resetAll, ad_category])
    );

    return (
        <Container header={
            <View className="flex mb-2 mt-4 pl-0.5">
                <MainHeader back={true} />
                <MainFilters isDark={isDark} setView={setView} filterConfig={MOTORCYCLES_FILTER_CONFIG} />
            </View>
        }>
            <View className="w-full pl-2.5 relative flex-1">
                <AdsListing
                    view={view}
                    isDark={isDark}
                />
                <Link href="/create/used_cars" className="absolute right-5 bottom-3 z-20 p-2 rounded-full bg-primary-500">
                    <Ionicons name="add" size={38} />
                </Link>
            </View>
        </Container>
    )
}