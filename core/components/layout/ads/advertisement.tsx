import { AdvertisementInterface } from "@/core/types";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, Text, View } from 'react-native';
import Carousel from "../../ui/shared/carousel";

interface Props {
    data: AdvertisementInterface,
    view: "vertical" | "horizontal"
    isDark?: boolean,
}

export default function Advertisement({ data, view = "horizontal", isDark }: Props) {
    if (view === "vertical") {
        return (
            <Pressable
                onPress={() => router.push("/categories/used_cars/jdhkgkd")}
                className="w-full rounded-lg p-2 border border-primary-500 shadow-transparent bg-transparent">
                <Carousel
                    items={data.media}
                />
                <View className="mt-3 px-2 pb-2">
                    <View className="flex-1 flex-row items-center justify-between">
                        <Text className="font-inter-semibold text-lg text-black dark:text-white">{data.title} {data.created_at}</Text>
                        <Text className="font-inter-semibold text-black dark:text-white">{data.price}</Text>
                    </View>
                    <View className="flex-1 flex-row items-center justify-between">
                        <Text className="font-inter text-sm text-gray-400">{data.description}</Text>
                        <Text className="font-inter text-xs text-gray-400">{`${data.mileage_unit} ${data.mileage}`}</Text>
                    </View>
                    <View className="flex-1 flex-row items-center justify-between mt-2">
                        <View className="flex-row items-center">
                            <Ionicons name="location-outline" size={22} color={isDark ? "white" : "black"} />
                            <Text className="font-inter-medium text-base text-black dark:text-white">{data.province.province}</Text>
                            {/* TODO: replace with actual distance diff */}
                            <Text className="font-inter text-gray-400 ms-1">3km</Text>
                        </View>
                        <View className="flex-row items-center gap-x-1">
                            <MaterialCommunityIcons name="gas-station-outline" size={20} color={isDark ? "white" : "black"} />
                            <Text className="font-inter text-sm text-black dark:text-white">{data.fuel_type}</Text>
                        </View>
                        <View className="flex-row items-center gap-x-1">
                            <AntDesign name="control" size={20} color={isDark ? "white" : "black"} />
                            <Text className="font-inter text-sm text-black dark:text-white">{data.transmission}</Text>
                        </View>
                        <View>
                            <Ionicons name="star-outline" size={22} color={isDark ? "white" : "black"} />
                        </View>
                    </View>
                </View>
            </Pressable>
        )
    }

    return (
        <View className="flex-row flex-1 rounded-lg border border-gray-200 bg-transparent">
            <View className="w-1/3">
                <Image
                    source={data.media.find(media => media.media_type === "THUMBNAIL")?.transformed_url}
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
                    <Text className="font-inter text-xs text-gray-400">{`${data.mileage_unit} ${data.mileage}`}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <Ionicons name="location-outline" size={14} />
                        <Text className="font-inter-medium text-sm text-black dark:text-white">{data.province.province}</Text>
                        {/* TODO: replace with actual distance diff */}
                        <Text className="font-inter text-gray-400 ms-1 text-sm">3km</Text>
                    </View>
                    <View>
                        <Text className="font-inter-medium text-sm text-black dark:text-white">{data.price}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}