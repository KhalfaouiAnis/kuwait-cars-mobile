import { Ionicons } from "@expo/vector-icons";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface SortModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (sortBy: string) => void;
    currentSort: string;
}

const sortOptions = [
    { id: 'price-asc', label: 'Lowest Price', icon: 'arrow-down' },
    { id: 'price-desc', label: 'Highest Price', icon: 'arrow-up' },
    { id: 'date-asc', label: 'Oldest', icon: 'time-outline' },
    { id: 'date-desc', label: 'Newest', icon: 'time' },
];

const SortModal: React.FC<SortModalProps> = ({ visible, onClose, onSelect, currentSort }) => {
    const handleSelect = (id: string) => {
        onSelect(id);
        onClose();
    };

    const renderItem = ({ item }: { item: typeof sortOptions[0] }) => (
        <TouchableOpacity
            className={`flex-row items-center p-4 border-b border-gray-200 ${item.id === currentSort ? 'bg-blue-50' : ''}`}
            onPress={() => handleSelect(item.id)}
        >
            <Ionicons name={item.icon as any} size={20} color="gray" className="mr-3" />
            <Text className={`flex-1 text-base ${item.id === currentSort ? 'font-semibold text-blue-600' : 'text-gray-800'}`}>
                {item.label}
            </Text>
            {item.id === currentSort && <Ionicons name="checkmark" size={20} color="blue" />}
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide" // Slides up from bottom
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end bg-black/20"> {/* Semi-transparent backdrop */}
                <View className="bg-white rounded-t-2xl p-0 max-h-80"> {/* Rounded top, max height to prevent full screen */}
                    <View className="w-12 h-1 bg-gray-300 rounded-full self-center mt-4 mb-2" />

                    <View className="px-4 pb-2">
                        <Text className="text-lg font-semibold text-gray-800">Sort By</Text>
                    </View>

                    <FlatList
                        data={sortOptions}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />

                    {/* Close Button */}
                    <TouchableOpacity
                        className="p-4 border-t border-gray-200"
                        onPress={onClose}
                    >
                        <Text className="text-center text-blue-600 font-medium">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default SortModal