import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Chats',
                    tabBarIcon: ({ color }) => (
                        <Entypo size={24} color={color} name="chat" />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings/index"
                options={{
                    tabBarLabel: 'Info',
                    tabBarIcon: ({ color }) => (
                        <Entypo name="info" size={18} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
