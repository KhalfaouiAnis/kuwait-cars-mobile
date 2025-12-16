import Checkbox from "@/core/components/ui/input/checkbox";
import RadioGroup from "@/core/components/ui/input/radio-group";
import { AdFormStepProps } from "@/core/types";
import { ShowCarAdInterface } from "@/core/types/schema/ads/showCar";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function AdDetails({ control, setValue, getValue, t }: AdFormStepProps<ShowCarAdInterface>) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white"
            contentContainerStyle={{ paddingBottom: 10 }}>
            <View className="gap-y-2 mt-4">
                <View className="mt-8">
                    <RadioGroup
                        control={control}
                        name="hide_license_plate"
                        bordered
                        label={t("Hidevehiclelicenseplate")}
                        fullWidth
                        options={[{ id: "Yes", label: "Yes", value: true }, { id: "No", label: "No", value: false }]}
                    />
                    <Text className="text-sm text-gray-300">{t("hideVehicleLicensePlateForUploadedImages")}</Text>
                </View>
                <View className="mt-8 flex-row items-center justify-between border border-gray-200 dark:border-primary-500 p-2">
                    <Ionicons name="call-outline" size={24} color="#00A6DA" />
                    <Text className="dark:text-white">{t("ReceiveCallViaXCar")}</Text>
                    <Checkbox onValueChange={(value) => setValue?.("xcar_calls", value)} checked={getValue?.("xcar_calls")} />
                </View>
                <View className="flex-row items-center justify-between border border-gray-200 dark:border-primary-500 p-2">
                    <Ionicons name="chatbox-ellipses-outline" size={24} color="#00A6DA" />
                    <Text className="dark:text-white">{t("ChatViaXcar")}</Text>
                    <Checkbox onValueChange={(value) => setValue?.("xcar_chat", value)} checked={getValue?.("xcar_chat")} />
                </View>
                <View className="border border-error gap-y-2 p-3 mt-6">
                    <View>
                        <Text className="font-inter-semibold">Terms and conditions</Text>
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
                            Accessing this service constitutes your <Text className="text-error">agreement</Text> to our <Text className="text-error">terms</Text>, which govern use and are available for <Text className="text-error">review</Text> on our website
                        </Text>
                        <Checkbox size={40} />
                    </View>
                </View>
                <View>
                    <Link href="/general-condition">
                        <View className="flex-row items-start">
                            <Text className="underline text-[#0004DD]">
                                read terms and conditions
                            </Text>
                            <Ionicons name="chevron-forward-outline" size={18} color="#0004DD" />
                        </View>
                    </Link>
                </View>
            </View>
        </ScrollView>
    )
}