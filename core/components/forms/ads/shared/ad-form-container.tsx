import Container from "@/core/components/ui/container";
import BackArrow from "@/core/components/ui/shared/back-arrow";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

interface FormContainerProps {
    title: string,
    resetLabel: string;
    previous: () => string,
    reset: () => void,
    children: ReactNode,
    isRTL?: boolean
    isDark?: boolean
}

export default function AdFormContainer({ children, reset, resetLabel, previous, title, isRTL, isDark }: FormContainerProps) {
    const handlePrevious = () => {
        const result = previous()
        if (result === "route") {
            router.canGoBack() && router.back()
        }
    }

    return (
        <Container>
            <View style={{ direction: isRTL ? "rtl" : "ltr" }} className='mt-1 flex flex-row items-center justify-between px-4 mb-2 mx-2'>
                {/* <Pressable onPress={handlePrevious}>
                    <Ionicons name={isRTL ? 'chevron-forward' : 'chevron-back'} size={22} color={isDark ? "white" : "black"} />
                </Pressable> */}
                <BackArrow navigate={handlePrevious} />
                <Text className='font-inter-semibold text-2xl text-center dark:text-white'>{title}</Text>
                <Pressable onPress={reset}>
                    <Text className="text-error">{resetLabel}</Text>
                </Pressable>
            </View>
            <View className="mt-4 px-4 mx-2 flex-1">
                {children}
            </View>
        </Container>
    )
}