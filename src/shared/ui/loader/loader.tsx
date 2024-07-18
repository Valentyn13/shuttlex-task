import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 5,
    },
});
