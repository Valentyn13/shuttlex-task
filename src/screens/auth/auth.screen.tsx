import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { login, register } from '@store/slices/chats/actions';

import { useAppDispatch } from '@shared/index';
import { Button, Container } from '@shared/ui';
import { Input } from '@shared/ui/input/input';

export const AuthScreen = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [hasAccoutn, setHasAccount] = useState(true);

    const handleNameInput = (name: string) => {
        setName(name);
    };

    const handlePasswordInput = (password: string) => {
        setPassword(password);
    };

    const handleLogIn = () => {
        if (name.trim() !== '' && password.trim() !== '') {
            dispatch(login({ name, password }))
                .unwrap()
                .then(() => {
                    router.replace('(tabs)');
                });
        }
    };

    const handleCreateAccount = () => {
        if (name.trim() !== '' && password.trim() !== '') {
            dispatch(register({ name, password }))
                .unwrap()
                .then(() => {
                    router.replace('(tabs)');
                })
                .catch((error) => console.log(error));
        }
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
                {hasAccoutn ? (
                    <Button style={styles.button} onPress={handleLogIn}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Log In
                        </Text>
                    </Button>
                ) : (
                    <Button style={styles.button} onPress={handleCreateAccount}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Create Account
                        </Text>
                    </Button>
                )}
            </View>
            {hasAccoutn ? (
                <View style={{ gap: 6, marginTop: 20 }}>
                    <Text style={{ color: 'lightgray', fontSize: 19 }}>
                        Don't have an account?
                    </Text>
                    <Pressable onPress={() => setHasAccount(false)}>
                        <Text style={{ color: 'lightblue', fontSize: 19 }}>
                            Create a new one
                        </Text>
                    </Pressable>
                </View>
            ) : (
                <View style={{ gap: 6, marginTop: 20 }}>
                    <Text style={{ color: 'lightgray', fontSize: 19 }}>
                        Have an account?
                    </Text>
                    <Pressable onPress={() => setHasAccount(true)}>
                        <Text style={{ color: 'lightblue', fontSize: 19 }}>
                            Please Log In
                        </Text>
                    </Pressable>
                </View>
            )}
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
