import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { images } from "@/core/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const listings = [
    {
        id: "listing-1",
        image: images.Toyota_1,
        name: "Toyota Yaris Cross",
        seats: "4",
        gearType: "Automatic",
        capacity: "2 Small Bag",
        capacity_2: "1 Large Bag",
        price: "2.000 kwd",
    },
    {
        id: "listing-2",
        image: images.Toyota_2,
        name: "Toyota Yaris Cross",
        seats: "5",
        gearType: "Automatic",
        capacity: "2 Small Bag",
        capacity_2: "1 Large Bag",
        price: "1.700 kwd",
    },
    {
        id: "listing-3",
        image: images.Toyota_3,
        name: "Toyota Yaris Cross",
        seats: "5",
        gearType: "Automatic",
        capacity: "2 Small Bag",
        capacity_2: "1 Large Bag",
        price: "2.300 kwd",
    },
    {
        id: "listing-4",
        image: images.Toyota_4,
        name: "Toyota Yaris Cross",
        seats: "5+2",
        gearType: "Automatic",
        capacity: "2 Small Bag",
        capacity_2: "1 Large Bag",
        price: "2.000 kwd",
    },
]

export default function MyAdsScreen() {
    return (
        <Container header={<ProfileHeader title="My Ads" />}>
            <View className="w-full px-2 mt-12">
                <FlatList
                    data={listings}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (<Swipeable renderLeftActions={(progress, dragX) => {
                        const opacity = dragX.interpolate({
                            inputRange: [0, 35, 70, 105],
                            outputRange: [0, 0.3, 0.7, 1],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View style={{ opacity }}>
                                <TouchableOpacity
                                    className="bg-red-500 h-full w-12 justify-center items-center rounded-l-3xl"
                                    activeOpacity={0.7}
                                >
                                    <Ionicons name="trash-outline" size={24} color="white" />
                                </TouchableOpacity>
                            </Animated.View>
                        )
                    }}>
                        <View className="mb-6 rounded-lg p-1 flex-row items-center justify-between">
                            <Image source={item.image} style={{ width: 60, height: 40, objectFit: 'cover' }} />
                            <View className="gap-y-3">
                                <Text>{item.name}</Text>
                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row gap-x-1 items-center justify-around">
                                        <Ionicons name="person-outline" size={14} />
                                        <Text>{item.seats} seats</Text>
                                    </View>
                                    <View className="flex-row gap-x-1 items-center justify-around">
                                        <Ionicons name="bag-outline" size={14} />
                                        <Text>{item.capacity}</Text>
                                    </View>
                                </View>
                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row gap-x-1 items-center justify-around">
                                        <Ionicons name="settings-outline" size={14} />
                                        <Text>{item.gearType}</Text>
                                    </View>
                                    <View className="flex-row gap-x-1 items-center justify-around">
                                        <Ionicons name="bag-handle" size={14} />
                                        <Text>{item.capacity_2}</Text>
                                    </View>
                                </View>
                            </View>
                            <View className="gap-y-3">
                                <View className="flex-row gap-x-1">
                                    <Text className="font-semibold">{item.price}</Text>
                                </View>
                                <TouchableOpacity className="bg-error py-1 px-3 rounded-lg">
                                    <Text className="text-white">
                                        Edit Ad
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Swipeable>
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={false}
                />
            </View>
        </Container>
    )
}
