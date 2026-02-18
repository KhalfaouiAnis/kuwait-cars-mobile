import { BaseStepViewProps } from "@/core/components/ui";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import SelectedAdType from "../ad-type-selector/selected-ad-type";
import StepField from "../step-field";

export default function DetailedInfo<T extends FieldValues>({ fields }: BaseStepViewProps<T>) {
    const { model, brand, ad_type } = useLocalSearchParams()
    const { t } = useTranslation("common")
    const { t: tBrands } = useTranslation("car_categories")
    const { isRTL } = useUserPreferencesStore()

    return (
        <View className="gap-y-5 mt-2 px-3" style={{ direction: isRTL ? "rtl" : "ltr" }}>
            <View>
                <View className="flex-row items-center justify-between mb-2">
                    <Text className="font-inter text-blue dark:text-white">{t("createAd.whatAreYouSelling")}</Text>
                    <Text className="text-sm text-gray-300">{t(`adCategories.${ad_type}`)}</Text>
                </View>
                {fields.price &&
                    <SelectedAdType
                        label={`${tBrands(brand)}-${tBrands(model)}`}
                        icon={<Ionicons name="car-sport-outline" color="black" size={20} />}
                    />
                }
            </View>
            {fields.province && <View className="mt-4">
                <View className="mb-6">
                    <Text className="font-inter text-blue dark:text-white">{t("createAd.WhereIsYourListing")}</Text>
                    <StepField config={fields.province!} />
                </View>
                <StepField config={fields.area!} />
                <Text className="text-center text-grayish my-2">{t("or")}</Text>
                <StepField config={fields.location!} />
            </View>}
            {fields.hide_license_plate &&
                <View className="mt-4 px-4">
                    <StepField config={fields.hide_license_plate!} />
                    <Text className="text-sm text-gray-300 mt-1.5">{t("createAd.hideVehicleLicensePlateForUploadedImages")}</Text>
                </View>
            }
            <View className="mt-3 gap-3">
                {fields.price && <StepField config={fields.price!} />}
                <StepField config={fields.title!} />
                <StepField config={fields.description!} />
            </View>
        </View>
    )
}