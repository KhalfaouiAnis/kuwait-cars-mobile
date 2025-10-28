import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import Container from "../../ui/container";

interface FormContainerProps {
    title: string,
    reset: () => void,
    children: ReactNode
}

export default function AdFormContainer({ children, reset, title }: FormContainerProps) {
    const onBack = () => {
        router.canGoBack() && router.back()
    }

    return (
        <Container>
            <View className='mt-1 flex flex-row items-center justify-between px-4 mb-2 mx-2'>
                <Pressable onPress={onBack}>
                    <Ionicons name='chevron-back' size={22} />
                </Pressable>
                <Text className='font-inter-semibold text-2xl text-center'>{title}</Text>
                <Pressable onPress={reset}>
                    <Text className="text-error">Reset</Text>
                </Pressable>
            </View>
            <View className="mt-4 px-4 mx-2 flex-1">
                {children}
            </View>
        </Container>
    )
}