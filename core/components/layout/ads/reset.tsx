import { Text, TouchableOpacity } from "react-native";

export default function Reset({ reset }: { reset: () => void }) {
    return (
        <TouchableOpacity className='p-2 border border-gray-200 rounded-2xl' onPress={reset}>
            <Text className='text-error'>
                Reset
            </Text>
        </TouchableOpacity>
    )
}