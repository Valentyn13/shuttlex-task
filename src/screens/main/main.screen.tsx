import { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { useSocket } from '../../context/socket';

import { chatsActions } from '@store/slices';
import { getAllChats } from '@store/slices/chats/actions';

import {
    Button,
    ChatWithoutMessages,
    Container,
    useAppDispatch,
    useAppSelector,
} from '@shared/index';
import { Input } from '@shared/ui/input/input';

const MainScreen = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { socket } = useSocket();

    const { chats, user } = useAppSelector((state) => state.chats);

    const [chatName, setChatName] = useState('');
    const [isNameInputOpen, setIsNameInputOpen] = useState(false);

    const handleNewName = (name: string) => {
        setChatName(name);
    };
    const handleOpenInput = () => {
        setIsNameInputOpen(true);
    };

    const handleAddNewChat = () => {
        if (chatName.trim() !== '' && user) {
            const chatData = {
                ownerId: user.id,
                ownerName: user.name,
                name: chatName,
                members: [user],
                messages: [
                    {
                        id: new Date().toISOString(),
                        user: {
                            id: '7777',
                            name: 'system',
                        },
                        message: `${user.name} created the chat`,
                    },
                ],
            };
            console.log(chatData);
            socket?.emit('CREATE_CHAT', chatData);
        } else {
            console.log('No user');
        }
        setIsNameInputOpen(false);
    };
    useEffect(() => {
        dispatch(getAllChats());
    }, [dispatch]);

    useEffect(() => {
        if (!socket) return;
        socket.on('GET_NEW_CHAT', (chat: ChatWithoutMessages) => {
            dispatch(chatsActions.addChat(chat));
        });

        socket.on(
            'DECREASE_MEMBER',
            ({ userId, chatId }: { chatId: string; userId: string }) => {
                dispatch(chatsActions.decreaseMember({ userId, chatId }));
            },
        );

        return () => {
            socket.off('GET_NEW_CHAT');
        };
    }, []);

    return (
        <Container style={styles.container}>
            <View style={{ height: 100 }}>
                <Text style={styles.headerText}>Avaliable Chats</Text>
                <View style={styles.divider}></View>
            </View>

            <FlatList
                style={{ flex: 1 }}
                data={chats}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            onPress={() =>
                                router.navigate({
                                    pathname: '/chat/[id]',
                                    params: { id: item._id },
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
                                            Owner:{item.ownerName}
                                        </Text>
                                    </View>
                                    <View style={styles.line}></View>
                                </View>
                            </View>
                        </Pressable>
                    );
                }}
            />
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    gap: 10,
                    height: 120,
                }}
            >
                {isNameInputOpen && (
                    <Input
                        placeholder="Enter chat name"
                        onChangeText={handleNewName}
                    />
                )}
                {isNameInputOpen ? (
                    <Button
                        style={{ height: '50%' }}
                        onPress={handleAddNewChat}
                    >
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Create chat
                        </Text>
                    </Button>
                ) : (
                    <Button style={{ height: '50%' }} onPress={handleOpenInput}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Add new chat
                        </Text>
                    </Button>
                )}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 15,
    },
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
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});

export { MainScreen };
