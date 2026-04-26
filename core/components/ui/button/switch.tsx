import useUserPreferencesStore from "@/core/store/preferences.store";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const Switch = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange?: (newValue: boolean) => void;
}) => {
  const isRTL = useUserPreferencesStore(store => store.isRTL)
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, { damping: 15, mass: 0.5 });
  }, [value, progress]);

  const toggleSwitch = () => {
    const newValue = !value;
    onValueChange?.(newValue);
  };

  const animatedTrackStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#e5e7eb", "#FAED02"],
      ),
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: isRTL ? "flex-end" : "flex-start",
    };
  });

  const animatedKnobStyle = useAnimatedStyle(() => {
    const travelDistance = 20;
    const translation = progress.value * travelDistance * (isRTL ? -1 : 1);

    return {
      transform: [{ translateX: translation }],
      flexDirection: isRTL ? "row-reverse" : "row",
    };
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
      <Animated.View style={[styles.track, animatedTrackStyle]}>
        <Animated.View style={[styles.knob, animatedKnobStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Switch;

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 4,
    alignItems: "flex-start",
  },
  knob: {
    width: 20,
    height: 20,
    marginTop: 2,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
