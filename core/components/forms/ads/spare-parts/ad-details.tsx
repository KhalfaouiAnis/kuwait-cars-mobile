import AdTextInput from "@/core/components/ui/input/ad-text-input";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdFormStepProps } from "@/core/types";
import { SparePartAdInterface } from "@/core/types/schema/ads/sparePart";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ReceiveCall from "../shared/contact/receive-call";
import WhatsappContact from "../shared/contact/whatsapp";
import XCarCall from "../shared/contact/xcar-call";
import XCarChat from "../shared/contact/xcar-chat";

export default function AdDetails({ control, errors, t, setValue, getValue }: AdFormStepProps<SparePartAdInterface>) {
    const [showSecondNumber, setShowSecondNumber] = useState(() => getValue?.("second_additional_number") !== undefined)
    const { isRTL } = useUserPreferencesStore()

    return (
        <ScrollView
            className="flex-1 px-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}>
            <View className="gap-y-2 mt-4" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <View className="relative">
                    <AdTextInput
                        control={control}
                        name="additional_number"
                        keyboardType="numeric"
                        extraPadding
                        error={errors.additional_number?.message} placeholder="Add Additional Number" />
                    {
                        !showSecondNumber && (
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
                        readOnly={!showSecondNumber}
                        keyboardType="numeric"
                        extraPadding
                        error={errors.additional_number?.message} placeholder="Add Additional Number" />
                </View>
                <View className="mt-4 gap-y-4">
                    <WhatsappContact t={t} getValue={getValue} setValue={setValue} />
                    <ReceiveCall t={t} getValue={getValue} setValue={setValue} />
                    <XCarCall t={t} getValue={getValue} setValue={setValue} />
                    <XCarChat t={t} getValue={getValue} setValue={setValue} />
                </View>
            </View>
        </ScrollView>
    )
}