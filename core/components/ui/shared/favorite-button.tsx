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
                    name={isFavorite ? "star" : "star-outline"}
                    size={22} color={isFavorite ? "#FAED02" : "black"} />
            </Animated.View>
        </Pressable>
    );
};