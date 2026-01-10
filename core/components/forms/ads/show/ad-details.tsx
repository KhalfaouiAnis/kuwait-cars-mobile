import Checkbox from "@/core/components/ui/input/checkbox";
import RadioGroup from "@/core/components/ui/input/radio-group";
import { AdFormStepProps } from "@/core/types";
import { ShowCarAdInterface } from "@/core/types/schema/ads/showCar";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import XCarCall from "../shared/contact/xcar-call";
import XCarChat from "../shared/contact/xcar-chat";

export default function AdDetails({ control, setValue, getValue }: AdFormStepProps<ShowCarAdInterface>) {
    const { t } = useTranslation("common")

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 px-2"
            contentContainerStyle={{ paddingBottom: 10 }}>
            <View className="gap-y-2 mt-4">
                <View className="mt-8">
                    <RadioGroup
                        control={control}
                        name="hide_license_plate"
                        bordered
                        label={t("createAd.Hidevehiclelicenseplate")}
                        fullWidth
                        options={[{ id: "Yes", label: "Yes", value: true }, { id: "No", label: "No", value: false }]}
                    />
                    <Text className="text-sm text-gray-300">{t("createAd.hideVehicleLicensePlateForUploadedImages")}</Text>
                </View>

                <View className="mt-4 gap-y-4">
                    <XCarCall label={t("createAd.ReceiveCallViaXCar")} getValue={getValue} setValue={setValue} />
                    <XCarChat label={t("createAd.ChatViaXcar")} getValue={getValue} setValue={setValue} />
                </View>

                <View className="border border-error gap-y-2 p-3 mt-6">
                    <View>
                        <Text className="font-inter-semibold">{t("createAd.TermsAndConditions.TermsAndConditions")}</Text>
                    </View>
                    <View>
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="checkmark-outline" color="#FAED02" size={20} />
                            <Text className="text-gray-400">Term 1</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="checkmark-outline" color="#FAED02" size={20} />
                            <Text className="text-gray-400">Term 2</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="checkmark-outline" color="#FAED02" size={20} />
                            <Text className="text-gray-400">Term 3</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="checkmark-outline" color="#FAED02" size={20} />
                            <Text className="text-gray-400">Term 4</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center gap-2 flex-1">
                        <Text className="flex-1">
                            {t("createAd.TermsAndConditions.AccessingThisServiceConstitutesYour")} <Text className="text-error">{t("createAd.TermsAndConditions.agreement")}</Text> {t("createAd.TermsAndConditions.toOur")} <Text className="text-error">{t("createAd.TermsAndConditions.terms")}</Text>, {t("createAd.TermsAndConditions.whichGovernUseAndAreAvailableFor")} <Text className="text-error">{t("createAd.TermsAndConditions.review")}</Text> {t("createAd.TermsAndConditions.OnOurWebsite")}
                        </Text>
                        <Checkbox size={40} />
                    </View>
                </View>
                <View>
                    <Link href="/general-condition">
                        <View className="flex-row items-start">
                            <Text className="underline text-[#0004DD]">
                                {t("createAd.TermsAndConditions.readTermsAndConditions")}
                            </Text>
                            <Ionicons name="chevron-forward-outline" size={18} color="#0004DD" />
                        </View>
                    </Link>
                </View>
            </View>
        </ScrollView>
    )
}