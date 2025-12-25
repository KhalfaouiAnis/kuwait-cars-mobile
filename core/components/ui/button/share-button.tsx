import useUserPreferencesStore from '@/core/store/preferences.store';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
} from 'react-native-reanimated';

interface Props {
    onPress: () => void;
}

export const ShareButton = ({ onPress }: Props) => {
    const { theme } = useUserPreferencesStore()
    const scale = useSharedValue(1);

    const snappySpring = {
        damping: 25,
        stiffness: 300,
        mass: 0.5,
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        scale.value = withSequence(
            withSpring(1.35, snappySpring),
            withSpring(1, snappySpring)
        );
        onPress();
    };

    return (
        <Pressable onPress={handlePress} hitSlop={10}>
            <Animated.View style={animatedStyle}>
                <Feather name="share-2" size={22} color={theme !== "light" ? "white" : "black"} />
            </Animated.View>
        </Pressable>
    );
};