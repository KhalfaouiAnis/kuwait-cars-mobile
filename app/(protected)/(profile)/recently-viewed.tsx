import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import useAuthStore from "@/core/lib/stores/auth.store";
import { currentLan } from "@/core/lib/stores/preferences.store";
import { formatPassedTime } from "@/core/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Text, View } from "react-native";

export default function RecentlyViewedAdsScreen() {
    const { recentlyViewedAds } = useAuthStore();
    const locale = currentLan()
    return (
        <Container
            header={<ProfileHeader title="Recently Viewed" />}>
            <View className="w-full px-2 mt-12">
                <FlatList
                    data={recentlyViewedAds}
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
                                        source={{ uri: item.thumbnail }}
                                        contentFit="contain"
                                        style={{ width: 140, height: 100, borderRadius: 8 }} />
                                </LinearGradient>
                            </View>
                            <View className="flex-1 flex mt-4 py-4">
                                <View className="flex-row items-center justify-between px-1">
                                    <Text className="font-semibold">{item.title}</Text>
                                    <Text>{item.price}</Text>
                                </View>
                                <View className="mt-1">
                                    <Text className="font-inter text-sm">{item.description}</Text>
                                </View>
                                <View className="flex-1 flex-row items-center justify-between px-1 mt-4">
                                    <Text className="text-gray-500 text-xs">{formatPassedTime(new Date().toDateString(), locale) || "viewed 12 minutes ago"}</Text>
                                    <Ionicons name="star-outline" size={22} />
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
