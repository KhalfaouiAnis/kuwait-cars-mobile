import Carousel from "@/core/components/ui/shared/carousel";
import { AdType } from "@/core/types";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from 'react-native';

export default function Ad({ adData }: { adData:AdType }) {
    return (
        <View className="w-full rounded-lg p-2 border border-gray-200 shadow-transparent bg-transparent">
            <Carousel
                badge={<View className="p-1 bg-primary-500 rounded-md"><Text className="text-gray-950">{adData.badge}</Text></View>}
                items={adData.images}
            />
            <View className="mt-3 px-2 pb-2">
                <View className="flex-1 flex-row items-center justify-between">
                    <Text className="font-inter-semibold text-lg">{adData.name} {adData.datePosted}</Text>
                    <Text className="font-inter-semibold">{adData.price}</Text>
                </View>
                <View className="flex-1 flex-row items-center justify-between">
                    <Text className="font-inter text-sm text-gray-500">{adData.description}</Text>
                    <Text className="font-inter text-sm text-gray-500">{adData.mielage}</Text>
                </View>
                <View className="flex-1 flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center">
                        <Ionicons name="location-outline" size={22} />
                        <Text className="font-inter-medium text-base">{adData.location}</Text>
                        <Text className="font-inter text-gray-500 ms-1">{adData.distanceFromMyLocation}</Text>
                    </View>
                    <View className="flex-row items-center gap-x-1">
                        <Ionicons name="keypad-outline" size={22} />
                        <Text className="font-inter-medium text-base">{adData.engine}</Text>
                    </View>
                    <View className="flex-row items-center gap-x-1">
                        <Ionicons name="game-controller" size={22} />
                        <Text className="font-inter-medium text-base">{adData.gearType}</Text>
                    </View>
                    <View>
                        <Ionicons name="heart-outline" size={22} color={"primary"} />
                    </View>
                </View>
            </View>
        </View>
    )
}