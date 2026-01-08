import useUserPreferencesStore from '@/core/store/preferences.store';
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
    const { isRTL } = useUserPreferencesStore()

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end bg-black/20">
                <TouchableOpacity className="flex-1" onPress={onClose} activeOpacity={1} />
                <View className="bg-white dark:bg-darkish rounded-t-3xl p-4 pb-14 max-h-[90%] h-full">
                    <View className="flex-row justify-between items-center mb-4" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                        {header}
                    </View>
                    {renderContent()}
                </View>
            </View>
        </Modal>
    );
};

export default AppModal;