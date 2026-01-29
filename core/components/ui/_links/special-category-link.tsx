import { Text, View } from "react-native";

interface Props {
    label: string
}

export default function SpecialcategoryLink({ label }: Props) {
    return (
        <View className="items-center">
            <View className="w-[100px] h-[55px] rounded-[22px] bg-white dark:border-[#46464640] border border-grayish">
            </View>
            <Text className="font-inter mt-0.5 dark:text-white">{label}</Text>
        </View>
    )
}