// AutocompleteSearch.tsx
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type Dataset = {
    id: string;
    title: string;
    description: string;
    category: string;
};

type Props = {
    data: Dataset[];
    onSelect: (item: Dataset) => void;
};

export function AutocompleteSearch({ data, onSelect }: Props) {
    const [query, setQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    // Search by title OR description
    const results = useCallback(() => {
        if (query.length < 2) return [];
        const q = query.toLowerCase();
        return data
            .filter(
                (item) =>
                    item.title.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q)
            )
            .slice(0, 6); // cap results
    }, [query, data]);

    const filtered = results();

    return (
        <View style={styles.container}>
            {/* Search bar */}
            <View style={styles.inputWrapper}>
                <Text style={styles.icon}>🔍</Text>
                <TextInput
                    style={styles.input}
                    value={query}
                    onChangeText={(text) => {
                        setQuery(text);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="Search..."
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="search"
                />
                {query.length > 0 && (
                    <TouchableOpacity onPress={() => { setQuery(''); setShowDropdown(false); }}>
                        <Text style={styles.clear}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Dropdown */}
            {showDropdown && filtered.length > 0 && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={filtered}
                        keyExtractor={(item) => item.id}
                        keyboardShouldPersistTaps="handled" // ← critical: lets taps reach the list
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.row}
                                onPress={() => {
                                    setQuery(item.title);
                                    setShowDropdown(false);
                                    onSelect(item);
                                }}
                            >
                                {/* Left: bold matched prefix + rest of title */}
                                <HighlightedTitle title={item.title} query={query} />

                                {/* Right: category in blue */}
                                <Text style={styles.category}>{item.category}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

// Replicates the "Cor|vette" bold prefix style from your screenshot
function HighlightedTitle({ title, query }: { title: string; query: string }) {
    const idx = title.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return <Text style={styles.title}>{title}</Text>;

    return (
        <Text style={styles.title}>
            <Text style={styles.titleMatch}>{title.slice(0, idx + query.length)}</Text>
            <Text style={styles.titleRest}>{title.slice(idx + query.length)}</Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    container: { position: 'relative', zIndex: 100, marginHorizontal: 12 },
    inputWrapper: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#fff', borderRadius: 24,
        paddingHorizontal: 14, paddingVertical: Platform.OS === 'ios' ? 10 : 6,
        shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    icon: { marginRight: 8, fontSize: 14 },
    input: { flex: 1, fontSize: 16 },
    clear: { fontSize: 16, color: '#e74c3c', paddingLeft: 8 },
    dropdown: {
        position: 'absolute', top: '100%', left: 0, right: 0,
        backgroundColor: '#fff', borderRadius: 12, marginTop: 4,
        shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
        elevation: 5, overflow: 'hidden',
    },
    row: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#f0f0f0',
    },
    title: { fontSize: 15 },
    titleMatch: { fontWeight: 'bold', color: '#111' },
    titleRest: { color: '#888' },
    category: { fontSize: 14, color: '#2563eb', fontWeight: '600' },
});