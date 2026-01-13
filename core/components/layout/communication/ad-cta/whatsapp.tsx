import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { CTAProps } from "../types";

export function WhatsappCTA({ label, variant, user, additional_number, second_additional_number }: CTAProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { protectAction } = useAuthGuard();

    const handlePress = () => {
        setIsOpen(true)
        protectAction(() => { })
    }

    const handleSelect = (number?: string) => {
        setIsOpen(false);
    };

    const renderItem = ({ item: { value } }: { item: { value?: string } }) => (
        <TouchableOpacity
            className="flex-row items-center justify-center p-3 border-b border-gray-200"
            onPress={() => handleSelect(value)}
            activeOpacity={0.7}
        >
            <Text className="flex-1 text-base text-gray-700 font-inter-medium">{value}</Text>
        </TouchableOpacity>
    );

    if (additional_number || second_additional_number) {
        const ITEMS = [
            { id: "1", value: user?.phone },
            { id: "2", value: additional_number },
            { id: "3", value: second_additional_number },
        ];

        return (
            <>
                <TouchableOpacity
                    onPress={handlePress}
                    className="border border-primary-500 py-2 px-3 rounded-lg items-center justify-center">
                    <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                    <Text className="font-inter text-xs dark:text-white">{label}</Text>
                </TouchableOpacity>
                <Modal
                    visible={isOpen}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setIsOpen(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
                        <View className="flex-1 justify-center items-center bg-black/50">
                            <View className="bg-white rounded-lg w-40 overflow-hidden">
                                <FlatList
                                    data={ITEMS}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </>
        )
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            className="border border-primary-500 py-2 px-3 rounded-lg items-center justify-center">
            <Ionicons name="logo-whatsapp" size={variant === "icon" ? 20 : 24} color="#25D366" />
            {variant === "button" && <Text className="font-inter text-xs dark:text-white">{label}</Text>}
        </TouchableOpacity>
    )
}