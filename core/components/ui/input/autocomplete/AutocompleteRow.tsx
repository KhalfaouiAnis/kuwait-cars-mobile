import { AdvertisementInterface } from '@/core/types';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
    item: AdvertisementInterface;
    query: string;
    onPress: (item: AdvertisementInterface) => void;
};

/**
 * Memoized row — only re-renders when its own item or the query changes.
 */
export const AutocompleteRow = memo(({ item, query, onPress }: Props) => {
    const { t } = useTranslation("common")
    return (
        <TouchableOpacity
            style={styles.row}
            onPress={() => onPress(item)}
            activeOpacity={0.6}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, category: ${item.ad_type}`}
        >
            <HighlightedText text={item.title} query={query} style={styles.title} />
            <Text style={styles.category} numberOfLines={1}>
                {t(`adCategories.${item.ad_type}`)}
            </Text>
        </TouchableOpacity>
    );
});

AutocompleteRow.displayName = 'AutocompleteRow';


type HighlightProps = {
    text: string;
    query: string;
    style: object;
};

function HighlightedText({ text, query, style }: HighlightProps) {
    const index = text.toLowerCase().indexOf(query.toLowerCase());

    if (index === -1) {
        return <Text style={[style, styles.dimmed]}>{text}</Text>;
    }

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
        <Text style={style} numberOfLines={1}>
            {before.length > 0 && <Text style={styles.dimmed}>{before}</Text>}
            <Text style={styles.highlighted}>{match}</Text>
            {after.length > 0 && <Text style={styles.dimmed}>{after}</Text>}
        </Text>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 13,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EFEFEF',
    },
    title: {
        fontSize: 15,
        flexShrink: 1,
        marginRight: 12,
    },
    highlighted: {
        fontWeight: '700',
        color: '#111',
    },
    dimmed: {
        fontWeight: '400',
        color: '#888',
    },
    category: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2563EB',
        flexShrink: 0,
    },
});