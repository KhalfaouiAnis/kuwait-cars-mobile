import TabBar from '@/core/components/ui/tabBar';
import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';

export const unstable_settings = {
    initialRouteName: 'categories',
};

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                headerLeft: () => <DrawerToggleButton />
            }}
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tabs.Screen
                name="categories"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='home-outline' size={24} color={color}
                            style={{
                                display: "flex", alignItems: 'center', justifyContent: 'center',
                                backgroundColor: "#FFFFFF", borderRadius: 50, padding: 12
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
                                backgroundColor: "#FFFFFF", borderRadius: 50, padding: 12
                            }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="new-ad"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons color={focused ? '#000' : color} size={42} name='add-outline'
                            style={{
                                display: "flex", alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                                backgroundColor: "#FAED02", borderRadius: 99, padding: 8
                            }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='heart-outline' size={24} color={color}
                            style={{
                                display: "flex", alignItems: 'center', justifyContent: 'center',
                                backgroundColor: "#FFFFFF", borderRadius: 50, padding: 12
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
                                backgroundColor: "#FFFFFF", borderRadius: 50, padding: 12
                            }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}