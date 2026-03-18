import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

interface Props {
  onPress: () => void;
  disabled?: boolean;
  color?: string;
  size?: number;
}

export const ShareButton = ({ disabled, onPress, color, size = 22 }: Props) => {
  const { dark } = useTheme()
  const scale = useSharedValue(1);

  const snappySpring = {
    damping: 45,
    stiffness: 600,
    mass: 0.5,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    scale.value = withSequence(
      withSpring(1.2, snappySpring),
      withSpring(1, snappySpring),
    );
    onPress();
  };

  const iconColor = color ? color : dark ? "white" : "black";

  return (
    <Pressable onPress={handlePress} hitSlop={10} disabled={disabled}>
      <Animated.View style={animatedStyle}>
        <Feather name="share-2" size={size} color={iconColor} />
      </Animated.View>
    </Pressable>
  );
};
