import { useFocusEffect } from "expo-router";
import { Dispatch, SetStateAction, useCallback } from "react";
import { BackHandler } from "react-native";

type UseConfirmDeleteProps = {
  show: boolean;
  onDelete?: () => void;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export const useConfirmDelete = ({
  onDelete,
  show,
  setShow,
}: UseConfirmDeleteProps) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setShow(false);
        return false;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [setShow])
  );

  const handleDelete = () => {
    setShow(false);
    onDelete?.();
  };

  const handleCancel = () => {
    setShow(false);
  };

  return { handleDelete, handleCancel };
};
