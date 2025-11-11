import { Text, TouchableOpacity } from "react-native";

export default function Reset({ reset }: { reset: () => void }) {
    return (
        <TouchableOpacity className='p-2' onPress={reset}>
            <Text className='text-error'>
                Reset
            </Text>
        </TouchableOpacity>
    )
}