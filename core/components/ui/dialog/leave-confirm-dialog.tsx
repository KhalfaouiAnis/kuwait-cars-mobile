import { useLeaveConfirmation } from '@/core/hooks/shared/use-leave-confirmation';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type LeaveDialogProps = {
    isDirty: boolean;
    onLeave?: () => void;
};

export default function LeaveDialog({ isDirty, onLeave }: LeaveDialogProps) {
    const { showDialog, handleLeave, handleStay } = useLeaveConfirmation({ isDirty, onLeave });

    return (
        <Modal
            visible={showDialog}
            transparent
            animationType="fade"
            onRequestClose={handleStay}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white rounded-lg p-6 w-80 mx-4">
                    <Text className="text-lg font-semibold text-center mb-4">
                        Confirmation
                    </Text>
                    <Text className="text-base text-gray-600 text-center mb-6">
                        You have unsaved changes. Do you want to leave?
                    </Text>
                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            className="flex-1 bg-gray-300 rounded-lg p-3 ml-2"
                            onPress={handleStay}
                            activeOpacity={0.7}
                        >
                            <Text className="text-gray-800 text-center font-semibold">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 bg-red-500 rounded-lg p-3 mr-2"
                            onPress={handleLeave}
                            activeOpacity={0.7}
                        >
                            <Text className="text-white text-center font-semibold">Leave</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}