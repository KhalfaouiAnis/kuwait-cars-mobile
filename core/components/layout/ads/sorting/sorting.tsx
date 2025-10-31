import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface SortingContentProps {
    selectedOptions: string[];
    onToggleOption: (value: string) => void;
}

const sortOptions = [
    { id: 'best-match', label: 'Best match' },
    { id: 'price-asc', label: 'Lowest price' },
    { id: 'price-desc', label: 'Highest price' },
    { id: 'date-desc', label: 'Newest' },
    { id: 'date-asc', label: 'Oldest' },
];

const SortingContent: React.FC<SortingContentProps> = ({ selectedOptions, onToggleOption }) => {

    const renderItem = ({ item }: { item: typeof sortOptions[0] }) => {
        const isSelected = selectedOptions.includes(item.id);
        return (
            <TouchableOpacity
                className={`flex-row items-center p-3 my-1 border-b border-gray-200 ${isSelected ? 'bg-primary-500' : ''}`}
                onPress={() => onToggleOption(item.id)}
            >
                <View className="flex-1">
                    <Text className="font-medium">{item.label}</Text>
                </View>
                <Ionicons
                    name='checkmark-circle'
                    size={20}
                    color='gray'
                />
            </TouchableOpacity>

        );
    }

    return (
        <View className="flex-1">
            <FlatList
                data={sortOptions}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default function renderSortingContent(selectedOptions: (string | number)[], onToggleOption: (value: string | number) => void) {
    return <SortingContent selectedOptions={selectedOptions as string[]} onToggleOption={onToggleOption} />
}