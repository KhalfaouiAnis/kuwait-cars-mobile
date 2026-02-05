import { BaseStepViewProps } from "@/core/components/ui";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdvertisementInterface } from "@/core/types";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import SelectedAdType from "../ad-type-selector/selected-ad-type";
import StepField from "../step-field";

export default function DetailedInfo({ control, fields }: BaseStepViewProps<AdvertisementInterface>) {
    const { model, brand } = useLocalSearchParams()
    const { t } = useTranslation("common")
    const { t: tBrands } = useTranslation("car_categories")
    const { isRTL } = useUserPreferencesStore()

    return (
        <>
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
                    <StepField
                        config={fields.year!}
                        control={control}
                    />
                </View>
                <View>

                </View>
                <View className="flex-row gap-4 items-center mx-5">
                    <View className="flex-1">

                    </View>
                    <View className="flex-shrink">
                        {/* <UnitSelector control={control} name="mileage_unit" /> */}
                    </View>
                </View>
            </View>
        </>
    )
}