import Ad from "@/core/components/layout/ads/Ad";
import renderBrandFilters from "@/core/components/layout/ads/filters/brand/brand-filter";
import FilteringModal from "@/core/components/layout/ads/filters/filtering-modal";
import renderPriceFilters from "@/core/components/layout/ads/filters/price-filter";
import renderYearFilters from "@/core/components/layout/ads/filters/year-filter";
import renderSortingContent from "@/core/components/layout/ads/sorting/sorting";
import SortingModal from "@/core/components/layout/ads/sorting/sorting-modal";
import MainHeader from "@/core/components/layout/header/main-header";
import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { FilterAdsBy } from "@/core/types";
import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const FILTERS: { label: string, value: FilterAdsBy }[] = [{ label: "Brand", value: "brand" }, { label: "Year", value: "year" }, { label: "Price", value: "price" }]

const listings = [
    {
        id: "listing-1",
        images: [
            { url: IMAGES.CarChevrolet },
            { url: IMAGES.CarHyunday },
            { url: IMAGES.CarMercedes },
            { url: IMAGES.CarToyota },
        ],
        badge: "Super DEAL",
        name: "Chevrolet corvette",
        datePosted: "2015",
        price: "$525000",
        description: "Great deal on my car",
        mielage: "km 192.354",
        location: "kuwait",
        distanceFromMyLocation: "3km",
        engine: "Petrol- 10",
        gearType: "Manual"
    },
    {
        id: "listing-2",
        images: [
            { url: IMAGES.CarHyunday },
            { url: IMAGES.CarChevrolet },
            { url: IMAGES.CarMercedes },
            { url: IMAGES.CarToyota },
        ],
        badge: "Super DEAL 2",
        name: "Hundai",
        datePosted: "2018",
        price: "$625000",
        description: "Great deal on my hundai car",
        mielage: "km 82.354",
        location: "kuwait",
        distanceFromMyLocation: "1km",
        engine: "Petrol- 1.2",
        gearType: "Automatic"
    },
    {
        id: "listing-3",
        images: [
            { url: IMAGES.CarMercedes },
            { url: IMAGES.CarHyunday },
            { url: IMAGES.CarChevrolet },
            { url: IMAGES.CarToyota },
        ],
        badge: "Super DEAL 3",
        name: "Mercedes",
        datePosted: "2018",
        price: "$1625000",
        description: "Great deal on my Mercedes car",
        mielage: "km 80.054",
        location: "kuwait",
        distanceFromMyLocation: "12km",
        engine: "Petrol- 1.8",
        gearType: "Automatic"
    },
]

export default function ModelsByCategoryScreen() {
    const [activeFilter, setActiveFilter] = useState<FilterAdsBy | null>(null);
    const [displaySortingModal, setDisplaySortingModal] = useState(false)
    const [view, setView] = useState<"vertical" | "horizontal">('vertical');

    const openFilterModal = (filterType: typeof activeFilter) => setActiveFilter(filterType);
    const closeFilterModal = () => setActiveFilter(null);

    const renderMap: Record<string, (selectedValues: (string | number)[], onToggle: (value: string | number) => void) => React.ReactNode> =
        { brand: renderBrandFilters, year: renderYearFilters, price: renderPriceFilters };

    return (
        <Container header={
            <View className="flex mb-4 mt-4 pl-2">
                <MainHeader back={true} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        FILTERS.map(filter => (
                            <Pressable key={filter.value} onPress={() => openFilterModal(filter.value)}>
                                <View className="ml-2 border border-[#EFEFEF] p-2 rounded-lg flex-row items-center">
                                    <Text className="mr-2">{filter.label}</Text>
                                    <Ionicons name="chevron-down" size={16} style={{ fontWeight: "bold" }} />
                                </View>
                            </Pressable>
                        ))
                    }
                </ScrollView>
            </View>
        }>
            <View className="w-full pl-4 relative flex-1">
                <View className="flex-row items-center gap-x-2 mb-4">
                    <TouchableOpacity className="border border-[#EFEFEF] p-2 rounded-lg flex-row items-center gap-x-2"
                        onPress={() => setView(prevState => prevState === "horizontal" ? "vertical" : "horizontal")}>
                        <Fontisto name="nav-icon-list-a" size={16} color="black" />
                        <Text>change view</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border border-[#EFEFEF] p-2 rounded-lg flex-row items-center gap-x-2"
                        onPress={() => setDisplaySortingModal(true)}>
                        <MaterialCommunityIcons name="sort" size={18} color="black" />
                        <Text>sort by</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={listings}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <View className="mb-2 me-1"><Ad data={item} view={view} /></View>}
                    contentContainerStyle={{ paddingBottom: 60, position: "relative", zIndex: 2 }}
                    showsVerticalScrollIndicator={false}
                    className="bg-transparent me-2"
                    removeClippedSubviews={false}
                />
                <Link href="/create/motorcycles" className="absolute right-5 bottom-3 z-20 p-2 rounded-full bg-primary-500">
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