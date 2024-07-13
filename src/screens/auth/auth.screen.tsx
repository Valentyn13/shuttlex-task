import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { auth } from '@store/slices/chats/actions';

import { useAppDispatch } from '@shared/index';
import { Button, Container } from '@shared/ui';
import { Input } from '@shared/ui/input/input';

export const AuthScreen = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [name, setName] = useState('Mark');
    const [password, setPassword] = useState('1234');

    const handleNameInput = (name: string) => {
        setName(name);
    };

    const handlePasswordInput = (password: string) => {
        setPassword(password);
    };

    const handleLogIn = () => {
        dispatch(auth({ name, password: +password }))
            .unwrap()
            .then((user) => {
                if (user.name === name && user.password === +password) {
                    router.replace('(tabs)');
                } else {
                    console.log('Error');
                }
            });
    };
    return (
        <Container style={styles.container}>
            <View style={styles.flexLayoyut}>
                <Input
                    value={name}
                    onChangeText={handleNameInput}
                    placeholder="Enter your name"
                />
                <Input
                    value={password}
                    onChangeText={handlePasswordInput}
                    placeholder="Enter your password"
                />
                <Button style={styles.button} onPress={handleLogIn}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Log In</Text>
                </Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexLayoyut: {
        width: 300,
        flexDirection: 'column',
        gap: 20,
    },
    button: {
        height: 50,
    },
});
