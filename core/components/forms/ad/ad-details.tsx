import { CAR_COLORS, YEARS } from "@/core/constants";
import { VehicleAdFormSteps } from "@/core/types/schema/vehicleAd";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AdTextInput from "../../ui/input/ad-text-input";
import SelectInput from "../../ui/input/select-input";
import { renderColorOption, renderYearOption } from "./select-option/render-option";

export default function AdDetails({ control, errors }: VehicleAdFormSteps) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white"
            contentContainerStyle={{ paddingBottom: 60 }}>
            <View className="flex-row items-center justify-center w-full">
                <View className="border border-primary-500 w-2/5" />
                <Text className="px-2 text-error font-inter-medium text-lg">Required Information</Text>
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
                    <View className="flex-row gap-1 flex-1">
                        <SelectInput
                            control={control}
                            name="car.color_exterior"
                            options={CAR_COLORS}
                            renderOption={renderColorOption}
                            error={errors.car?.color_exterior?.message} placeholder="Color Exterior" />
                        <TouchableOpacity className="py-1 px-3">
                            <Text>KM</Text>
                        </TouchableOpacity>
                    </View>
                    <Text className="ms-4 text-gray-400 mt-1">Required</Text>
                </View>
                <View>
                    <View className="flex-row gap-1 flex-1">
                        <View className="w-[80%]">
                            <AdTextInput control={control} name="car.mileage" error={errors.car?.mileage?.message} placeholder="Mileage (0 - 1000000)" />
                        </View>
                        <TouchableOpacity className="py-1 px-3 flex-1 items-center justify-center border border-gray-100">
                            <Text>KM</Text>
                        </TouchableOpacity>
                    </View>
                    <Text className="ms-4 text-gray-400 mt-1">Required</Text>
                </View>
            </View>
            <View className="flex-row items-center justify-center w-full mt-4">
                <View className="border border-primary-500 w-2/5" />
                <Text className="px-2 font-inter-medium text-lg">Optional Information</Text>
                <View className="border border-primary-500 w-2/5" />
            </View>
            <View className="gap-y-2 mt-4">
                <AdTextInput control={control} name="car.model" error={errors.car?.model?.message} placeholder="Model" />
                <AdTextInput control={control} name="car.body_type" error={errors.car?.body_type?.message} placeholder="Body type" />
                <AdTextInput control={control} name="car.fuel_type" error={errors.car?.fuel_type?.message} placeholder="Fuel type" />
                <AdTextInput control={control} name="car.color_interior" error={errors.car?.color_interior?.message} placeholder="Color interior" />
                <AdTextInput control={control} name="car.seats_material" error={errors.car?.seats_material?.message} placeholder="Seats material" />
                <AdTextInput control={control} name="car.body_condition" error={errors.car?.body_condition?.message} placeholder="Body condition" />
                <AdTextInput control={control} name="car.cylinders" error={errors.car?.cylinders?.message} placeholder="cylinders" />
                <AdTextInput control={control} name="car.transmission" error={errors.car?.transmission?.message} placeholder="Transmission" />
            </View>
        </ScrollView>
    )
}