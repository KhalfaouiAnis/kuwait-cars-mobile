import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Text, View } from "react-native";
import { listings } from "../(tabs)/favorites";

export default function RecentlyViewedAdsScreen() {
    return (
        <Container
            header={<ProfileHeader title="Recently Viewed" />}
        >
            <View className="w-full px-2 mt-12">
                <FlatList
                    data={listings}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View className="mb-2 border border-primary-500 rounded-lg p-1 flex-row">
                            <View className="w-[160px] h-[130px] items-center justify-center rounded-lg">
                                <LinearGradient
                                    className="w-[150px] h-[110px] justify-center items-center rounded-lg"
                                    colors={['#FAED02', 'transparent']}
                                    start={{ x: 0.5, y: 1 }}
                                    end={{ x: 0.5, y: 0 }}
                                >
                                    <Image
                                        source={item.images[0].image}
                                        style={{ width: 140, height: 100, objectFit: "contain", borderRadius: 8 }} />
                                </LinearGradient>
                            </View>
                            <View className="flex-1 flex mt-4">
                                <View className="flex-row items-center justify-between px-1">
                                    <Text className="font-semibold">{item.name}</Text>
                                    <Text>{item.price}</Text>
                                </View>
                                <View className="mt-1">
                                    <Text className="font-inter text-sm">{item.description}</Text>
                                </View>
                                <View className="flex-1 flex-row items-center justify-between px-1 mt-4">
                                    <Text className="text-gray-500 text-xs">viewed 12 minutes ago</Text>
                                    <Ionicons name="heart-outline" size={22} />
                                </View>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={false}
                />
            </View>
        </Container>
    )
}
