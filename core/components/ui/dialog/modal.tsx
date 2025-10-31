import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';

interface AppModalProps {
    visible: boolean;
    renderContent: () => ReactNode,
    onClose: () => void;
    header?: ReactNode;
}

const AppModal: React.FC<AppModalProps> = ({
    visible,
    renderContent,
    onClose,
    header,
}) => {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end bg-black/20">
                <TouchableOpacity className="flex-1" onPress={onClose} activeOpacity={1} />
                <View className="bg-white rounded-t-lg p-4 pb-14 max-h-[90%] flex-1">
                    <View className="flex-row justify-between items-center mb-4">
                        {header}
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    {renderContent()}
                </View>
            </View>
        </Modal>
    );
};

export default AppModal;