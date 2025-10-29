import { StepProps } from "@/core/types";
import { ScrollView, Text, View } from "react-native";
import AdTextInput from "../../ui/input/ad-text-input";

export default function AdDetailsStep2({ control, errors }: StepProps) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white"
            contentContainerStyle={{ paddingBottom: 60 }}>
            <View className="gap-y-2 mt-4">
                <View>
                    <AdTextInput
                        control={control}
                        name="title"
                        error={errors.title?.message} placeholder="Title" />
                    <Text className="ms-auto text-gray-400 mt-1">Left: 100</Text>
                </View>
                <View>
                    <AdTextInput
                        control={control}
                        name="description"
                        error={errors.description?.message} placeholder="Advertisement Description"
                        multiline
                        numberOfLines={4}
                        style={{ height: 120 }}
                    />
                    <Text className="ms-auto text-gray-400 mt-1">Left: 100</Text>
                </View>
                <View>
                    <AdTextInput
                        control={control}
                        name="additional_number"
                        keyboardType="numeric"
                        error={errors.additional_number?.message} placeholder="Add Additional Number" />
                </View>

            </View>
        </ScrollView>
    )
}