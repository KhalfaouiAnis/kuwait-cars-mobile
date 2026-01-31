import MoneySign from "@/assets/svg/plan-money-sign";
import SubscriptionPlan from "@/assets/svg/subscription-plan";
import { SubscriptionDetail } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    isSelected: boolean,
    plan: SubscriptionDetail,
    onSelect: (plan: SubscriptionDetail) => void
}

export default function SubscriptionCard({ plan, isSelected, onSelect }: Props) {
    return (
        <TouchableOpacity
            onPress={() => onSelect(plan)}
            style={boxShadow(0, 5, 10).button}
            className={`bg-whitish rounded-2xl p-6 relative mt-10 border ${isSelected ? 'border-[#25D366]' : 'border-gray-100 dark:border-primary-500'}`}
        >
            <View className="absolute -top-[26px] -right-4 z-10">
                <SubscriptionPlan price={plan.price} recColor={plan.price === 0 ? "#D9D9D9" : "#FFF12E"} textColor={"black"} />
            </View>
            <View className="flex-row items-start justify-between">
                <View className="flex-row gap-3 items-center">
                    <View className="items-center justify-center p-4 bg-gray-100 rounded-[50px]">
                        <MoneySign />
                    </View>
                    <View>
                        <Text className="text-xl font-inter-semibold dark:text-secondary-900">{plan.title}</Text>
                    </View>
                </View>
            </View>
            <View className="mt-4 ms-8">
                {plan.features.map((feature: any, index: number) => (
                    <View key={index} className="flex-row items-center mb-2">
                        <AntDesign name="check" size={22} color="#FAED02" />
                        <Text className="ml-2 text-gray-600 dark:text-secondary-900">{feature}</Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    )
}