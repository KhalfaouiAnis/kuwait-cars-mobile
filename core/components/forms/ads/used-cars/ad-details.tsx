import AdTextInput from "@/core/components/ui/input/ad-text-input";
import RadioGroup from "@/core/components/ui/input/radio-group";
import SelectInput from "@/core/components/ui/input/select-input";
import { CAR_COLORS, YEARS } from "@/core/constants";
import useUserPreferencesStore from "@/core/lib/stores/preferences.store";
import { AdFormStepProps } from "@/core/types";
import { UsedCarAdInterface } from "@/core/types/schema/ads/usedCar";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { renderColorOption, renderYearOption } from "../../../ui/shared/render-option";
import SelectedAdType from "../shared/ad-type-selector/selected-ad-type";
import UnitSelector from "../shared/ad-type-selector/unit-selector";

export default function AdDetails({ control, errors, setValue, t, isDark }: AdFormStepProps<UsedCarAdInterface>) {
    const { model, brand, ad_type } = useLocalSearchParams()
    const { isRTL } = useUserPreferencesStore()

    useEffect(() => {
        setValue?.("ad_type", ad_type as string)
        setValue?.("model", model as string)
        setValue?.("brand", brand as string)
    }, [ad_type, model, brand, setValue])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 10 }}
        >
            <View className="flex-row items-center justify-center w-full">
                <View className="border border-primary-500 w-2/5" />
                <Text className="px-2 text-error font-inter-medium text-lg">{t("requiredInformation")}</Text>
                <View className="border border-primary-500 w-2/5" />
            </View>
            <View className="gap-y-4 mt-4" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-semibold mb-2 dark:text-white">{t("whatAreYouSelling")}</Text>
                        <Text className="text-sm text-gray-300">{t("adCategories.used_cars")}</Text>
                    </View>
                    <SelectedAdType
                        label={`${brand}-${model}`}
                        icon={<Ionicons name="car-sport-outline" color="gray" size={20} />}
                    />
                </View>
                <View>
                    <SelectInput
                        control={control}
                        name="year"
                        options={YEARS}
                        required
                        isRTL={isRTL}
                        isDark={isDark}
                        renderOption={(option, selected) => renderYearOption(option, selected as string)}
                        error={errors.year?.message}
                        placeholder={t("Year")}
                    />
                </View>
                <View>
                    <SelectInput
                        control={control}
                        name="exterior_color"
                        options={CAR_COLORS}
                        required
                        isDark={isDark}
                        isRTL={isRTL}
                        renderOption={(option, selected) => renderColorOption(option, selected as string)}
                        error={errors.exterior_color?.message}
                        placeholder={t("exteriorColor")}
                    />
                </View>
                <View className="flex-row gap-1 items-center">
                    <View className="w-[74%]">
                        <AdTextInput
                            control={control}
                            name="mileage"
                            required
                            error={errors.mileage?.message}
                            placeholder={t("Mileage")}
                            keyboardType="number-pad"
                        />
                    </View>
                    <UnitSelector control={control} name="mileage_unit" />
                </View>
            </View>
            <View className="flex-row items-center justify-center w-full mt-4">
                <View className="border border-primary-500 w-2/5" />
                <Text className="px-2 font-inter-medium text-lg dark:text-white">{t("optionalInformation")}</Text>
                <View className="border border-primary-500 w-2/5" />
            </View>
            <View className="gap-y-4 py-1 mt-4" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <RadioGroup
                    name="fuel_type"
                    control={control}
                    label={t("fuelType")}
                    fullWidth
                    options={[
                        { id: "Petrol", label: t("Petrol"), value: "Petrol" },
                        { id: "Diesel", label: t("diesel"), value: "Diesel" },
                        { id: "Electric", label: t("Electric"), value: "Electric" },
                        { id: "Hybrid", label: t("Hybrid"), value: "Hybrid" },
                    ]}
                />
                <RadioGroup
                    name="cylinders"
                    control={control}
                    label={t("Cylinders")}
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
                    name="transmission"
                    control={control}
                    label={t("Transmission")}
                    bordered
                    fullWidth
                    options={[{ id: "auto", label: t("Auto"), value: "Auto" }, { id: "manual", label: t("Manual"), value: "Manual" }]}
                />
                <RadioGroup
                    name="under_warranty"
                    control={control}
                    label={t("underWarranty")}
                    fullWidth
                    bordered
                    options={[{ id: "Yes", label: t("yes"), value: "Yes" }, { id: "No", label: t("no"), value: "No" }]}
                />
                <RadioGroup
                    name="roof"
                    control={control}
                    label={t("Roof")}
                    options={[
                        { id: "Sunroof", label: t("Sunroof"), value: "Sunroof" },
                        { id: "panoramic", label: t("Panoramic"), value: "Panoramic" },
                        { id: "Convertible Roof", label: t("ConvertibleRoof"), value: "Convertible Roof" }
                    ]}
                />
            </View>
        </ScrollView>
    )
}