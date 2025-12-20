import Carousel from "@/core/components/ui/shared/carousel";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { useToggleFavorite } from "@/core/services/ads/ad.mutations";
import { AdvertisementInterface } from "@/core/types";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    data: AdvertisementInterface,
    isDark?: boolean,
    view: "vertical" | "horizontal"
}

export default function Ad({ data, view = "horizontal", isDark }: Props) {
    const { protectAction } = useAuthGuard();
    const { mutate } = useToggleFavorite();

    if (view === "vertical") {
        return (
            <Pressable onPress={() => router.push("/categories/used_cars/jdhkgkd")} className="w-full rounded-lg p-2 border border-primary-500 shadow-transparent bg-transparent">
                <Carousel
                    badge={<View className="p-1 bg-primary-500 rounded-md"><Text className="text-gray-950">{data.plan.title}</Text></View>}
                    items={data.media}
                />
                <View className="mt-3 px-2 pb-2">
                    <View className="flex-1 flex-row items-center justify-between">
                        <Text className="font-inter-semibold text-lg text-black dark:text-white">{data.title} {data.created_at}</Text>
                        <Text className="font-inter-semibold text-black dark:text-white">{data.price}</Text>
                    </View>
                    <View className="flex-1 flex-row items-center justify-between">
                        <Text className="font-inter text-sm text-gray-400">{data.description}</Text>
                        <Text className="font-inter text-xs text-gray-400">{data.mileage}</Text>
                    </View>
                    <View className="flex-1 flex-row items-center justify-between mt-2">
                        <View className="flex-row items-center">
                            <Ionicons name="location-outline" size={22} color={isDark ? "white" : "black"} />
                            <Text className="font-inter-medium text-base text-black dark:text-white">{data.province.province}</Text>
                            <Text className="font-inter text-gray-400 ms-1">{data.location?.latitude}</Text>
                        </View>
                        <View className="flex-row items-center gap-x-1">
                            <MaterialCommunityIcons name="gas-station-outline" size={20} color={isDark ? "white" : "black"} />
                            <Text className="font-inter text-sm text-black dark:text-white">{data.fuel_type}</Text>
                        </View>
                        <View className="flex-row items-center gap-x-1">
                            <AntDesign name="control" size={20} color={isDark ? "white" : "black"} />
                            <Text className="font-inter text-sm text-black dark:text-white">{data.transmission}</Text>
                        </View>
                        <TouchableOpacity onPress={() => protectAction(() => mutate(data.id))}>
                            <Ionicons
                                name={data.is_favorited ? "star" : "star-outline"}
                                size={22} color={data.is_favorited ? "#FAED02" : "black"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        )
    }

    return (
        <View className="flex-row flex-1 rounded-lg border border-gray-200 bg-transparent">
            <View className="w-1/3">
                <Image
                    source={data.media[0].transformed_url}
                    contentFit="fill"
                    style={{ width: "auto", height: 110, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
                />
            </View>
            <View className="flex-1 w-full rounded-r-lg p-2 gap-y-2">
                <View className="flex-row items-center justify-between">
                    <Text className="font-inter-semibold text-lg text-black dark:text-white">{data.title}</Text>
                    <Text className="font-inter-semibold text-black dark:text-white">{data.created_at}</Text>
                </View>
                <View>
                    <Text className="font-inter text-sm text-gray-400" numberOfLines={1}>{data.description}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="font-inter text-xs text-gray-400">{data.created_at}</Text>
                    <Text className="font-inter text-xs text-gray-400">{data.mileage}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <Ionicons name="location-outline" size={14} />
                        <Text className="font-inter-medium text-sm text-black dark:text-white">{data.province.province}</Text>
                        <Text className="font-inter text-gray-400 ms-1 text-sm">{data.location?.latitude}</Text>
                    </View>
                    <View>
                        <Text className="font-inter-medium text-sm text-black dark:text-white">{data.price}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}