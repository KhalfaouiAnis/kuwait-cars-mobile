import Checkbox from "@/core/components/ui/input/checkbox";
import { SelectOption } from "@/core/types";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const renderCategoryOption = (option: SelectOption) => (
    <View className="flex-row items-center py-3 my-1 mx-2 px-2 border-b border-gray-200 shadow-sm">
        <View className='ms-3'>
            <Ionicons name="car-outline" size={24} color="black" />
        </View>
        <View className='flex-1 ms-4'>
            <Text className="text-lg">{option.label}</Text>
        </View>
        <View className='pe-2'>
            <Ionicons name='chevron-down' size={16} />
        </View>
    </View>
)

export const renderLocationOption = (option: SelectOption, selected?: string) => (
    <View className={`flex-row items-center py-3 bg-primary-500 mx-2 px-2 border ${option.value === selected ? "border-error border-2" : "border-gray-200"} shadow-sm`}>
        <View className='flex-1 ms-4'>
            <Text className="text-lg text-center font-inter-medium">{option.label}</Text>
        </View>
    </View>
)

export const renderYearOption = (option: SelectOption, selected?: string) => {
    return (
        <View className="flex-row items-center py-3 my-1 mx-2 px-2 border-b border-gray-200 shadow-sm">
            <View className='flex-1 ms-2'>
                <Text className="text-lg">{option.label}</Text>
            </View>
            <View className='pe-2'>
                <Checkbox size={18} checked={option.value === selected} disabled />
            </View>
        </View>
    )
}

export const renderColorOption = (option: SelectOption, selected?: string) => (
    <View className="flex-row items-center py-3 my-1 mx-2 px-2 border-b border-gray-200 shadow-sm">
        <View className='flex-1 ms-2'>
            <Text className="text-lg">{option.label}</Text>
        </View>
        <View className='pe-2'>
            <Checkbox size={18} checked={option.value === selected} disabled />
        </View>
    </View>
)