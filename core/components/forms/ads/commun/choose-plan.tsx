import { SUBSCRIPTION_PLANS, SubscriptionDetail } from "@/core/constants/ad";
import { AdFormStepProps } from "@/core/types";
import { CommunAdInterface } from "@/core/types/schema/ads/commun";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import SubscriptionCard from "../shared/subscription-card";

export default function ChoosePlan({ setValue, getValue }: AdFormStepProps<CommunAdInterface>) {
    const [selectedPlan, setSelectedPlan] = useState<Omit<SubscriptionDetail, "adTypes" | "id"> | undefined>(() => getValue?.("plan"))
    const { ad_type } = useLocalSearchParams<{ ad_type: string }>()

    const handleSelectPlan = (plan: SubscriptionDetail) => {
        setSelectedPlan(plan)
        setValue?.("plan", plan)
    };

    return (
        <ScrollView
            className="flex-1 px-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}>
            <View className="flex-col gap-4">
                {SUBSCRIPTION_PLANS.filter(ad => ad.adTypes.some(type => type === ad_type)).map((plan) => (
                    <SubscriptionCard
                        key={plan.id}
                        plan={plan}
                        isSelected={plan.type === selectedPlan?.type}
                        onSelect={handleSelectPlan}
                    />
                ))}
            </View>
        </ScrollView>
    )
}