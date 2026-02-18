import { BaseStepViewProps } from "@/core/components/ui";
import Checkbox from "@/core/components/ui/input/checkbox/checkbox";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import StepField from "../step-field";

export default function DetailedInfo2<T extends FieldValues>({ fields }: BaseStepViewProps<T>) {
    const { getValues } = useFormContext()
    const [showSecondNumber, setShowSecondNumber] = useState(() => getValues("second_additional_number") !== undefined)
    const { isRTL } = useUserPreferencesStore()
    const { t } = useTranslation("common")

    return (
        <View className="gap-y-2 mt-4" style={{ direction: isRTL ? "rtl" : "ltr" }}>
            {fields.contact_whatsapp && <>
                <View className="relative">
                    {
                        (!showSecondNumber) && (
                            <TouchableOpacity
                                hitSlop={20}
                                className="absolute top-3.5 end-10 w-10 h-10 z-20 items-center justify-center"
                                onPress={() => setShowSecondNumber(true)}>
                                <Ionicons name="add" size={28} />
                            </TouchableOpacity>
                        )
                    }
                    <StepField config={fields.additional_number!} />
                </View>
                <View style={{ opacity: showSecondNumber ? 1 : 0, marginTop: 4 }}>
                    <StepField config={fields.second_additional_number!} />
                </View>
            </>}
            <View className="mt-4 gap-y-6">
                {fields.contact_whatsapp && <StepField config={fields.contact_whatsapp!} />}
                {fields.receive_calls && <StepField config={fields.receive_calls!} />}
                {fields.xcar_calls && <StepField config={fields.xcar_calls!} />}
                {fields.xcar_chat && <StepField config={fields.xcar_chat!} />}
            </View>

            {
                !fields.contact_whatsapp && (
                    <>
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
                    </>
                )
            }

        </View>
    )
}