import { Tabs } from 'expo-router';

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="index" options={{ tabBarLabel: 'Chats' }} />
            <Tabs.Screen
                name="settings/index"
                options={{ tabBarLabel: 'Settings' }}
            />
        </Tabs>
    );
};

export default TabsLayout;
