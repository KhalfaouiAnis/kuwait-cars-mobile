import useUserPreferencesStore from '@/core/store/preferences.store';
import { Ionicons } from '@expo/vector-icons';
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
    isFavorite: boolean;
    onPress: () => void;
}

export const FavoriteButton = ({ isFavorite, onPress }: Props) => {
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
                <Ionicons
                    size={22}
                    name={isFavorite ? "star" : "star-outline"}
                    color={isFavorite ? "#FAED02" : theme !== "light" ? "white" : "black"}
                />
            </Animated.View>
        </Pressable>
    );
};