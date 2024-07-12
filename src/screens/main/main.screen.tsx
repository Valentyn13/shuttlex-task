import { Image, StyleSheet, Text, View } from 'react-native';

import { Button } from '@shared/index';

const MainScreen = () => {
    return (
        <View style={styles.container}>
            <Text>App entry</Text>
            <Button />
            <Image
                style={{ width: 100, height: 100 }}
                source={require('@assets/icon.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export { MainScreen };
