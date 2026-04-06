import { BaseStepViewProps } from "@/core/components/ui";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import SelectedAdType from "../ad-type-selector/selected-ad-type";
import StepField from "../step-field";

export default function BasicInfo<T extends FieldValues>({ fields }: BaseStepViewProps<T>) {
    const { t: tBrands } = useTranslation("car_categories")
    const { model, brand } = useLocalSearchParams()
    const { isRTL } = useUserPreferencesStore()
    const { t } = useTranslation("common")

    const label = `${tBrands(brand)}${model ? "-" + tBrands(model) : ""}`

    return (
        <>
            <View className="flex-row items-center justify-center w-full">
                <View className="border-[1.5px] border-primary-500 w-2/5" />
                <Text className="px-2 text-error font-inter text-lg">{t("createAd.requiredInformation")}</Text>
                <View className="border-[1.5px] border-primary-500 w-2/5" />
            </View>
            <View className="gap-y-5 mt-2" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <View>
                    <View className="flex-row items-center justify-between px-2 mb-3">
                        <Text className="font-inter text-blue dark:text-white">{t("createAd.whatAreYouSelling")}</Text>
                        <Text className="text-sm font-inter text-gray-300">{t("adCategories.used_cars")}</Text>
                    </View>
                    <SelectedAdType
                        label={label}
                        icon={<Ionicons name="car-sport-outline" color="black" size={20} />}
                    />
                </View>
                <StepField config={fields.year!} />
                <StepField config={fields.exterior_color!} />
                <View className="flex-row gap-4 items-center mx-5">
                    <View className="flex-1">
                        <StepField config={fields.mileage!} />
                    </View>
                    <View className="flex-shrink">
                        <StepField config={fields.mileage_unit!} />
                    </View>
                </View>
                <View className="mt-4 px-4">
                    <StepField config={fields.hide_license_plate!} />
                    <Text className="text-sm text-gray-300 mt-1.5">{t("createAd.hideVehicleLicensePlateForUploadedImages")}</Text>
                </View>
            </View>
            <View className="flex-row items-center justify-center w-full mt-6">
                <View className="mx-2 border w-2/5" />
                <Text className="px-2 font-inter-medium text-lg text-orange dark:text-white">{t("createAd.optionalInformation")}</Text>
                <View className="mx-2 border w-2/5" />
            </View>
            <View className="gap-y-4 py-1" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <StepField config={fields.fuel_type!} />
                <StepField config={fields.cylinders!} />
                <StepField config={fields.transmission!} />
                <StepField config={fields.under_warranty!} />
                {fields.roof && <StepField config={fields.roof!} />}
            </View>
        </>
    )
}