import { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useSocket } from '../../context/socket';

import { chatsActions } from '@store/slices';

import { Button, Message, useAppDispatch, useAppSelector } from '@shared/index';
import { Input } from '@shared/ui/input/input';

export const ChatScreen = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { socket } = useSocket();
    const { id } = useLocalSearchParams();
    const flatListRef = useRef<FlatList<Message>>(null);

    const chat = useAppSelector((state) => state.chats.currentChat);
    const user = useAppSelector((state) => state.chats.user);

    const [newMessage, setNewMssage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isMember = chat?.members.find((member) => member.id === user?.id);
    const isOwner = chat?.ownerId === user?.id;
    useEffect(() => {
        dispatch(chatsActions.getChat(id as string));
    }, [dispatch, id]);

    const handleGoBack = () => {
        setIsModalOpen(false);
        router.back();
    };

    const handleNewMessageChange = (message: string) => {
        setNewMssage(message);
    };

    const handleModalOpen = () => {
        if (!isMember) return;
        setIsModalOpen(!isModalOpen);
    };

    const handleDeleteChat = () => {
        socket?.emit('DELETE_CHAT', chat?._id);
        setIsModalOpen(false);
        router.back();
    };
    const handleLeaveChat = () => {
        socket?.emit('ADD_MESSAGE', {
            message: `${user?.name} has left the chat`,
            user: {
                id: '7777',
                name: 'system',
            },
            chatID: chat?._id,
        });

        socket?.emit('LEFT_CHAT', { userId: user?.id, chatId: chat?._id });
        setIsModalOpen(false);
        router.back();
    };

    const handleJoinChat = () => {
        if (user) {
            dispatch(chatsActions.joinToChat(user));
            socket?.emit('MANUAL_JOIN', { chatID: chat?._id, member: user });
            socket?.emit('ADD_MESSAGE', {
                message: `${user.name} joined the chat`,
                user: {
                    id: '7777',
                    name: 'system',
                },
                chatID: chat?._id,
            });
        }
    };
    const handleAddMessage = () => {
        if (user && newMessage.trim() !== '') {
            socket?.emit('ADD_MESSAGE', {
                message: newMessage,
                user,
                chatID: chat?._id,
            });
            setNewMssage('');
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setTimeout(() => {
                    if (flatListRef.current) {
                        flatListRef.current.scrollToEnd();
                    }
                }, 20);
            },
        );

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;
        if (user) {
            socket?.emit('CHAT_OPEN', { chatID: chat?._id, userID: user.id });
        }
    }, [user, socket, chat?._id]);

    useEffect(() => {
        if (!socket) return;

        socket.on('UPDATE_CHAT', (message: Message) => {
            dispatch(chatsActions.addMessage(message));
            console.log(message);
            setTimeout(() => {
                if (flatListRef.current) {
                    flatListRef.current.scrollToEnd();
                }
            }, 40);
        });

        socket.on('UPDATE_CHAT_AFTER_DELETION', (chatId: string) => {
            dispatch(chatsActions.deleteChat(chatId));
        });
        return () => {
            socket.off('UPDATE_CHAT');
            socket.off('UPDATE_CHAT_AFTER_DELETION');
        };
    }, [socket, dispatch]);

    useEffect(() => {
        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd();
            }
        }, 60);
    }, []);
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
            }}
        >
            <View
                style={[
                    styles.hedearContainer,
                    { justifyContent: 'space-between' },
                ]}
            >
                <View>
                    <Pressable onPress={handleGoBack}>
                        <Ionicons
                            name="arrow-back-sharp"
                            color={'white'}
                            size={25}
                        />
                    </Pressable>
                </View>
                <View style={[styles.chatDescr, {}]}>
                    <View>
                        <Image
                            style={styles.image}
                            source={require('@assets/chat.png')}
                        />
                    </View>
                    <View>
                        <Text style={styles.chatName}>{chat?.name}</Text>
                        <Text style={styles.members}>
                            {chat?.members.length} members
                        </Text>
                    </View>
                </View>
                <View style={styles.dropDownContainer}>
                    <Pressable
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 15,
                            paddingHorizontal: 6,
                            paddingVertical: 4,
                        }}
                        onPress={handleModalOpen}
                    >
                        <MaterialIcons
                            name="more-vert"
                            size={24}
                            color="lightblue"
                        />
                    </Pressable>
                    {isModalOpen && (
                        <View style={styles.dropDownContent}>
                            {isOwner ? (
                                <Button
                                    style={{ backgroundColor: 'red' }}
                                    onPress={handleDeleteChat}
                                >
                                    <Text style={{ color: 'black' }}>
                                        Delete the chat
                                    </Text>
                                </Button>
                            ) : (
                                <Button
                                    style={{ backgroundColor: 'orange' }}
                                    onPress={handleLeaveChat}
                                >
                                    <Text>Leave the chat</Text>
                                </Button>
                            )}
                        </View>
                    )}
                </View>
            </View>
            {chat && (
                <KeyboardAvoidingView
                    keyboardVerticalOffset={60}
                    behavior="padding"
                    style={styles.chatSection}
                >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={chat.messages}
                        ref={flatListRef}
                        renderItem={({ item }) => {
                            const isMyMessage = item.user.id === user?.id;
                            const isUserMessage = item.user.id !== '7777';
                            return (
                                <View
                                    style={[
                                        styles.messageContainer,
                                        isMyMessage && styles.myMessages,
                                    ]}
                                >
                                    {isUserMessage ? (
                                        <>
                                            {isMyMessage ? (
                                                <Image
                                                    style={styles.chatAvatar}
                                                    source={require('@assets/myavatar.png')}
                                                />
                                            ) : (
                                                <Image
                                                    style={styles.chatAvatar}
                                                    source={require('@assets/avatar.png')}
                                                />
                                            )}

                                            <View style={styles.userMessages}>
                                                <Text
                                                    style={{
                                                        marginBottom: 8,
                                                        color: '#433D8B',
                                                        fontSize: 14,
                                                        fontWeight: '700',
                                                    }}
                                                >
                                                    {item.user.name}
                                                </Text>
                                                <Text>{item.message}</Text>
                                            </View>
                                        </>
                                    ) : (
                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text
                                                style={[styles.systemMessage]}
                                            >
                                                {item.message}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            );
                        }}
                    />
                </KeyboardAvoidingView>
            )}
            <View style={styles.footer}>
                {isMember ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            gap: 20,
                        }}
                    >
                        <Input
                            style={{ flex: 1 }}
                            value={newMessage}
                            onChangeText={handleNewMessageChange}
                        />
                        <Button
                            style={{
                                backgroundColor: 'transparent',
                                paddingVertical: 0,
                                paddingHorizontal: 0,
                            }}
                            onPress={handleAddMessage}
                        >
                            <AntDesign
                                name="upcircleo"
                                size={34}
                                color="#478CCF"
                            />
                        </Button>
                    </View>
                ) : (
                    <Button style={styles.joinChatBtn} onPress={handleJoinChat}>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 18,
                            }}
                        >
                            Join chat
                        </Text>
                    </Button>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    hedearContainer: {
        width: '100%',
        backgroundColor: 'lightblue',
        paddingTop: 40,
        height: 100,
        paddingLeft: 20,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatDescr: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 15,
    },
    chatName: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.4,
        lineHeight: 28,
    },
    dropDownContainer: {
        position: 'relative',
    },
    dropDownContent: {
        position: 'absolute',
        height: 50,
        bottom: 0,
        left: -200,
        width: 200,
        borderRadius: 9,
        transform: [{ translateY: 10 }],
        backgroundColor: 'white',
        padding: 8,
        gap: 5,
    },
    members: {
        fontSize: 12,
        color: 'gray',
    },
    image: {
        width: 35,
        height: 35,
    },
    chatSection: {
        backgroundColor: '#FBEAFF',
        paddingHorizontal: 10,
        flex: 1,
    },
    chatAvatar: {
        width: 35,
        height: 35,
    },
    messageContainer: {
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center',
    },
    userMessages: {
        padding: 8,
        backgroundColor: 'white',
        color: 'darkqray',
        marginVertical: 15,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },
    myMessages: {
        flexDirection: 'row-reverse',
    },
    systemMessage: {
        textAlign: 'center',
        color: 'darkgray',
        fontSize: 13,
    },
    footer: {
        bottom: 0,
        height: 60,
    },
    joinChatBtn: {
        borderRadius: 0,
        backgroundColor: '#3FA2F6',
        height: '100%',
    },
});
