import { AdsListing } from "@/core/components/layout/ads/ad-listing";
import renderBrandFilters from "@/core/components/layout/ads/filters/brand/brand-filter";
import FilteringModal from "@/core/components/layout/ads/filters/filtering-modal";
import renderModelFilters from "@/core/components/layout/ads/filters/model-filter";
import renderPriceFilters from "@/core/components/layout/ads/filters/price-filter";
import renderYearFilters from "@/core/components/layout/ads/filters/year-filter";
import renderSortingContent from "@/core/components/layout/ads/sorting/sorting";
import SortingModal from "@/core/components/layout/ads/sorting/sorting-modal";
import MainHeader from "@/core/components/layout/header/main-header";
import Container from "@/core/components/ui/container";
import useUserPreferencesStore from "@/core/lib/stores/preferences.store";
import { FilterAdsBy } from "@/core/types";
import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const FILTERS: { label: string, value: FilterAdsBy }[] = [
    { label: "Brand", value: "brand" }, { label: "Model", value: "model" }, { label: "Year", value: "year" }, { label: "Price", value: "price" }
]

export default function UsedCarsCategoryScreen() {
    const [activeFilter, setActiveFilter] = useState<FilterAdsBy | null>(null);
    const { theme } = useUserPreferencesStore()
    const isDark = theme !== "light"
    const [displaySortingModal, setDisplaySortingModal] = useState(false)
    const [view, setView] = useState<"vertical" | "horizontal">('vertical');

    const openFilterModal = (filterType: typeof activeFilter) => setActiveFilter(filterType);
    const closeFilterModal = () => setActiveFilter(null);

    const renderMap: Record<string, (selectedValues: (string | number)[], onToggle: (value: string | number) => void) => React.ReactNode> =
        { brand: renderBrandFilters, model: renderModelFilters, year: renderYearFilters, price: renderPriceFilters };

    return (
        <Container header={
            <View className="flex mb-2 mt-4 pl-2">
                <MainHeader back={true} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        FILTERS.map(filter => (
                            <Pressable key={filter.value} onPress={() => openFilterModal(filter.value)}>
                                <View className="ml-2 border border-[#EFEFEF] p-2 rounded-lg flex-row items-center dark:bg-darkish">
                                    <Text className="mr-2 text-black dark:text-white">{filter.label}</Text>
                                    <Ionicons name="chevron-down" size={16} color={isDark ? "white" : "black"} style={{ fontWeight: "bold" }} />
                                </View>
                            </Pressable>
                        ))
                    }
                </ScrollView>
            </View>
        }>
            <View className="w-full pl-4 relative flex-1">
                <View className="flex-row items-center gap-x-2 mb-4">
                    <TouchableOpacity className="border border-[#EFEFEF] p-2 rounded-lg flex-row items-center gap-x-2 dark:bg-darkish"
                        onPress={() => setView(prevState => prevState === "horizontal" ? "vertical" : "horizontal")}>
                        <Fontisto name="nav-icon-list-a" size={16} color={isDark ? "white" : "black"} />
                        <Text className="text-black dark:text-white">change view</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border border-[#EFEFEF] p-2 rounded-lg flex-row items-center gap-x-2 dark:bg-darkish"
                        onPress={() => setDisplaySortingModal(true)}>
                        <MaterialCommunityIcons name="sort" size={18} color={isDark ? "white" : "black"} />
                        <Text className="text-black dark:text-white">sort by</Text>
                    </TouchableOpacity>
                    <Text className="text-black dark:text-white ms-auto me-3">Used Cars</Text>
                </View>
                <AdsListing
                    view={view}
                    isDark={isDark}
                />
                <Link href="/create/used_cars" className="absolute right-5 bottom-3 z-20 p-2 rounded-full bg-primary-500">
                    <Ionicons name="add" size={38} />
                </Link>
            </View>
            {activeFilter && (
                <FilteringModal
                    visible={!!activeFilter}
                    onClose={closeFilterModal}
                    filterType={activeFilter}
                    renderFilter={renderMap[activeFilter]}
                />
            )}
            {displaySortingModal && <SortingModal
                visible={displaySortingModal}
                onClose={() => setDisplaySortingModal(false)}
                renderFilter={renderSortingContent}
            />}
        </Container>
    )
}