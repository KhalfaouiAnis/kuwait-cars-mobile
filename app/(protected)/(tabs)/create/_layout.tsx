import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function CoursesLayout() {
    return (
        <ScrollView contentContainerStyle={{flex: 1, paddingBottom: 12}}>
            <Stack
                screenOptions={{ headerShown: false }}
            />
        </ScrollView>
    );
}