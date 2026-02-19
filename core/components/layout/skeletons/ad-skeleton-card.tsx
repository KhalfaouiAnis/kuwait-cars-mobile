import { useTheme } from '@react-navigation/native';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const AdCardSkeleton = ({ height = 180 }: { height?: number }) => {
    const { dark } = useTheme()
    const colorMode = dark ? "dark" : "light";

    return (
        <MotiView
            style={styles.container}
            transition={{ type: 'timing' }}
        >
            <Skeleton colorMode={colorMode} height={height} width={'100%'} radius={12} />

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
