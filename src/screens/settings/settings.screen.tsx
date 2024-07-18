import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { chatsActions } from '@store/slices';

import { Button } from '@shared/index';
import { useAppDispatch } from '@shared/index';

const SettingsScreen = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogOut = () => {
        dispatch(chatsActions.logOut());
        router.replace('/');
    };
    return (
        <View style={styles.container}>
            <Button style={styles.button} onPress={handleLogOut}>
                <Text>Log out</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
    },
});
export { SettingsScreen };
