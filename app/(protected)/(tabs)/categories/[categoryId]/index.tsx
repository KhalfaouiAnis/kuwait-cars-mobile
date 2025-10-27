import Ad from "@/core/components/layout/ads/Ad";
import MainHeader from "@/core/components/layout/header/main-header";
import Container from "@/core/components/ui/container";
import SortModal from "@/core/components/ui/menu/filters-modal";
import { images } from "@/core/constants/images";
import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const FILTERS = [
    "category", "brand", "Year of manufacture", "price", "hhh", "fgffg"
]

const listings = [
    {
        id: "listing-1",
        images: [
            { image: images.CarChevrolet },
            { image: images.CarHyunday },
            { image: images.CarMercedes },
            { image: images.CarToyota },
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
            { image: images.CarHyunday },
            { image: images.CarChevrolet },
            { image: images.CarMercedes },
            { image: images.CarToyota },
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
            { image: images.CarMercedes },
            { image: images.CarHyunday },
            { image: images.CarChevrolet },
            { image: images.CarToyota },
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

const getItemLayout = (data: any, index: number) => ({
    length: screenHeight * 0.4 + 16, // Item height + margin
    offset: (screenHeight * 0.4 + 16) * index,
    index,
});

export default function ModelsByCategoryScreen() {
    const [sortBy, setSortBy] = useState('date-desc'); // Initial sort
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Container header={
            <View className="flex mb-4 mt-4 pl-2">
                <MainHeader back={false} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        FILTERS.map(filter => (
                            <View key={filter} className="ml-2 border border-[#EFEFEF] p-2 rounded-lg flex-row items-center">
                                <Text className="mr-2">{filter}</Text>
                                <Ionicons name="chevron-down" size={16} style={{ fontWeight: "bold" }} />
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        }>
            <View className="w-full pl-4">
                <View className="flex-row items-center gap-x-2 mb-4">
                    <TouchableOpacity className="border border-[#EFEFEF] p-2 rounded-lg flex-row items-center gap-x-2">
                        <Fontisto name="nav-icon-list-a" size={16} color="black" />
                        {/* <MaterialCommunityIcons name="view-list-outline" size={16} color="black" /> */}
                        <Text>change view</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border border-[#EFEFEF] p-2 rounded-lg flex-row items-center gap-x-2"
                        onPress={() => setModalVisible(true)}
                    >
                        <MaterialCommunityIcons name="sort" size={18} color="black" />
                        <Text>sort by</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={listings}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <View className="mb-2 me-1"><Ad adData={item} /></View>}
                    contentContainerStyle={{ paddingBottom: 180 }}
                    showsVerticalScrollIndicator={false}
                    className="bg-transparent me-2"
                    getItemLayout={getItemLayout}
                    removeClippedSubviews={false}
                />
            </View>
            <SortModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelect={setSortBy}
                currentSort={sortBy}
            />
        </Container>
    )
}