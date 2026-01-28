import Checkbox from "@/core/components/ui/input/checkbox";
import { preferencesStore } from "@/core/store/preferences.store";
import { ProvinceArea, SelectOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Text, View } from "react-native";

export const renderProvinceAreaOption = (option: ProvinceArea, selected?: string) => (
    <View className={`items-center justify-center py-4 bg-primary-500 mx-2 px-2 border ${option.value === selected ? "border-error" : "border-gray-300"}`}>
        <Text className="text-lg text-center font-inter-medium">{option.label}</Text>
    </View>
)

export const renderOption = (option: SelectOption, selected?: string | boolean) => {
    const isRTL = preferencesStore?.getState().isRTL
    const isSelected = (typeof selected === "boolean" && selected) || option.value === selected

    return (
        <View className="flex-row items-center py-3 my-1 mx-2 px-2 dark:border-primary-500 dark:border" style={[boxShadow(0, 4, 4).button, { direction: isRTL ? "rtl" : "ltr" }]}>
            <View className='flex-1 ms-2'>
                <Text className="text-lg dark:text-white">{option.label}</Text>
            </View>
            <View className='pe-2'>
                <Checkbox size={18} checked={isSelected} disabled />
            </View>
        </View>
    )
}