import { Tabs } from 'expo-router';

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
            }}
        >
            <Tabs.Screen name="index" options={{ tabBarLabel: 'App' }} />
            <Tabs.Screen
                name="settings/index"
                options={{ tabBarLabel: 'Settings' }}
            />
        </Tabs>
    );
};

export default TabsLayout;
