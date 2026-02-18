import Checkbox from "@/core/components/ui/input/checkbox/checkbox";
import { preferencesStore } from "@/core/store/preferences.store";
import { ProvinceArea, SelectOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { StyleSheet, Text, View } from "react-native";

export const renderProvinceAreaOption = (option: ProvinceArea, selected?: string) => (
    <View
        style={styles.province}
        className={`${option.value === selected ? "bg-[#D9D9D9]" : "bg-white"}`}>
        <Text className="text-center text-xs font-inter-semibold">{option.label}</Text>
    </View>
)

export const renderOption = (option: SelectOption, isSelected?: boolean) => {
    const isRTL = preferencesStore?.getState().isRTL
    return (
        <View className="flex-row items-center py-3 my-2.5 mx-8 px-4" style={[styles.wrapper, { direction: isRTL ? "rtl" : "ltr" }]}>
            <View className='flex-1 ms-2'>
                <Text className="text-lg dark:text-white">{option.label}</Text>
            </View>
            <View className='pe-2'>
                <Checkbox size={24} checked={isSelected} disabled />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 45,
        borderRadius: 15,
        ...boxShadow(0, 4, 4).button,
    },
    province: {
        width: 120,
        height: 30,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        ...boxShadow(0, 4, 9).button,
    }
});