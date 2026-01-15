import TabBar from '@/core/components/ui/tabBar';
import { useAuthGuard } from '@/core/hooks/use-auth-guard';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { Feather, Ionicons } from '@expo/vector-icons';
import { EventArg } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { memo } from 'react';
import { View } from 'react-native';

export const unstable_settings = {
    initialRouteName: 'categories',
};

interface TabButtonProps {
    name: string, color: string, isDark: boolean
}

const TabIconButton = memo(function TabIconButton({ name, color, isDark }: TabButtonProps) {
    return (
        <Ionicons name={name as any} size={24} color={color}
            style={{
                display: "flex", alignItems: 'center', justifyContent: 'center',
                backgroundColor: isDark ? "#1F1F1F" : "#FFFFFF", borderRadius: 50, padding: 12
            }}
        />
    )
});

export default function TabLayout() {
    const { theme } = useUserPreferencesStore()
    const { protectAction } = useAuthGuard();

    const isDark = theme === 'dark';

    const protectionListeners = (route: "create" | "favorites" | "chat") => {
        return (
            ({ navigation }: { navigation: any }) => ({
                tabPress: (e: EventArg<"tabPress", true, undefined>) => {
                    e.preventDefault();
                    protectAction(() => {
                        navigation.navigate(route);
                    });
                }
            })
        )
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tabs.Screen
                name="categories"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" size={24} color={color}
                            style={{
                                display: "flex", alignItems: 'center', justifyContent: 'center',
                                backgroundColor: isDark ? "#1F1F1F" : "#FFFFFF", borderRadius: 50, padding: 12
                            }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{ tabBarIcon: ({ color }) => <TabIconButton name="search-outline" color={color} isDark={isDark} /> }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    tabBarIcon: () => (
                        <View
                            className='items-center justify-center bg-primary-500'
                            style={{ width: 58, height: 58, borderRadius: 50 }}>
                            <Ionicons color="black" size={38} name='add-outline' style={{ backgroundColor: "transparent" }} />
                        </View>
                    ),
                    popToTopOnBlur: true
                }}
                listeners={protectionListeners("create")}
            />
            <Tabs.Screen
                name="favorites"
                options={{ tabBarIcon: ({ color }) => <TabIconButton name="star-outline" color={color} isDark={isDark} /> }}
                listeners={protectionListeners("favorites")}
            />
            <Tabs.Screen
                name="chat"
                options={{ tabBarIcon: ({ color }) => <TabIconButton name="chatbox-ellipses-outline" color={color} isDark={isDark} /> }}
                listeners={protectionListeners("chat")}
            />
        </Tabs>
    );
}