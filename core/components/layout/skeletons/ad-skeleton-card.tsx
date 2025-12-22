import useUserPreferencesStore from '@/core/store/preferences.store';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const AdCardSkeleton = () => {
    const { theme } = useUserPreferencesStore()
    const colorMode = theme === "light" ? "light" : "dark";

    return (
        <MotiView
            transition={{ type: 'timing' }}
            style={styles.container}
        >
            <Skeleton colorMode={colorMode} height={180} width={'100%'} radius={12} />

            <View style={styles.content}>
                <View style={{ marginBottom: 8 }}>
                    <Skeleton colorMode={colorMode} width={'40%'} height={16} />
                </View>
                <Skeleton colorMode={colorMode} width={'80%'} height={16} />
            </View>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 4,
        marginEnd: 6,
        paddingStart: 0,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
    },
    content: {
        marginTop: 12,
    },
});
