import AdTextInput from "@/core/components/ui/input/ad-text-input";
import RadioGroup from "@/core/components/ui/input/radio-group";
import { AdFormStepProps } from "@/core/types";
import { MotorcycleAdInterface } from "@/core/types/schema/ads/motorcycle";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ReceiveCall from "../shared/contact/receive-call";
import WhatsappContact from "../shared/contact/whatsapp";
import XCarCall from "../shared/contact/xcar-call";
import XCarChat from "../shared/contact/xcar-chat";

export default function AdDetailsStep2({ control, errors, setValue, getValue }: AdFormStepProps<MotorcycleAdInterface>) {
    const [showSecondNumber, setShowSecondNumber] = useState(() => getValue?.("second_additional_number") !== undefined)
    const { t } = useTranslation("common")

    return (
        <ScrollView
            className="flex-1 px-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
        >
            <View className="gap-y-2 mt-4">
                <View className="relative">
                    <AdTextInput
                        control={control}
                        name="additional_number"
                        keyboardType="numeric"
                        extraPadding
                        error={errors.additional_number?.ref?.name}
                        placeholder={t("createAd.AddAdditionalNumber")}
                    />
                    {
                        (!showSecondNumber) && (
                            <TouchableOpacity
                                className="absolute top-3.5 end-2 rounded-full bg-primary-500 p-2"
                                onPress={() => setShowSecondNumber(true)}>
                                <Ionicons name="add" size={24} />
                            </TouchableOpacity>
                        )
                    }
                </View>
                <View style={{ opacity: showSecondNumber ? 1 : 0 }}>
                    <AdTextInput
                        control={control}
                        name="second_additional_number"
                        readOnly={(!showSecondNumber)}
                        keyboardType="numeric"
                        extraPadding
                        error={errors.additional_number?.ref?.name}
                        placeholder={t("createAd.AddAdditionalNumber")}
                    />
                </View>

                <View className="mt-4">
                    <RadioGroup
                        name="hide_license_plate"
                        bordered
                        control={control}
                        label={t("createAd.Hidevehiclelicenseplate")}
                        fullWidth
                        options={[{ id: "Yes", label: t("Yes"), value: true }, { id: "No", label: t("No"), value: false }]}
                    />
                    <Text className="text-sm text-gray-300">{t("createAd.hideVehicleLicensePlateForUploadedImages")}</Text>
                </View>

                <View className="mt-4 gap-y-4">
                    <WhatsappContact label={t("createAd.ContactViaWhatsApp")} getValue={getValue} setValue={setValue} />
                    <ReceiveCall label={t("createAd.ReceiveCalls")} getValue={getValue} setValue={setValue} />
                    <XCarCall label={t("createAd.ReceiveCallViaXCar")} getValue={getValue} setValue={setValue} />
                    <XCarChat label={t("createAd.ChatViaXcar")} getValue={getValue} setValue={setValue} />
                </View>
            </View>
        </ScrollView>
    )
}