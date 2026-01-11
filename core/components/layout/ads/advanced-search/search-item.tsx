import { boxShadow } from '@/core/utils/cn';
import { Ionicons } from '@expo/vector-icons';
import { clsx } from 'clsx';
import React, { ReactNode, useState } from 'react';
import { Modal, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';

type SearchItemProps = {
    label: string;
    content: ReactNode
    icon?: ReactNode,
    isDark?: boolean
    isRTL?: boolean
}

export default function SearchItem({ content, label, icon, isDark, isRTL }: SearchItemProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <View className="w-full">
            <Pressable
                style={boxShadow().button}
                onPress={() => setShowModal(true)}
                className={clsx('flex-row items-center px-2 py-4 dark:border dark:border-primary-500')}
            >
                <View className='items-center me-4 ms-4'>
                    {icon}
                </View>
                <View>
                    <Text className='dark:text-white'>{label}</Text>
                </View>
                <View className='ms-auto'>
                    <Ionicons color={isDark ? "white" : "black"} size={20} name={isRTL ? 'chevron-back' : 'chevron-forward'} />
                </View>
            </Pressable >
            <Modal
                visible={showModal}
                animationType="slide"
                transparent
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableWithoutFeedback
                    onPress={() => setShowModal(false)}>
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="bg-white rounded-lg w-40 overflow-hidden">
                            {content}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View >
    );
}