import { AdFormStepProps } from "@/core/types";
import { FieldValues } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";

export default function Preview<T extends FieldValues>({ getValue }: AdFormStepProps<T>) {
    const data = getValue?.()

    return (
        <ScrollView
            className="flex-1 px-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}>
            <View className="flex-col gap-4">
                <Text className="font-inter-medium">{data?.ad_type}</Text>
                <Text className="font-inter-medium">{data?.title}</Text>
                <Text className="font-inter-medium">{data?.description}</Text>
            </View>
        </ScrollView>
    )
}