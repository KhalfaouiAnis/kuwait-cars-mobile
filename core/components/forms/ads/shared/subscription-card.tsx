import MoneySign from "@/assets/svg/plan-money-sign";
import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    plan: any,
    isSelected: boolean,
    onSelect: (plan: string) => void
}

export default function SubscriptionCard({ plan, isSelected, onSelect }: Props) {
    return (
        <View
            className={`bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden border ${isSelected ? 'border-red-500' : 'border-transparent'}`}
            style={{ shadowRadius: 16, elevation: 4 }}
        >
            <View className="flex-row items-start justify-between">
                <View className="flex-row gap-3 items-center">
                    <View className="items-center justify-center p-4 bg-[#F3F4F8] rounded-[50px]">
                        <MoneySign />
                    </View>
                    <View>
                        <Text className="text-xl font-inter-medium text-gray-400">{plan.description}</Text>
                        <Text className="text-xl font-inter-semibold">{plan.title}</Text>
                    </View>
                </View>
            </View>
            <View className="mt-4 ms-8">
                {plan.features.map((feature: any, index: number) => (
                    <View key={index} className="flex-row items-center mb-2">
                        <AntDesign name="check" size={22} color="#FAED02" />
                        <Text className="ml-2 text-gray-600 dark:text-gray-300">{feature}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity className="mt-4 ms-8 bg-primary-500 py-2 items-center justify-center rounded-3xl"
                onPress={() => onSelect(plan.title)}
            >
                <Text className="font-inter-semibold text-lg">
                    Choose this plan
                </Text>
            </TouchableOpacity>
        </View>
    )
}
