import { HIDE_TABBAR_ROUTES } from '@/core/constants';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationRoute, ParamListBase } from '@react-navigation/native';
import { usePathname } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { theme } = useUserPreferencesStore()
    const { bottom } = useSafeAreaInsets();
    const isDark = theme === 'dark';

    const pathname = usePathname()

    const onPress = useCallback((route: NavigationRoute<ParamListBase, string>, isFocused: boolean) => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    }, [navigation])

    const onLongPress = useCallback((key: string) => {
        navigation.emit({
            type: 'tabLongPress',
            target: key,
        })
    }, [navigation])

    if (HIDE_TABBAR_ROUTES.includes(pathname) || pathname.startsWith("/categories/") || pathname.startsWith("/create/")) {
        return null;
    }

    return (
        <View
            style={[
                styles.container,
                {
                    bottom: bottom + 12,
                    backgroundColor: isDark ? '#444444A6' : '#E6E1E1',
                },
            ]}
            pointerEvents="box-none"
            className='opacity-90'
        >
            {state.routes.map((route, index: number) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={() => onPress(route, isFocused)}
                        onLongPress={() => onLongPress(route.key)}
                        style={styles.tabButton}
                    >
                        {
                            options.tabBarIcon?.({ focused: isFocused, color: getIconColor(isDark, isFocused), size: 30 })
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        start: 20,
        end: 20,
        height: 60,
        paddingStart: 4,
        paddingEnd: 4,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 35,
        overflow: 'hidden',
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
});

function getIconColor(isDark: boolean, isFocused: boolean) {
    if ((isDark && isFocused) || (!isDark && isFocused)) return "#FAED02"
    if (isDark && !isFocused) return "white"
    if (!isDark && !isFocused) return "black"
    return "black"
}