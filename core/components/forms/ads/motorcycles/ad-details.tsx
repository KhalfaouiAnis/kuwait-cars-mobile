import AdSelectInput from "@/core/components/ui/input/ad-select-input";
import AdTextInput from "@/core/components/ui/input/ad-text-input";
import RadioGroup from "@/core/components/ui/input/radio-group";
import UnitSelector from "@/core/components/ui/menu/unit-selector";
import { YEARS } from "@/core/constants";
import useColors from "@/core/hooks/ad/useColors";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdFormStepProps } from "@/core/types";
import { MotorcycleAdInterface } from "@/core/types/schema/ads/motorcycle";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { renderOption } from "../../../ui/shared/render-option";
import SelectedAdType from "../shared/ad-type-selector/selected-ad-type";

export default function AdDetails({ control, errors, setValue, isDark }: AdFormStepProps<MotorcycleAdInterface>) {
    const { ad_type, ad_category, brand } = useLocalSearchParams()
    const CAR_COLORS = useColors()
    const { isRTL } = useUserPreferencesStore()
    const { t } = useTranslation("common")

    useEffect(() => {
        setValue?.("ad_type", ad_type as string)
        setValue?.("ad_category", ad_category as string)
        setValue?.("brand", brand as string)
    }, [ad_type, ad_category, brand, setValue])

    return (
        <ScrollView
            className="flex-1 px-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
        >
            <View className="flex-row items-center justify-center w-full">
                <View className="border border-primary-500 w-2/5" />
                <Text className="px-2 text-error font-inter-medium text-lg">{t("createAd.requiredInformation")}</Text>
                <View className="border border-primary-500 w-2/5" />
            </View>
            <View className="mt-2" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <View className="flex-row items-center justify-between">
                    <Text className="font-semibold mb-2 dark:text-white">{t("createAd.whatAreYouSelling")}</Text>
                    <Text className="text-sm text-gray-300">{t("adCategories.motorcycles")}</Text>
                </View>
                <SelectedAdType
                    label={`${ad_category}-${brand}`}
                    icon={<Ionicons name="car-sport-outline" color="gray" size={20} />}
                />
            </View>
            <View className="gap-y-4 mt-4" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <View>
                    <AdSelectInput
                        control={control}
                        name="year"
                        options={YEARS}
                        required
                        isDark={isDark}
                        renderOption={(option, selected) => renderOption(option, selected as string)}
                        error={errors.year?.ref?.name}
                        placeholder={t("year")}
                    />
                </View>
                <View>
                    <AdSelectInput
                        control={control}
                        name="exterior_color"
                        options={CAR_COLORS}
                        translatedValue
                        required
                        isDark={isDark}
                        isRTL={isRTL}
                        renderOption={(option, selected) => renderOption(option, selected as string)}
                        error={errors.exterior_color?.ref?.name}
                        placeholder={t("createAd.exteriorColor")}
                    />
                </View>
                <View className="flex-row gap-3 items-center">
                    <View className="flex-1">
                        <AdTextInput
                            control={control}
                            name="mileage"
                            required
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
                <View className="border border-primary-500 w-2/5" />
                <Text className="px-2 font-inter-medium text-lg dark:text-white">{t("createAd.optionalInformation")}</Text>
                <View className="border border-primary-500 w-2/5" />
            </View>
            <View className="gap-y-4 py-1">
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
                    name="cylinders"
                    control={control}
                    label={t("createAd.Cylinders")}
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
                    label={t("transmission")}
                    bordered
                    fullWidth
                    options={[{ id: "auto", label: t("Auto"), value: "Auto" }, { id: "manual", label: t("Manual"), value: "Manual" }]}
                />
                <RadioGroup
                    name="under_warranty"
                    control={control}
                    label={t("createAd.underWarranty")}
                    fullWidth
                    bordered
                    options={[{ id: "Yes", label: t("yes"), value: "Yes" }, { id: "No", label: t("no"), value: "No" }]}
                />
            </View>
        </ScrollView>
    )
}