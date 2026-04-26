import React, { ReactNode } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';

interface AppModalProps {
    visible: boolean;
    onClose: () => void;
    children: ReactNode,
}

const XModal: React.FC<AppModalProps> = ({
    visible,
    onClose,
    children,
}) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
            presentationStyle="overFullScreen"
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 justify-center items-center bg-black/80">
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View>
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default XModal;