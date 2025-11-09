import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";

const units = ['KM', 'ML'];

export default function Init() {
    const [unit, setUnit] = useState<'KM' | 'ML'>('KM');

    const handleScrollEnd = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / 40);
        if (index >= 0 && index < units.length) {
            setUnit(units[index] as 'KM' | 'ML');
        }
    };

    const renderUnit = ({ item }: { item: string }) => (
        <View className={`w-10 flex items-center justify-center rounded-full mx-1 bg-primary-500`}>
            <Text className={`font-semibold text-center text-gray-600`}>
                {item}
            </Text>
        </View>
    );

    return (
        <View className="w-12 items-center justify-between">
            <FlatList
                data={units}
                renderItem={renderUnit}
                keyExtractor={(item) => item}
                horizontal
                snapToInterval={40}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScrollEnd}
                className="h-12 w-full"
            />
            <MaterialCommunityIcons name="arrow-expand-horizontal" size={18} color="gray" />
        </View>
    )
}