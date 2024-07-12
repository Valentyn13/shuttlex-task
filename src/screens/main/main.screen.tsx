import { useEffect } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { getAllChats } from '@store/slices/chats/actions';

import { Container, useAppDispatch, useAppSelector } from '@shared/index';

const MainScreen = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { chats } = useAppSelector((state) => state.chats);

    useEffect(() => {
        dispatch(getAllChats());
    }, [dispatch]);
    return (
        <Container>
            <Text style={styles.headerText}>Avaliable Chats</Text>
            <View style={styles.divider}></View>
            <FlatList
                data={chats}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            onPress={() =>
                                router.navigate({
                                    pathname: '/chat/[id]',
                                    params: { id: item.id },
                                })
                            }
                        >
                            <View style={styles.chatContainer}>
                                <View>
                                    <Image
                                        style={{ width: 30, height: 30 }}
                                        source={require('@assets/chat.png')}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={styles.nameText}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.membersText}>
                                            {item.members.length} members
                                        </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.membersText}>
                                            Owner:{item.owner.name}
                                        </Text>
                                    </View>
                                    <View style={styles.line}></View>
                                </View>
                            </View>
                        </Pressable>
                    );
                }}
            />
        </Container>
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
    line: {
        height: 1,
        backgroundColor: 'lightgray',
        marginTop: 8,
    },
    membersText: {
        fontSize: 12,
        color: 'gray',
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
    },
    chatContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});

export { MainScreen };
