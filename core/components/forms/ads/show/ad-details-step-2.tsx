import Checkbox from "@/core/components/ui/input/checkbox";
import RadioGroup from "@/core/components/ui/input/radio-group";
import { AdFormStepProps } from "@/core/types";
import { ShowCarAdInterface } from "@/core/types/schema/ads/showCar";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function AdDetailsStep2({ control, setValue }: AdFormStepProps<ShowCarAdInterface>) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white"
            contentContainerStyle={{ paddingBottom: 10 }}>
            <View className="gap-y-2 mt-4">
                <View className="mt-8">
                    <RadioGroup
                        name="hide_license_plate"
                        bordered
                        control={control}
                        label="Hide vehicle license plate:"
                        fullWidth
                        options={[{ id: "Yes", label: "Yes", value: "Yes" }, { id: "No", label: "No", value: "No" }]}
                    />
                </View>
                <View className="border border-error gap-y-2 p-3 mt-4">
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