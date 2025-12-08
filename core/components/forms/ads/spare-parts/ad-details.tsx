import AdTextInput from "@/core/components/ui/input/ad-text-input";
import Checkbox from "@/core/components/ui/input/checkbox";
import { AdFormStepProps } from "@/core/types";
import { SparePartAdInterface } from "@/core/types/schema/ads/sparePart";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function AdDetails({ control, errors, setValue, getValue }: AdFormStepProps<SparePartAdInterface>) {
    const [showSecondNumber, setShowSecondNumber] = useState(() => getValue?.("second_additional_number") !== undefined)

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white"
            contentContainerStyle={{ paddingBottom: 10 }}>
            <View className="gap-y-2 mt-4">
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
                <View className="flex-row items-center justify-between border border-gray-200 p-2 mt-6">
                    <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                    <Text>Contact via WhatsApp</Text>
                    <Checkbox onValueChange={(value) => setValue?.("contact_whatsapp", value)} />
                </View>
                <View className="flex-row items-center justify-between border border-gray-200 p-2">
                    <Ionicons name="call-outline" size={24} color="#25D366" />
                    <Text>Receive Calls</Text>
                    <Checkbox onValueChange={(value) => setValue?.("receive_calls", value)} />
                </View>
                <View className="flex-row items-center justify-between border border-gray-200 p-2">
                    <Ionicons name="call-outline" size={24} color="#00A6DA" />
                    <Text>Receive Call via XCar</Text>
                    <Checkbox onValueChange={(value) => setValue?.("xcar_calls", value)} />
                </View>
                <View className="flex-row items-center justify-between border border-gray-200 p-2">
                    <Ionicons name="chatbox-ellipses-outline" size={24} color="#00A6DA" />
                    <Text>Chat via Xcar</Text>
                    <Checkbox onValueChange={(value) => setValue?.("xcar_chat", value)} />
                </View>
            </View>
        </ScrollView>
    )
}