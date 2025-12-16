import { SUBSCRIPTION_PLANS } from "@/core/constants/ad";
import { AdFormStepProps } from "@/core/types";
import { SparePartAdInterface } from "@/core/types/schema/ads/sparePart";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import SubscriptionCard from "../shared/subscription-card";

export default function ChoosePlan({ setValue, getValue, t }: AdFormStepProps<SparePartAdInterface>) {
    const [selectedPlan, setSelectedPlan] = useState(getValue?.("plan"))

    const handleSelectPlan = (plan: string) => {
        setSelectedPlan(plan)
        setValue?.("plan", plan)
    };

    return (
        <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <View className="flex-col gap-4">
                    {SUBSCRIPTION_PLANS.filter(ad => ad.adTypes.some(type => type === getValue?.("ad_type"))).map((plan) => (
                        <SubscriptionCard
                            key={plan.id}
                            plan={plan}
                            isSelected={plan.title === selectedPlan}
                            onSelect={handleSelectPlan}
                            t={t}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}