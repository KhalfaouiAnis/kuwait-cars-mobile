import Checkbox from "@/core/components/ui/input/checkbox";
import { CarBrandType } from "@/core/hooks/ad/filters/useBrand";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    item: CarBrandType
    selectedBrands: string[]
    onToggleBrand: (value: string) => void
}

export const renderBrandOption = ({ item, selectedBrands, onToggleBrand }: Props) => {
    const isSelected = selectedBrands.includes(item.value);

    return (
        <TouchableOpacity
            className={`flex-row items-center p-3 my-1 border-b border-gray-200`}
            onPress={() => onToggleBrand(item.value)}
        >
            <Ionicons name={item.icon as any} size={24} color="gray" className="mr-3" />
            <View className="flex-1">
                <Text className="font-medium">{item.label}</Text>
                <Text className="text-sm text-gray-500 capitalize">{item.brand}</Text>
            </View>
            <Checkbox size={20} checked={isSelected} />
        </TouchableOpacity>
    );
};