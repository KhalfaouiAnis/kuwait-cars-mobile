import { SUBSCRIPTION_PLANS } from "@/core/constants";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import SubscriptionCard from "./subscription-card";

export default function ChoosePlan() {
    const [selectedPlan, setSelectedPlan] = useState(SUBSCRIPTION_PLANS[0].id);

    const handleSelectPlan = (plan: string) => {
        setSelectedPlan(plan);
    };

    return (
        <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <View className="flex-col gap-4">
                    {SUBSCRIPTION_PLANS.map((plan) => (
                        <SubscriptionCard
                            key={plan.id}
                            plan={plan}
                            isSelected={plan.id === selectedPlan}
                            onSelect={handleSelectPlan}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}