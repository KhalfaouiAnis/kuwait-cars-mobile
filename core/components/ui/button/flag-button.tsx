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
  isFlagged: boolean;
  onPress: () => void;
}

export const FlagButton = ({ isFlagged, onPress }: Props) => {
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
    if (isFlagged) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    scale.value = withSequence(
      withSpring(1.2, snappySpring),
      withSpring(1, snappySpring),
    );
    onPress();
  };

  return (
    <Pressable onPress={handlePress} hitSlop={10} disabled={isFlagged}>
      <Animated.View style={animatedStyle}>
        <Ionicons
          name="flag-outline"
          size={22}
          color={isFlagged ? "#FF0909" : theme !== "light" ? "white" : "black"}
        />
      </Animated.View>
    </Pressable>
  );
};
