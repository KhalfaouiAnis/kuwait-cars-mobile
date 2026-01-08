import Checkbox from "@/core/components/ui/input/checkbox";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { ProvinceArea, SelectOption } from "@/core/types";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export const renderCategoryOption = (option: SelectOption) => (
    <View className="flex-row items-center py-3 my-1 mx-2 px-2 border-b border-gray-200">
        <View className='ms-3'>
            <Ionicons name="car-outline" size={24} color="black" />
        </View>
        <View className='flex-1 ms-4'>
            <Text className="text-lg dark:text-white">{option.label}</Text>
        </View>
        <View className='pe-2'>
            <Ionicons name='chevron-down' size={16} />
        </View>
    </View>
)

export const renderProvinceAreaOption = (option: ProvinceArea, selected?: string) => (
    <View className={`items-center justify-center py-4 bg-primary-500 mx-2 px-2 border ${option.value === selected ? "border-error" : "border-gray-300"}`}>
        <Text className="text-lg text-center font-inter-medium">{option.label}</Text>
    </View>
)

export const renderYearOption = (option: SelectOption, selected?: string) => {
    return (
        <View className="flex-row items-center py-3 my-1 mx-2 px-2" style={styles.selectButton}>
            <View className='flex-1 ms-2'>
                <Text className="text-lg dark:text-white">{option.label}</Text>
            </View>
            <View className='pe-2'>
                <Checkbox size={18} checked={option.value === selected} disabled />
            </View>
        </View>
    )
}

export const renderColorOption = (option: SelectOption, selected?: string) => (
    <View className="flex-row items-center py-3 my-1 mx-2 px-2" style={styles.selectButton}>
        <View className='flex-1 ms-2'>
            <Text className="text-lg dark:text-white">{option.label}</Text>
        </View>
        <View className='pe-2'>
            <Checkbox size={18} checked={option.value === selected} disabled />
        </View>
    </View>
)

export const renderOption = (option: SelectOption, selected?: string | boolean) => {
    const { isRTL } = useUserPreferencesStore.getState()
    const isSelected = (typeof selected === "boolean" && selected) || option.value === selected

    return (
        <View className="flex-row items-center py-3 my-1 mx-2 px-2 dark:border-primary-500 dark:border" style={[styles.selectButton, { direction: isRTL ? "rtl" : "ltr" }]}>
            <View className='flex-1 ms-2'>
                <Text className="text-lg dark:text-white">{option.label}</Text>
            </View>
            <View className='pe-2'>
                <Checkbox size={18} checked={isSelected} disabled />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    selectButton: {
        boxShadow: [
            {
                offsetX: 0,
                offsetY: 4,
                blurRadius: 4,
                spreadDistance: 0,
                color: 'rgb(000 000 000 / 0.25)',
            },
        ],
    }
});