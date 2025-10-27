import Ad from "@/core/components/layout/ads/Ad";
import Container from "@/core/components/ui/container";
import { images } from "@/core/constants/images";
import { Dimensions, FlatList, Text, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const FILTERS = [
    "category", "brand", "Year of manufacture", "price", "hhh", "fgffg"
]

export const listings = [
    {
        id: "listing-1",
        images: [
            { image: images.CarChevrolet },
            { image: images.CarHyunday },
            { image: images.CarMercedes },
            { image: images.CarToyota },
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
            { image: images.CarHyunday },
            { image: images.CarChevrolet },
            { image: images.CarMercedes },
            { image: images.CarToyota },
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
            { image: images.CarMercedes },
            { image: images.CarHyunday },
            { image: images.CarChevrolet },
            { image: images.CarToyota },
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

const getItemLayout = (data: any, index: number) => ({
    length: screenHeight * 0.4 + 16, // Item height + margin
    offset: (screenHeight * 0.4 + 16) * index,
    index,
});

export default function FavoritesScreen() {
    return (
        <Container>
            <View className="w-full px-2 mt-12">
                <View className="flex-row items-center justify-center mb-6">
                    <Text className="font-inter-bold text-center text-3xl">My Favorites</Text>
                </View>
                <FlatList
                    data={listings}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <View className="mb-2"><Ad adData={item} /></View>}
                    contentContainerStyle={{ paddingBottom: 130 }}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={getItemLayout}
                    removeClippedSubviews={false}
                />
            </View>
        </Container>
    )
}