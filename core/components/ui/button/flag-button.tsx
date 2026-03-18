import { Ionicons } from "@expo/vector-icons";
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
  isFlagged: boolean;
  disabled?: boolean;
  color?: string;
  size?: number;
}

export const FlagButton = ({
  isFlagged,
  onPress,
  disabled,
  color,
  size = 22,
}: Props) => {
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
    if (isFlagged) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    scale.value = withSequence(
      withSpring(1.2, snappySpring),
      withSpring(1, snappySpring),
    );
    onPress();
  };

  const iconColor = color ? color : dark ? "white" : "black";

  return (
    <Pressable
      hitSlop={10}
      onPress={handlePress}
      disabled={disabled || isFlagged}
      style={{ opacity: disabled || isFlagged ? 0.5 : 1 }}
    >
      <Animated.View style={animatedStyle}>
        <Ionicons
          size={size}
          name="flag-outline"
          color={isFlagged ? "#FF0909" : iconColor}
        />
      </Animated.View>
    </Pressable>
  );
};
