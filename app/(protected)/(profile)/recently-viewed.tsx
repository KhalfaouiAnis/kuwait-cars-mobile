import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import useUserPreferencesStore, { currentLang } from "@/core/lib/stores/preferences.store";
import useAuthStore from "@/core/store/auth.store";
import { formatPassedTime } from "@/core/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Text, View } from "react-native";

export default function RecentlyViewedAdsScreen() {
    const { theme } = useUserPreferencesStore()
    const { recentlyViewedAds } = useAuthStore();
    const locale = currentLang()

    return (
        <Container
            header={<ProfileHeader title="Recently Viewed" />}>
            <View className="w-full px-2 mt-12">
                <FlatList
                    data={recentlyViewedAds}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View className="mb-2 border border-primary-500 rounded-lg p-1 flex-row dark:bg-darkish">
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
                                    <Text className="font-semibold dark:text-white">{item.title}</Text>
                                    <Text className="dark:text-wrap dark:text-white">${item.price}</Text>
                                </View>
                                <View className="mt-1">
                                    <Text className="font-inter text-sm dark:text-white">{item.description}</Text>
                                </View>
                                <View className="flex-1 flex-row items-center justify-between px-1 mt-4">
                                    <Text className="text-gray-500 text-xs">{formatPassedTime(new Date().toDateString(), locale) || "viewed 12 minutes ago"}</Text>
                                    <Ionicons name="star-outline" size={22} color={theme !== "light" ? "white" : "black"} />
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
