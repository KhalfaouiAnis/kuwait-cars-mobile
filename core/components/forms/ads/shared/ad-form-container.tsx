import Container from "@/core/components/ui/container";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

interface FormContainerProps {
    title: string,
    previous: () => string,
    reset: () => void,
    children: ReactNode,
    isDark?: boolean
}

export default function AdFormContainer({ children, reset, previous, title, isDark }: FormContainerProps) {
    const handlePrevious = () => {
        const result = previous()
        if (result === "route") {
            router.canGoBack() && router.back()
        }
    }

    return (
        <Container>
            <View className='mt-1 flex flex-row items-center justify-between px-4 mb-2 mx-2'>
                <Pressable onPress={handlePrevious}>
                    <Ionicons name='chevron-back' size={22} color={isDark ? "white" : "black"} />
                </Pressable>
                <Text className='font-inter-semibold text-2xl text-center dark:text-white'>{title}</Text>
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