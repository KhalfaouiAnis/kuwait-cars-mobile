import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { BackHandler } from "react-native";

type UseLeaveConfirmationProps = {
  isDirty: boolean;
  onLeave?: () => void;
};

export const useLeaveConfirmation = ({
  isDirty,
  onLeave,
}: UseLeaveConfirmationProps) => {
  const [showDialog, setShowDialog] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (!isDirty) return true;

        setShowDialog(true);
        return false; // Block exit
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [isDirty])
  );

  const handleLeave = () => {
    setShowDialog(false);
    onLeave?.();
  };

  const handleStay = () => {
    setShowDialog(false);
  };

  return { showDialog, handleLeave, handleStay };
};
