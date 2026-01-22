import useUserPreferencesStore from "@/core/store/preferences.store";
import { Ionicons } from "@expo/vector-icons";
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
  isFavorite: boolean;
  disabled?: boolean;
  color?: string;
  size?: number;
}

export const FavoriteButton = ({
  isFavorite,
  disabled,
  onPress,
  color,
  size = 22,
}: Props) => {
  const { theme } = useUserPreferencesStore();
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

  const iconColor = color ? color : theme !== "light" ? "white" : "black";

  return (
    <Pressable
      hitSlop={10}
      disabled={disabled}
      onPress={handlePress}
      style={{ opacity: disabled || isFavorite ? 0.5 : 1 }}
    >
      <Animated.View style={animatedStyle}>
        <Ionicons
          size={size}
          name={isFavorite ? "star" : "star-outline"}
          color={isFavorite ? "#FAED02" : iconColor}
        />
      </Animated.View>
    </Pressable>
  );
};
