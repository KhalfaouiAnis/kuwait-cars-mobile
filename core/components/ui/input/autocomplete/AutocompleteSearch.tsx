import React, { useCallback, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useDebounce } from '@/core/hooks/shared/useDebounce';
import { useDatasetSearch } from '@/core/services/ads/ad.queries';
import { AdvertisementInterface } from '@/core/types';
import { AutocompleteRow } from './AutocompleteRow';

const DEBOUNCE_MS = 500;
const MIN_QUERY_LENGTH = 3;

type Props = {
    onSelect: (item: AdvertisementInterface) => void;
    placeholder?: string;
};

export function AutocompleteSearch({ onSelect, placeholder = 'Search datasets…' }: Props) {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const debouncedQuery = useDebounce(inputValue, DEBOUNCE_MS);

    const { data: results, isFetching, isError } = useDatasetSearch(debouncedQuery);

    const showDropdown =
        isOpen &&
        inputValue.length >= MIN_QUERY_LENGTH &&
        (results && results.length > 0 || isFetching || isError);

    const handleChangeText = useCallback((text: string) => {
        setInputValue(text);
        setIsOpen(true);
    }, []);

    const handleSelect = useCallback(
        (item: AdvertisementInterface) => {
            setInputValue(item.title);
            setIsOpen(false);
            inputRef.current?.blur();
            onSelect(item);
        },
        [onSelect]
    );

    const handleClear = useCallback(() => {
        setInputValue('');
        setIsOpen(false);
        inputRef.current?.focus();
    }, []);

    const handleBlur = useCallback(() => {
        // Small delay — lets onPress on a row fire before the dropdown disappears
        setTimeout(() => setIsOpen(false), 150);
    }, []);

    return (
        <View style={styles.container}>
            {/* Input bar */}
            <View style={[styles.inputWrapper, isOpen && styles.inputWrapperOpen]}>
                <Text style={styles.searchIcon}>⌕</Text>
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={inputValue}
                    onChangeText={handleChangeText}
                    onFocus={() => setIsOpen(true)}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    placeholderTextColor="#AAABAE"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="search"
                    clearButtonMode="never" // we handle this ourselves for cross-platform consistency
                />

                {/* Right-side adornment: spinner while fetching, clear button when idle */}
                {isFetching && inputValue.length >= MIN_QUERY_LENGTH ? (
                    <ActivityIndicator size="small" color="#AAABAE" style={styles.adornment} />
                ) : inputValue.length > 0 ? (
                    <TouchableOpacity onPress={handleClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Text style={styles.clearIcon}>✕</Text>
                    </TouchableOpacity>
                ) : null}
            </View>

            {/* Dropdown */}
            {showDropdown && (
                <View style={styles.dropdown}>
                    {isError ? (
                        <View style={styles.statusRow}>
                            <Text style={styles.errorText}>Search unavailable. Please try again.</Text>
                        </View>
                    ) : results?.length === 0 && !isFetching ? (
                        <View style={styles.statusRow}>
                            <Text style={styles.emptyText}>No results for {debouncedQuery}</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={results}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <AutocompleteRow item={item} query={debouncedQuery} onPress={handleSelect} />
                            )}
                            bounces={false}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            )}
        </View>
    );
}

const RADIUS = 14;

const styles = StyleSheet.create({
    container: {
        zIndex: 999, // must sit above sibling content
        position: 'relative',
        marginHorizontal: 12,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: 14,
        paddingVertical: Platform.OS === 'ios' ? 10 : 6,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    // Subtle border appears when dropdown is open — communicates active state
    inputWrapperOpen: {
        borderColor: '#DDEAFF',
        borderBottomLeftRadius: RADIUS,
        borderBottomRightRadius: RADIUS,
    },
    searchIcon: {
        fontSize: 20,
        color: '#888',
        marginRight: 8,
        lineHeight: 24,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#111',
        paddingVertical: 0, // resets Android default padding
    },
    adornment: {
        marginLeft: 8,
    },
    clearIcon: {
        fontSize: 14,
        color: '#E74C3C',
        paddingLeft: 8,
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: RADIUS,
        borderBottomRightRadius: RADIUS,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        marginTop: 2,
        maxHeight: 320,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    statusRow: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',
    },
    errorText: {
        fontSize: 14,
        color: '#E74C3C',
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
    },
});