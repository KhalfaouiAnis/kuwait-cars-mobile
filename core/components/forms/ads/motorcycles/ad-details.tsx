import AdTextInput from "@/core/components/ui/input/ad-text-input";
import RadioGroup from "@/core/components/ui/input/radio-group";
import SelectInput from "@/core/components/ui/input/select-input";
import { CAR_COLORS, YEARS } from "@/core/constants";
import { AdFormStepProps } from "@/core/types";
import { MotorcycleAdInterface } from "@/core/types/schema/ads/motorcycle";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { renderColorOption, renderYearOption } from "../../../ui/shared/render-option";
import SelectedAdType from "../shared/ad-type-selector/selected-ad-type";
import UnitSelector from "../shared/ad-type-selector/unit-selector";

export default function AdDetails({ control, errors, setValue }: AdFormStepProps<MotorcycleAdInterface>) {
    const { ad_type, category, brand } = useLocalSearchParams()

    useEffect(() => {
        setValue?.("ad_type", ad_type as string)
        setValue?.("category", category as string)
        setValue?.("brand", brand as string)
    }, [ad_type, category, brand, setValue])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 10 }}
        >
            <View className="flex-row items-center justify-center w-full">
                <View className="border border-primary-500 w-2/5" />
                <Text className="px-2 text-error font-inter-medium text-lg">Required Information</Text>
                <View className="border border-primary-500 w-2/5" />
            </View>
            <View>
                <View className="flex-row items-center justify-end">
                    <Text className="text-sm text-gray-300">Used Motors</Text>
                </View>
                <SelectedAdType
                    label={`${category} - ${brand}`}
                    icon={<Ionicons name="car-sport-outline" color="gray" size={20} />}
                />
            </View>
            <View className="gap-y-4 mt-4">
                <View>
                    <SelectInput
                        control={control}
                        name="year"
                        options={YEARS}
                        required
                        renderOption={(option, selected) => renderYearOption(option, selected as string)}
                        error={errors.year?.message}
                        placeholder="Year" />
                </View>
                <View>
                    <SelectInput
                        control={control}
                        name="exterior_color"
                        required
                        options={CAR_COLORS}
                        renderOption={(option, selected) => renderColorOption(option, selected as string)}
                        error={errors.exterior_color?.message}
                        placeholder="Exterior color" />
                </View>
                <View className="flex-row gap-1 items-center">
                    <View className="w-[74%]">
                        <AdTextInput
                            control={control}
                            name="mileage"
                            required
                            error={errors.mileage?.message}
                            placeholder="Mileage (0 - 1000000)" />
                    </View>
                    <UnitSelector control={control} name="mileage_unit" />
                </View>
            </View>
            <View className="flex-row items-center justify-center w-full mt-4">
                <View className="border border-primary-500 w-2/5" />
                <Text className="px-2 font-inter-medium text-lg dark:text-white">Optional Information</Text>
                <View className="border border-primary-500 w-2/5" />
            </View>
            <View className="gap-y-4 py-1 mt-4">
                <RadioGroup
                    name="fuel_type"
                    control={control}
                    label="Fuel Type"
                    fullWidth
                    options={[
                        { id: "Petrol", label: "Petrol", value: "Petrol" },
                        { id: "Diesel", label: "Diesel", value: "Diesel" },
                        { id: "Electric", label: "Electric", value: "Electric" },
                        { id: "Hybrid", label: "Hybrid", value: "Hybrid" },
                    ]}
                />
                <RadioGroup
                    name="cylinders"
                    control={control}
                    label="Cylinders"
                    options={[
                        { id: "1", label: "1", value: "1" },
                        { id: "2", label: "2", value: "2" },
                        { id: "3", label: "3", value: "3" },
                        { id: "4", label: "4", value: "4" },
                        { id: "6", label: "6", value: "6" },
                    ]}
                />
                <RadioGroup
                    name="transmission"
                    control={control}
                    label="Transmission"
                    bordered
                    fullWidth
                    options={[{ id: "auto", label: "Auto", value: "Auto" }, { id: "manual", label: "Manual", value: "Manual" }]}
                />
                <RadioGroup
                    name="under_warranty"
                    control={control}
                    label="Under warranty"
                    fullWidth
                    bordered
                    options={[{ id: "Yes", label: "Yes", value: "Yes" }, { id: "No", label: "No", value: "No" }]}
                />
            </View>
        </ScrollView>
    )
}