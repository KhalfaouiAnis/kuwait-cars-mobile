import TabBar from '@/core/components/ui/tabBar';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export const unstable_settings = {
    initialRouteName: 'categories',
};

export default function TabLayout() {
    const { theme } = useUserPreferencesStore()
    const isDark = theme === 'dark';

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
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="search-outline" size={24} color={color}
                            style={{
                                display: "flex", alignItems: 'center', justifyContent: 'center',
                                backgroundColor: isDark ? "#1F1F1F" : "#FFFFFF", borderRadius: 50, padding: 12
                            }}
                        />
                    ),
                }}
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
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='star-outline' size={24} color={color}
                            style={{
                                display: "flex", alignItems: 'center', justifyContent: 'center',
                                backgroundColor: isDark ? "#1F1F1F" : "#FFFFFF", borderRadius: 50, padding: 12
                            }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='chatbox-ellipses-outline' size={24} color={color}
                            style={{
                                display: "flex", alignItems: 'center', justifyContent: 'center',
                                backgroundColor: isDark ? "#1F1F1F" : "#FFFFFF", borderRadius: 50, padding: 12
                            }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}