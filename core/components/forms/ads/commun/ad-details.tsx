import AdTextInput from "@/core/components/ui/input/ad-text-input";
import Checkbox from "@/core/components/ui/input/checkbox";
import { AdFormStepProps } from "@/core/types";
import { CommunAdInterface } from "@/core/types/schema/ads/commun";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";

export default function AdDetails({ control, errors, setValue }: AdFormStepProps<CommunAdInterface>) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 10 }}>
            <View className="gap-y-4 mt-4">
                <View>
                    <AdTextInput
                        control={control}
                        name="additional_number"
                        keyboardType="numeric"
                        error={errors.additional_number?.message} placeholder="Add Additional Number" />
                </View>

                <View className="flex-row items-center justify-between border border-gray-200 p-2 mt-6">
                    <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                    <Text className="dark:text-white">Contact via WhatsApp</Text>
                    <Checkbox onValueChange={(value) => setValue?.("contact_whatsapp", value)} />
                </View>
                <View className="flex-row items-center justify-between border border-gray-200 p-2">
                    <Ionicons name="call-outline" size={24} color="#25D366" />
                    <Text className="dark:text-white">Receive Calls</Text>
                    <Checkbox onValueChange={(value) => setValue?.("contact_whatsapp", value)} />
                </View>
                <View className="flex-row items-center justify-between border border-gray-200 p-2">
                    <Ionicons name="call-outline" size={24} color="#00A6DA" />
                    <Text className="dark:text-white">Receive Call via XCar</Text>
                    <Checkbox onValueChange={(value) => setValue?.("contact_whatsapp", value)} />
                </View>
                <View className="flex-row items-center justify-between border border-gray-200 p-2">
                    <Ionicons name="chatbox-ellipses-outline" size={24} color="#00A6DA" />
                    <Text className="dark:text-white">Chat via Xcar</Text>
                    <Checkbox onValueChange={(value) => setValue?.("contact_whatsapp", value)} />
                </View>
            </View>
        </ScrollView>
    )
}