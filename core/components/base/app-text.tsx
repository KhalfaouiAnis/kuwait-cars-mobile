import { StyleSheet, Text, TextProps } from 'react-native';

interface AppTextProps extends TextProps {
    variant?: 'title' | 'body' | 'description';
    truncate?: boolean;
}

export const AppText = ({
    variant = 'body',
    truncate = false,
    style,
    ...props
}: AppTextProps) => {
    return (
        <Text
            numberOfLines={truncate ? 1 : props.numberOfLines}
            ellipsizeMode="tail"
            style={[
                styles.base,
                styles[variant],
                truncate && styles.shrink,
                style
            ]}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    base: { color: '#000' },
    title: { fontSize: 20, fontWeight: 'bold' },
    body: { fontSize: 16 },
    description: { fontSize: 14, color: '#666' },
    shrink: { flexShrink: 1 },
});
