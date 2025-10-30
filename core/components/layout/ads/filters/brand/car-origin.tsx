import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Props {
    regions: { label: string, value: string }[]
    selectedRegions: string[]
    toggleSelect: (value: string) => void
}

export default function CarOriginList({ regions, selectedRegions, toggleSelect }: Props) {
    return (
        <View className="mb-1">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
                {regions.map((region) => {
                    const isSelected = selectedRegions.includes(region.value);
                    return (
                        <TouchableOpacity
                            key={region.value}
                            className={`mx-1 px-4 py-2 rounded-full border ${isSelected ? 'border-primary-500 bg-gray-100' : 'border-primary-500'}`}
                            onPress={() => toggleSelect(region.value)}
                        >
                            <Text className={`${isSelected ? 'font-medium' : 'text-gray-600'}`}>
                                {region.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    )
}