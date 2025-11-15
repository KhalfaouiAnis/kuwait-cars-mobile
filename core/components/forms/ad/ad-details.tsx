import { CAR_COLORS, YEARS } from "@/core/constants";
import { VehicleAdFormSteps } from "@/core/types/schema/vehicleAd";
import { ScrollView, Text, View } from "react-native";
import AdTextInput from "../../ui/input/ad-text-input";
import RadioGroup from "../../ui/input/radio-group";
import SelectInput from "../../ui/input/select-input";
import { renderColorOption, renderYearOption } from "./select-option/render-option";
import Init from "./unit";


export default function AdDetails({ control, errors }: VehicleAdFormSteps) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white"
            contentContainerStyle={{ paddingBottom: 60 }}
        >
            <View className="flex-row items-center justify-center w-full">
                <View className="border border-primary-500 w-2/5" />
                <Text className="px-2 text-error font-inter-medium text-lg">Required Information</Text>
                <View className="border border-primary-500 w-2/5" />
            </View>
            <View className="gap-y-2 mt-4">
                <View>
                    <SelectInput
                        control={control}
                        name="car.year"
                        options={YEARS}
                        renderOption={renderYearOption}
                        error={errors.car?.year?.message} placeholder="Year" />
                    <Text className="ms-4 text-gray-400 mt-1">Required</Text>
                </View>
                <View>
                    <SelectInput
                        control={control}
                        name="car.exterior_color"
                        options={CAR_COLORS}
                        renderOption={renderColorOption}
                        error={errors.car?.exterior_color?.message} placeholder="Exterior color" />
                    <Text className="ms-4 text-gray-400 mt-1">Required</Text>
                </View>
                <View>
                    <View className="flex-row gap-1 items-center">
                        <View className="w-[84%]">
                            <AdTextInput control={control} name="car.mileage" error={errors.car?.mileage?.message} placeholder="Mileage (0 - 1000000)" />
                        </View>
                        <Init />
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
                <RadioGroup
                    name="car.fuel_type"
                    control={control}
                    label="Fuel Type"
                    options={[
                        { id: "1", label: "Petrol", value: "Petrol" },
                        { id: "2", label: "Diesel", value: "Diesel" },
                        { id: "3", label: "Electric", value: "Electric" },
                        { id: "4", label: "Hybrid", value: "Hybrid" },
                    ]}
                />
                <RadioGroup
                    name="car.cylinders"
                    control={control}
                    label="Cylinders"
                    options={[
                        { id: "2", label: "2", value: "2" },
                        { id: "4", label: "4", value: "4" },
                        { id: "5", label: "5", value: "5" },
                        { id: "6", label: "6", value: "6" },
                        { id: "8", label: "8", value: "8" },
                        { id: "10", label: "10", value: "10" },
                        { id: "12", label: "12", value: "12" },
                    ]}
                />
                <RadioGroup
                    name="car.transmission"
                    control={control}
                    label="Transmission"
                    options={[{ id: "auto", label: "Auto", value: "Auto" }, { id: "manual", label: "Manual", value: "Manual" }]}
                />
                <RadioGroup
                    name="car.under_warranty"
                    control={control}
                    label="Under warranty"
                    options={[{ id: "Yes", label: "Yes", value: "Yes" }, { id: "No", label: "No", value: "No" }]}
                />
                <RadioGroup
                    name="car.roof"
                    control={control}
                    label="Roof"
                    options={[{ id: "Sunroof", label: "Sunroof", value: "Sunroof" }, { id: "Panoramic", label: "Panoramic", value: "Panoramic" },
                    { id: "Convertible Roof", label: "Convertible Roof", value: "Convertible Roof" }
                    ]}
                />
            </View>
        </ScrollView>
    )
}