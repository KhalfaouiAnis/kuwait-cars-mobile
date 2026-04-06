import Container from "@/core/components/ui/container";
import BackArrow from "@/core/components/ui/shared/back-arrow";
import { AD_FILTER_OPTIONS_CONFIG, AdTypeField, FilterField } from "@/core/configuration/filters";
import { DIMENSIONS } from "@/core/constants";
import { Ad_CATEGORIES } from "@/core/constants/ad";
import { useAdsQuery } from "@/core/services/ads/ad.queries";
import useUserPreferencesStore from "@/core/store/preferences.store";
import useSearchStore, { MultiFilterKeys } from "@/core/store/search.store";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Reset from "../reset";
import FilterController from "./filter-controller";
import RedDot from "./red-dot";

export default function MainSearch() {
    const { ad_type } = useSearchStore(state => state.appliedFilters)
    const { setExternalFilter, resetAll, } = useSearchStore();
    const [isExpanded, setIsExpanded] = useState(false);
    const { isRTL } = useUserPreferencesStore();
    const { data, isLoading } = useAdsQuery();
    const { t } = useTranslation("common");

    const activeFields = useMemo(() => {
        return Object.keys(AD_FILTER_OPTIONS_CONFIG[ad_type as AdTypeField] || AD_FILTER_OPTIONS_CONFIG["common"]);
    }, [ad_type]);

    const FILTER_DATA = useMemo(() => (Object.keys(AD_FILTER_OPTIONS_CONFIG["used_cars"])).filter(item => activeFields.includes(item))
        , [activeFields])

    const visibleFilters = isExpanded ? FILTER_DATA : FILTER_DATA.slice(0, 5);

    const config = Object.keys(AD_FILTER_OPTIONS_CONFIG).includes(ad_type + "")
        ? AD_FILTER_OPTIONS_CONFIG[ad_type as AdTypeField]
        : AD_FILTER_OPTIONS_CONFIG["common"];

    useEffect(() => {
        if (!ad_type) {
            setExternalFilter("ad_type", "used_cars")
        }
    }, [ad_type, setExternalFilter])

    return (
        <Container>
            <View className="flex-row gap-2 mt-3 ms-4 items-center">
                <BackArrow ignoreRTL />
                <FlatList
                    horizontal
                    data={Ad_CATEGORIES}
                    keyExtractor={(item) => item}
                    contentContainerClassName="gap-3"
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View key={item} className="flex-row items-center gap-1">
                            {ad_type === item && <RedDot />}
                            <Pressable
                                onPress={() => setExternalFilter("ad_type", item)}
                                className={`items-center ${ad_type === item ? "border-b-2 border-blue" : "border-b border-gray-100"}`}
                            >
                                <Text className="text-center text-black dark:text-white">
                                    {t(`adCategories.${item}`)}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                />
                <Reset reset={resetAll} />
            </View>
            <View className="p-2 mx-1 flex-1 items-center">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ direction: isRTL ? "rtl" : "ltr" }}
                    contentContainerClassName="gap-6 items-center p-4 pb-20"
                >
                    {ad_type && visibleFilters.map((field) => (
                        <FilterController
                            key={`${ad_type}_${field}`}
                            filterKey={field as MultiFilterKeys}
                            config={config[field as FilterField]}
                            label={t(config[field as FilterField]?.label)}
                        />
                    ))}
                    {FILTER_DATA.length > 5 && (
                        <TouchableOpacity
                            onPress={() => setIsExpanded(prev => !prev)}
                            className="bg-[#D9D9D9] flex-row justify-center rounded-[20px] items-center pe-8 mt-0"
                            style={{
                                height: 47.25,
                                width: DIMENSIONS.width - 80,
                                boxShadow: boxShadow().button.boxShadow,
                            }}
                        >
                            <Text className="text-center font-inter flex-1 text-orange">
                                Show {isExpanded ? "less" : "more"} filters
                            </Text>
                            <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} />
                        </TouchableOpacity>
                    )}
                </ScrollView>
                <Link asChild href="/search/search-result">
                    <Pressable
                        className="bg-primary-500 flex-row justify-center rounded-[20px] items-center gap-4 mt-auto mb-safe-offset-0"
                        style={{
                            boxShadow: boxShadow(4, 6, 20).button.boxShadow,
                            marginTop: isExpanded ? 6 : 40,
                            width: 250,
                            height: 50,
                        }}
                    >
                        <Ionicons name="search-outline" size={20} />
                        <Text className="text-center font-inter">
                            {
                                isLoading ?
                                    <ActivityIndicator size="small" />
                                    : t(`advancedSearch.offersFound`, { OffersCount: data?.pages?.[0]?.meta?.totalCount })
                            }
                            {/* show  offers  1234 */}
                        </Text>
                    </Pressable>
                </Link>
            </View>
        </Container>
    )
}