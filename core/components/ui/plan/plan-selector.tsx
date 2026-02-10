import { useLocalSearchParams } from "expo-router";
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { View } from "react-native";
import { PlanSelectorProps } from "..";
import SubscriptionCard from '../../forms/ads/shared/subscription-card';

export default function PlanSelector<TForm extends FieldValues>({ name, plans }: PlanSelectorProps<TForm>) {
    const { ad_type } = useLocalSearchParams<{ ad_type: string }>()
    const { control } = useFormContext();
    const { field } = useController({ name, control });
    const selectedPlan = field.value;

    const filteredPlans = plans.filter(plan =>
        plan.adTypes.some(type => type === ad_type)
    );

    return (
        <View className="flex-col gap-4">
            {filteredPlans.map((plan) => (
                <SubscriptionCard
                    plan={plan}
                    key={plan.id}
                    onSelect={() => field.onChange(plan)}
                    isSelected={plan.type === selectedPlan?.type}
                />
            ))}
        </View>
    )
}