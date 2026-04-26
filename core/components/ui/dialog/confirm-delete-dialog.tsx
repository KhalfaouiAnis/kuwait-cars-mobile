import { IMAGES } from "@/core/constants/images";
import { useConfirmDelete } from "@/core/hooks/shared/use-delete-resource";
import { Image } from "expo-image";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TouchableOpacity, View } from "react-native";

type DeleteDialogProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  onDelete?: () => void;
};

export default function ConfirmDeleteDialog({
  show,
  setShow,
  onDelete,
  title,
  description,
}: DeleteDialogProps) {
  const { handleCancel, handleDelete } = useConfirmDelete({
    onDelete,
    show,
    setShow,
  });
  const { t } = useTranslation("common");

  return (
    <Modal
      transparent
      visible={show}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white dark:bg-black rounded-lg p-6 w-80 mx-4 items-center">
          <Image
            source={IMAGES.DeleteMessage}
            style={{ width: 80, height: 80, objectFit: "cover" }}
          />
          <Text className="text-lg font-semibold text-center my-4 dark:text-white">
            {t(`confirmation.${title}`)}
          </Text>
          <Text className="text-base text-gray-600 text-center mb-6 dark:text-white">
            {t(`confirmation.${description}`)}
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="flex-1 bg-transparent p-3 ml-2"
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text className="text-gray-800 text-center font-semibold dark:text-white">
                {t("cancel")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-error rounded-2xl p-3 mr-2"
              onPress={handleDelete}
              activeOpacity={0.7}
            >
              <Text className="text-white text-center font-semibold">
                {t("delete")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
