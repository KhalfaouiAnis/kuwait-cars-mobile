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
        <Ionicons name={name as any} size={30} color={color}
            style={{
                backgroundColor: isDark ? "#1B1B1B" : "#FFFFFF", height: 43, width: 41.77, borderRadius: 20,
                textAlign: 'center', verticalAlign: "middle"
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
                    if (route === "create") {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'index' }],
                        });
                    }
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
                        <Feather name="home" size={30} color={color}
                            style={{
                                backgroundColor: isDark ? "#1B1B1B" : "#FFFFFF",
                                height: 43, width: 41.77, borderRadius: 20,
                                textAlign: 'center', verticalAlign: "middle"
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
                            style={{ width: 49, height: 49, borderRadius: 50 }}>
                            <Ionicons color="black" size={40} name='add-outline' style={{ backgroundColor: "transparent" }} />
                        </View>
                    ),
                    popToTopOnBlur: true,
                }}
                listeners={protectionListeners("create")}
            />
            <Tabs.Screen
                name="chat"
                options={{ tabBarIcon: ({ color }) => <TabIconButton name="chatbox-ellipses-outline" color={color} isDark={isDark} /> }}
                listeners={protectionListeners("chat")}
            />
            <Tabs.Screen
                name="favorites"
                options={{ tabBarIcon: ({ color }) => <TabIconButton name="star-outline" color={color} isDark={isDark} /> }}
                listeners={protectionListeners("favorites")}
            />
        </Tabs>
    );
}