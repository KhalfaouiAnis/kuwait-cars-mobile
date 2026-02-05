import Container from "@/core/components/ui/container";
import AppModal from "@/core/components/ui/dialog/modal";
import BackArrow from "@/core/components/ui/shared/back-arrow";
import { Ad_CATEGORIES } from "@/core/constants/ad";
import { useUsedCarsFilterConfig } from "@/core/hooks/ad/useFilterConfig";
import { useAdsQuery } from "@/core/services/ads/ad.queries";
import useUserPreferencesStore from "@/core/store/preferences.store";
import useSearchStore, { CombinedFilterKeys } from "@/core/store/search.store";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SmartFilterContent } from "../filters/filter-content";
import { PriceFilterContent } from "../filters/price-filter";
import Reset from "../reset";
import SearchItem from "./search-item";

export default function MainSearch() {
    const {
        appliedFilters: { ad_type },
        syncDraftToApplied,
        setExternalFilter,
        resetDraftFilter,
        applyFilters,
        resetAll,
    } = useSearchStore();
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const {
        data,
        isLoading
    } = useAdsQuery();
    const filterConfig = useUsedCarsFilterConfig();
    const [isExpanded, setIsExpanded] = useState(false);
    const { theme, isRTL } = useUserPreferencesStore();
    const { t } = useTranslation("common");
    const isDark = theme !== "light";

    const scrollRef = useRef<ScrollView>(null);
    const itemLayouts = useRef<Map<string, number>>(new Map());

    const FILTER_DATA = useMemo(() => [
        { id: "0", key: "brand", label: t(`advancedSearch.brand_model`), icon: { family: 'Ionicons', name: "car-sport" } },
        { id: "1", key: "model", label: t(`advancedSearch.model`), icon: { family: 'Ionicons', name: "calendar" } },
        { id: "2", key: "price", label: t(`advancedSearch.budget`), icon: { family: 'AntDesign', name: "dollar" } },
        { id: "3", key: "year", label: t(`advancedSearch.year`), icon: { family: 'Octicons', name: "calendar" } },
        { id: "4", key: "location", label: t(`advancedSearch.location`), icon: { family: 'Octicons', name: "location" } },
        { id: "5", key: "mileage", label: t(`advancedSearch.kms_driven`), icon: { family: 'MaterialCommunityIcons', name: "signal-distance-variant" } },
        { id: "6", key: "exterior_color", label: t(`advancedSearch.color`), icon: { family: 'Ionicons', name: "color-palette-outline" } },
    ], [t])

    const visibleFilters = isExpanded ? FILTER_DATA : FILTER_DATA.slice(0, 5);

    const handleOpen = (key: string) => {
        syncDraftToApplied();
        setActiveKey(key);
    };

    return (
        <Container>
            <View className="flex-row gap-2 mt-3 ms-4 items-center">
                <BackArrow />
                <ScrollView
                    horizontal
                    ref={scrollRef}
                    contentContainerClassName="gap-3"
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        Ad_CATEGORIES.map((category) => (
                            <Pressable
                                key={category}
                                onPress={() => setExternalFilter("ad_type", category)}
                                onLayout={(event) => {
                                    itemLayouts.current.set(category, event.nativeEvent.layout.x);
                                }}
                                className={`border-b  items-center ${ad_type === category ? "border-black" : "border-gray-100"}`}
                            >
                                <Text className="text-center text-black dark:text-white">
                                    {t(`adCategories.${category}`)}
                                </Text>
                            </Pressable>
                        ))
                    }
                </ScrollView>
                <Reset reset={resetAll} />
            </View>
            <View className="p-2 mx-1 flex-1 items-center">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="gap-6 items-center p-4 pb-20"
                    style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                    {visibleFilters.map(item => (
                        <SearchItem
                            key={item.id}
                            isRTL={isRTL}
                            isDark={isDark}
                            label={item.label}
                            icon={item.icon.name}
                            onPress={() => handleOpen(item.key as any)}
                            family={item.icon.family as "Ionicons" | "AntDesign" | "MaterialCommunityIcons" | "Octicons"}
                        />
                    ))}
                    {
                        FILTER_DATA.length > 5 && (
                            <TouchableOpacity
                                onPress={() => setIsExpanded(prev => !prev)}
                                className="bg-[#D9D9D9] flex-row justify-center rounded-[20px] items-center pe-8 mt-0"
                                style={{
                                    boxShadow: boxShadow().button.boxShadow,
                                    width: 300,
                                    height: 47.25,
                                }}
                            >
                                <Text className="text-center font-inter flex-1">
                                    Show {isExpanded ? "less" : "more"} filters
                                </Text>
                                <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} />
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity
                        className="bg-primary-500 flex-row justify-center rounded-[20px] items-center gap-4"
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
                                isLoading ? <ActivityIndicator size="small" /> : t(`advancedSearch.offersFound`, { OffersCount: data?.pages?.[0]?.meta?.totalCount })
                            }
                            {/* show  offers  1234 */}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <AppModal
                visible={!!activeKey}
                onClose={() => {
                    applyFilters("advanced_search");
                    setActiveKey(null);
                }}
                header={
                    <Reset reset={() => resetDraftFilter(activeKey as CombinedFilterKeys)} />
                }
                renderContent={() => {
                    if (!activeKey) return null;

                    if (activeKey === "price") {
                        return <PriceFilterContent />;
                    }
                    if (activeKey)
                        return (
                            <SmartFilterContent
                                activeKey={activeKey as never}
                                filterConfig={filterConfig}
                            />
                        );
                }}
            />
        </Container>
    )
}