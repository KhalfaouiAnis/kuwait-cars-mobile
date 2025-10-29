import { CAR_COLORS, YEARS } from "@/core/constants";
import { StepProps } from "@/core/types";
import { ScrollView, Text, View } from "react-native";
import AdTextInput from "../../ui/input/ad-text-input";
import SelectInput from "../../ui/input/select-input";
import { renderColorOption, renderYearOption } from "./select-option/render-option";

export default function AdDetails({ control, errors }: StepProps) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white"
            contentContainerStyle={{ paddingBottom: 60 }}>
            <View className="flex-row items-center justify-center w-full">
                <View className="border border-primary-500 w-2/5" />
                <Text className="px-2 text-error font-inter-semibold text-lg">Required Information</Text>
                <View className="border border-primary-500 w-2/5" />
            </View>
            <View className="gap-y-2 mt-4">
                <View>
                    <SelectInput
                        control={control}
                        name="year"
                        options={YEARS}
                        renderOption={renderYearOption}
                        error={errors.year?.message} placeholder="Year" />
                    <Text className="ms-4 text-gray-400 mt-1">Required</Text>
                </View>
                <View>
                    <SelectInput
                        control={control}
                        name="color_exterior"
                        options={CAR_COLORS}
                        renderOption={renderColorOption}
                        error={errors.color_exterior?.message} placeholder="Color Exterior" />
                    <Text className="ms-4 text-gray-400 mt-1">Required</Text>
                </View>
                <View>
                    <AdTextInput control={control} name="mileage" error={errors.mileage?.message} placeholder="Mileage (0 - 1000000)" />
                    <Text className="ms-4 text-gray-400 mt-1">Required</Text>
                </View>
            </View>
            <View className="flex-row items-center justify-center w-full mt-4">
                <View className="border border-primary-500 w-2/5" />
                <Text className="px-2 font-inter-semibold text-lg">Optional Information</Text>
                <View className="border border-primary-500 w-2/5" />
            </View>
            <View className="gap-y-2 mt-4">
                <AdTextInput control={control} name="model" error={errors.model?.message} placeholder="Model" />
                <AdTextInput control={control} name="model_type" error={errors.model_type?.message} placeholder="model type" />
                <AdTextInput control={control} name="fuel_type" error={errors.fuel_type?.message} placeholder="fuel type" />
                <AdTextInput control={control} name="color_interior" error={errors.color_interior?.message} placeholder="Model" />
                <AdTextInput control={control} name="seats_material" error={errors.seats_material?.message} placeholder="seats material" />
                <AdTextInput control={control} name="body_condition" error={errors.body_condition?.message} placeholder="body condition" />
                <AdTextInput control={control} name="import" error={errors.import?.message} placeholder="import" />
                <AdTextInput control={control} name="cylinders" error={errors.cylinders?.message} placeholder="cylinders" />
                <AdTextInput control={control} name="transmission" error={errors.transmission?.message} placeholder="transmission" />
            </View>
        </ScrollView>
    )
}