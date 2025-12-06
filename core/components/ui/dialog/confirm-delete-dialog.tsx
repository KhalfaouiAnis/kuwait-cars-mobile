import { IMAGES } from '@/core/constants/images';
import { useConfirmDelete } from '@/core/hooks/shared/use-delete-resource';
import { Image } from 'expo-image';
import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type DeleteDialogProps = {
    onDelete?: () => void;
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
};

export default function ConfirmDeleteDialog({ onDelete, show, setShow }: DeleteDialogProps) {
    const { handleCancel, handleDelete } = useConfirmDelete({ onDelete, show, setShow });

    return (
        <Modal
            visible={show}
            transparent
            animationType="fade"
            onRequestClose={handleCancel}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white dark:bg-darkish rounded-lg p-6 w-80 mx-4 items-center">
                    <Image
                        source={IMAGES.DeleteMessage}
                        style={{ width: 80, height: 80, objectFit: "cover" }}
                    />
                    <Text className="text-lg font-semibold text-center my-4 dark:text-white">
                        Delete message?
                    </Text>
                    <Text className="text-base text-gray-600 text-center mb-6 dark:text-white">
                        Do you really want to delete this conversation?
                    </Text>
                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            className="flex-1 bg-transparent p-3 ml-2"
                            onPress={handleCancel}
                            activeOpacity={0.7}
                        >
                            <Text className="text-gray-800 text-center font-semibold dark:text-white">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 bg-error rounded-2xl p-3 mr-2"
                            onPress={handleDelete}
                            activeOpacity={0.7}
                        >
                            <Text className="text-white text-center font-semibold">Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}