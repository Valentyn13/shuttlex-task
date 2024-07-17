import { StyleSheet, Text, View } from 'react-native';

export const MainHeader = () => {
    return (
        <View style={{ height: 100 }}>
            <Text style={styles.headerText}>Avaliable Chats</Text>
            <View style={styles.divider}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        letterSpacing: 0.6,
        lineHeight: 32,
        marginTop: 20,
    },
    divider: {
        height: 1,
        marginBottom: 40,
        marginTop: 8,
        backgroundColor: 'lightgray',
    },
});
