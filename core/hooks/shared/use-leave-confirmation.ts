import { useEffect, useState } from "react";

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
  const [showDialog, setShowDialog] = useState(() => hasUnsavedChanges);

  useEffect(() => {
    if (hasUnsavedChanges) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  }, [hasUnsavedChanges]);

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
