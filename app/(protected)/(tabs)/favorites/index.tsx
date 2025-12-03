import Ad from "@/core/components/layout/ads/Ad";
import MainHeader from "@/core/components/layout/header/main-header";
import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { FlatList, Text, View } from 'react-native';

export const listings = [
    {
        id: "listing-1",
        images: [
            { url: IMAGES.CarChevrolet },
            { url: IMAGES.CarHyunday },
            { url: IMAGES.CarMercedes },
            { url: IMAGES.CarToyota },
        ],
        badge: "Super DEAL",
        name: "Chevrolet",
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
        description: "Great deal on my car",
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
        description: "Great deal on my car",
        mielage: "km 80.054",
        location: "kuwait",
        distanceFromMyLocation: "12km",
        engine: "Petrol- 1.8",
        gearType: "Automatic"
    },
]

export default function FavoritesScreen() {
    return (
        <Container header={<MainHeader drawer back={false} />}>
            <View className="w-full px-2 mt-6">
                <View className="flex-row items-center justify-center mb-6">
                    <Text className="font-inter-bold text-center text-3xl">My Favorites</Text>
                </View>
                <FlatList
                    data={listings}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <View className="mb-2"><Ad data={item} view="vertical" /></View>}
                    contentContainerStyle={{ paddingBottom: 180 }}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={false}
                />
            </View>
        </Container>
    )
}