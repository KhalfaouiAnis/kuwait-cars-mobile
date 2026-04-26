import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TouchableOpacity, View } from "react-native";

type LeaveDialogProps = {
  show: boolean;
  onLeave?: () => void;
  onStay?: () => void;
};

export default function LeaveDialog({
  show,
  onLeave,
  onStay,
}: LeaveDialogProps) {
  const { t } = useTranslation("common");

  return (
    <Modal
      transparent
      visible={show}
      animationType="fade"
      onRequestClose={onStay}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white dark:bg-black rounded-lg p-6 w-80 mx-4">
          <Text className="text-lg font-semibold text-center mb-4 dark:text-white">
            {t("createAd.LeaveDialog.Confirmation")}
          </Text>
          <Text className="text-base text-gray-600 text-center mb-6 dark:text-white">
            {t("createAd.LeaveDialog.UnsavedChangesConfirmLeave")}
          </Text>
          <View className="flex-row justify-between gap-x-2">
            <TouchableOpacity
              className="flex-1 bg-gray-300 rounded-3xl p-3 ml-2"
              onPress={onStay}
              activeOpacity={0.7}
            >
              <Text className="text-gray-800 text-center font-semibold">
                {t("cancel")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-red-500 rounded-3xl p-3 me-2"
              onPress={onLeave}
              activeOpacity={0.7}
            >
              <Text className="text-white text-center font-semibold">
                {t("createAd.LeaveDialog.Leave")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
