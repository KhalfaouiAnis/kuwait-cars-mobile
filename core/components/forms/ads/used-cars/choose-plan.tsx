import { SUBSCRIPTION_PLANS } from "@/core/constants";
import { AdFormStepProps } from "@/core/types";
import { UsedCarAdInterface } from "@/core/types/schema/ads/usedCar";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import SubscriptionCard from "../shared/subscription-card";

export default function ChoosePlan({ setValue, getValue }: AdFormStepProps<UsedCarAdInterface>) {
    const [selectedPlan, setSelectedPlan] = useState(getValue?.("plan"))

    const handleSelectPlan = (plan: string) => {
        setSelectedPlan(plan)
        setValue?.("plan", plan)
    };

    return (
        <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <View className="flex-col gap-4">
                    {SUBSCRIPTION_PLANS.map((plan) => (
                        <SubscriptionCard
                            key={plan.id}
                            plan={plan}
                            isSelected={plan.title === selectedPlan}
                            onSelect={handleSelectPlan}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}