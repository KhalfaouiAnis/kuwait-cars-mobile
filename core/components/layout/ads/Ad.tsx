import Carousel from "@/core/components/ui/shared/carousel";
import { AdType } from "@/core/types";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, Text, View } from 'react-native';

interface Props {
    data: AdType,
    view: "vertical" | "horizontal"
}

export default function Ad({ data, view = "horizontal" }: Props) {
    if (view === "vertical") {
        return (
            <Pressable onPress={()=> router.push("/categories/4f5f4/jdhkgkd")} className="w-full rounded-lg p-2 border border-gray-200 shadow-transparent bg-transparent">
                <Carousel
                    badge={<View className="p-1 bg-primary-500 rounded-md"><Text className="text-gray-950">{data.badge}</Text></View>}
                    items={data.images}
                />
                <View className="mt-3 px-2 pb-2">
                    <View className="flex-1 flex-row items-center justify-between">
                        <Text className="font-inter-semibold text-lg">{data.name} {data.datePosted}</Text>
                        <Text className="font-inter-semibold">{data.price}</Text>
                    </View>
                    <View className="flex-1 flex-row items-center justify-between">
                        <Text className="font-inter text-sm text-gray-400">{data.description}</Text>
                        <Text className="font-inter text-xs text-gray-400">{data.mielage}</Text>
                    </View>
                    <View className="flex-1 flex-row items-center justify-between mt-2">
                        <View className="flex-row items-center">
                            <Ionicons name="location-outline" size={22} />
                            <Text className="font-inter-medium text-base">{data.location}</Text>
                            <Text className="font-inter text-gray-400 ms-1">{data.distanceFromMyLocation}</Text>
                        </View>
                        <View className="flex-row items-center gap-x-1">
                            <MaterialCommunityIcons name="gas-station-outline" size={20} color="black" />
                            <Text className="font-inter text-sm">{data.engine}</Text>
                        </View>
                        <View className="flex-row items-center gap-x-1">
                            <AntDesign name="control" size={20} color="black" />
                            <Text className="font-inter text-sm">{data.gearType}</Text>
                        </View>
                        <View>
                            <Ionicons name="star-outline" size={22} color={"primary"} />
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
                    source={data.images[0].image}
                    style={{ width: "auto", height: 104, objectFit: "cover", borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
                />
            </View>
            <View className="flex-1 w-full rounded-r-lg p-2 gap-y-2">
                <View className="flex-row items-center justify-between">
                    <Text className="font-inter-semibold text-lg">{data.name}</Text>
                    <Text className="font-inter-semibold">{data.datePosted}</Text>
                </View>
                <View className="">
                    <Text className="font-inter text-sm text-gray-400" numberOfLines={1}>{data.description}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="font-inter text-xs text-gray-400">{data.datePosted}</Text>
                    <Text className="font-inter text-xs text-gray-400">{data.mielage}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <Ionicons name="location-outline" size={14} />
                        <Text className="font-inter-medium text-sm">{data.location}</Text>
                        <Text className="font-inter text-gray-400 ms-1 text-sm">{data.distanceFromMyLocation}</Text>
                    </View>
                    <View>
                        <Text className="font-inter-medium text-sm">{data.price}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}