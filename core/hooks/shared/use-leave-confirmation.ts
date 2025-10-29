import { useFocusEffect, useNavigation, usePathname } from "expo-router";
import { useCallback, useState } from "react";

type UseLeaveConfirmationProps = {
  hasUnsavedChanges: boolean;
  onConfirmLeave?: () => void;
  onCancelLeave?: () => void;
};

export const useLeaveConfirmation = ({
  hasUnsavedChanges,
  onConfirmLeave,
  onCancelLeave,
}: UseLeaveConfirmationProps) => {
  const [showDialog, setShowDialog] = useState(true);
  const navigation = useNavigation();
  const pathname = usePathname();

  const handleBack = useCallback(() => {
    if (!hasUnsavedChanges || pathname !== "/new-ad") {
      return true;
    }

    setShowDialog(true);

    return false;
  }, [hasUnsavedChanges]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        if (handleBack()) {
          navigation.dispatch(e.data.action);
        }
      });

      return unsubscribe;
    }, [navigation, handleBack])
  );

  // useEffect(() => {
  //   const onBackPress = () => {
  //     if (!isDirty) return true;

  //     setShowDialog(true);
  //     return false;
  //   };

  //   const subscription = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     onBackPress
  //   );

  //   return () => subscription.remove();
  // }, [isDirty]);

  const handleLeave = () => {
    setShowDialog(false);
    onConfirmLeave?.();
  };

  const handleStay = () => {
    onCancelLeave?.();
    setShowDialog(false);
  };

  return { showDialog, handleLeave, handleStay };
};
