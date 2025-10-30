import { Ionicons } from "@expo/vector-icons";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface SortModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (sortBy: string) => void;
    currentSort: string;
}

const sortOptions = [
    { id: 'best-match', label: 'Best match' },
    { id: 'price-asc', label: 'Lowest price' },
    { id: 'price-desc', label: 'Highest price' },
    { id: 'date-desc', label: 'Newest' },
    { id: 'date-asc', label: 'Oldest' },
];

const SortModal: React.FC<SortModalProps> = ({ visible, onClose, onSelect, currentSort }) => {
    const handleSelect = (id: string) => {
        onSelect(id);
        // onClose();
    };

    const renderItem = ({ item }: { item: typeof sortOptions[0] }) => (
        <TouchableOpacity
            className={`flex-row items-center p-4 border-b border-gray-200 ${item.id === currentSort ? 'bg-primary-500' : ''}`}
            onPress={() => handleSelect(item.id)}
        >
            <View className="flex-row items-center gap-x-4">
                {item.id === currentSort && (
                    <Ionicons name="checkmark" size={20} />
                )}
                <Text className="text-base font-inter">
                    {item.label}
                </Text>

            </View>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end">
                <View className="bg-white rounded-t-2xl p-0">
                    <TouchableOpacity
                        className="self-end p-1 m-4 rounded-full bg-gray-200"
                        onPress={onClose}
                    >
                        <Ionicons name="close" size={22} />
                    </TouchableOpacity>

                    <FlatList
                        data={sortOptions}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        style={{ paddingBottom: 80 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default SortModal