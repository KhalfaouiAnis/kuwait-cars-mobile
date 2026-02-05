import AdSelectInput from "@/core/components/ui/input/ad-select-input";
import AdTextInput from "@/core/components/ui/input/ad-text-input";
import RadioGroup from "@/core/components/ui/input/radio-group";
import UnitSelector from "@/core/components/ui/menu/unit-selector";
import { YEARS } from "@/core/constants";
import useColors from "@/core/hooks/ad/useColors";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdFormStepProps } from "@/core/types";
import { UsedCarAdInterface } from "@/core/types/schema/ads/usedCar";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { renderOption } from "../../../ui/shared/render-option";
import SelectedAdType from "../shared/ad-type-selector/selected-ad-type";

export default function AdDetails({ control, errors, setValue, isDark }: AdFormStepProps<UsedCarAdInterface>) {
    const CAR_COLORS = useColors()
    const { model, brand, ad_type } = useLocalSearchParams()
    const { t } = useTranslation("common")
    const { t: tBrands } = useTranslation("car_categories")
    const { isRTL } = useUserPreferencesStore()

    useEffect(() => {
        setValue?.("ad_type", ad_type as string)
        setValue?.("model", model as string)
        setValue?.("brand", brand as string)
    }, [ad_type, model, brand, setValue])

    return (
        <ScrollView
            className="flex-1 px-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
        >
            <View className="flex-row items-center justify-center w-full">
                <View className="border border-primary-500 w-2/5" />
                <Text className="px-2 text-error font-inter text-lg">{t("createAd.requiredInformation")}</Text>
                <View className="border border-primary-500 w-2/5" />
            </View>
            <View className="gap-y-5 mt-2" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-semibold mb-2 dark:text-white">{t("createAd.whatAreYouSelling")}</Text>
                        <Text className="text-sm text-gray-300">{t("adCategories.used_cars")}</Text>
                    </View>
                    <SelectedAdType
                        label={`${tBrands(brand)}-${tBrands(model)}`}
                        icon={<Ionicons name="car-sport-outline" color="black" size={20} />}
                    />
                </View>
                <View>
                    <AdSelectInput
                        required
                        name="year"
                        isRTL={isRTL}
                        isDark={isDark}
                        options={YEARS}
                        control={control}
                        placeholder={t("year")}
                        error={errors.year?.ref?.name}
                        renderOption={(option, selected) => renderOption(option, selected)}
                    />
                </View>
                <View>
                    <AdSelectInput
                        control={control}
                        name="exterior_color"
                        translatedValue
                        options={CAR_COLORS}
                        required
                        isDark={isDark}
                        isRTL={isRTL}
                        renderOption={(option, selected) => renderOption(option, selected)}
                        error={errors.exterior_color?.ref?.name}
                        placeholder={t("createAd.exteriorColor")}
                    />
                </View>
                <View className="flex-row gap-4 items-center mx-5">
                    <View className="flex-1">
                        <AdTextInput
                            required
                            name="mileage"
                            control={control}
                            fullWidth={false}
                            error={errors.mileage?.ref?.name}
                            placeholder={t("createAd.Mileage")}
                            keyboardType="number-pad"
                        />
                    </View>
                    <View className="flex-shrink">
                        <UnitSelector control={control} name="mileage_unit" />
                    </View>
                </View>
            </View>
            <View className="flex-row items-center justify-center w-full mt-6">
                <View className="mx-2 border w-2/5" />
                <Text className="px-2 font-inter-medium text-lg dark:text-white">{t("createAd.optionalInformation")}</Text>
                <View className="mx-2 border w-2/5" />
            </View>
            <View className="gap-y-4 py-1" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <RadioGroup
                    name="fuel_type"
                    control={control}
                    label={t("createAd.fuelType")}
                    fullWidth
                    options={[
                        { id: "Petrol", label: t("createAd.Petrol"), value: "Petrol" },
                        { id: "Diesel", label: t("createAd.Diesel"), value: "Diesel" },
                        { id: "Electric", label: t("createAd.Electric"), value: "Electric" },
                        { id: "Hybrid", label: t("createAd.Hybrid"), value: "Hybrid" },
                    ]}
                />
                <RadioGroup
                    square
                    name="cylinders"
                    borderRadius={5}
                    control={control}
                    label={t("createAd.Cylinders")}
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
                    control={control}
                    borderRadius={30}
                    name="transmission"
                    label={t("transmission")}
                    bordered
                    fullWidth
                    options={[{ id: "auto", label: t("Auto"), value: "Auto" }, { id: "manual", label: t("Manual"), value: "Manual" }]}
                />
                <RadioGroup
                    control={control}
                    borderRadius={30}
                    name="under_warranty"
                    label={t("createAd.underWarranty")}
                    fullWidth
                    bordered
                    options={[{ id: "Yes", label: t("yes"), value: "Yes" }, { id: "No", label: t("no"), value: "No" }]}
                />
                <RadioGroup
                    name="roof"
                    control={control}
                    borderRadius={20}
                    label={t("createAd.roof")}
                    options={[
                        { id: "Sunroof", label: t("createAd.Sunroof"), value: "Sunroof" },
                        { id: "Panoramic", label: t("createAd.Panoramic"), value: "Panoramic" },
                        { id: "Convertible Roof", label: t("createAd.ConvertibleRoof"), value: "ConvertibleRoof" }
                    ]}
                />
            </View>
        </ScrollView>
    )
}