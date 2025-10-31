import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { TextInput, View } from "react-native";

interface Props {
    setSearchQuery: Dispatch<SetStateAction<string>>
    searchQuery: string
}

export default function SearchField({ searchQuery, setSearchQuery }: Props) {
    return (
        <View className="border border-primary-500 p-1 rounded-lg mb-4 flex-row items-center gap-x-1 ps-2">
            <Ionicons name='search-outline' size={18} color="gray" />
            <TextInput
                className="flex-1"
                placeholder="Search..."
                numberOfLines={1}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
            />
        </View>
    )
}