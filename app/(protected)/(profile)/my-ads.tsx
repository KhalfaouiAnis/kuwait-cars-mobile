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

const renderItem = ({ item }: {
    item: {
        id: string;
        image: any;
        name: string;
        seats: string;
        gearType: string;
        capacity: string;
        capacity_2: string;
        price: string;
    }
}) => {
    return (
        <Swipeable renderLeftActions={(progress, dragX) => {
            const opacity = dragX.interpolate({
                inputRange: [0, 30, 60, 80],
                outputRange: [0, 0.3, 0.7, 1],
                extrapolate: 'clamp',
            });
            return (
                <Animated.View style={{ opacity }}>
                    <TouchableOpacity
                        className="bg-red-500 h-24 w-10 justify-center items-center rounded-l-2xl"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="trash-outline" size={24} color="white" />
                    </TouchableOpacity>
                </Animated.View>
            )
        }}>
            <View className="mb-6 rounded-lg p-1 flex-row items-center">
                <Image source={item.image} style={{ width: 60, height: 40, objectFit: 'cover' }} />
                <View className="gap-y-3 flex-1 mx-4">
                    <Text className="font-inter-semibold">{item.name}</Text>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row gap-x-1 items-center justify-around">
                            <Ionicons name="person-outline" size={14} />
                            <Text className="text-sm">{item.seats} seats</Text>
                        </View>
                        <View className="flex-row gap-x-1 items-center justify-around">
                            <Ionicons name="bag-outline" size={14} />
                            <Text className="text-sm">{item.capacity}</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row gap-x-1 items-center justify-around">
                            <Ionicons name="settings-outline" size={14} />
                            <Text className="text-sm">{item.gearType}</Text>
                        </View>
                        <View className="flex-row gap-x-1 items-center justify-around">
                            <Ionicons name="bag-handle" size={14} />
                            <Text className="text-sm">{item.capacity_2}</Text>
                        </View>
                    </View>
                </View>
                <View className="flex flex-col h-24 justify-between">
                    <View className="flex-row gap-x-1 mt-4">
                        <Text className="font-semibold">{item.price}</Text>
                    </View>
                    <TouchableOpacity className="bg-error py-1 px-3 rounded-lg">
                        <Text className="text-white text-sm">
                            Edit Ad
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Swipeable>
    )
}

export default function MyAdsScreen() {
    return (
        <Container header={<ProfileHeader title="My Ads" />}>
            <View className="flex-1 px-2">
                <View className="flex-1 border-2 border-gray-100 rounded-lg">
                    <FlatList
                        data={listings}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                        removeClippedSubviews={false}
                    />
                </View>
            </View>
        </Container>
    )
}
