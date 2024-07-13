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
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

import { chatsActions } from '@store/slices';

import { Button, Message, useAppDispatch, useAppSelector } from '@shared/index';
import { Input } from '@shared/ui/input/input';

export const ChatScreen = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const chat = useAppSelector((state) => state.chats.currentChat);
    const user = useAppSelector((state) => state.chats.user);

    const flatListRef = useRef<FlatList<Message>>(null);
    const [newMessage, setNewMssage] = useState('');
    useEffect(() => {
        dispatch(chatsActions.getChat());
    }, [dispatch]);

    const handleGoBack = () => {
        router.back();
    };

    const handleNewMessageChange = (message: string) => {
        setNewMssage(message);
    };

    const handleAddMessage = () => {
        if (user && newMessage.trim() !== '') {
            dispatch(
                chatsActions.addMessage({
                    message: newMessage,
                    user,
                }),
            );
            setNewMssage('');
        }
        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd();
            }
        }, 0);
    };
    //const isMember = chat?.members.find((member) => member.id === user?.id);
    const isMember = true;

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setTimeout(() => {
                    if (flatListRef.current) {
                        flatListRef.current.scrollToEnd();
                    }
                }, 40);
            },
        );

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <View>
            <View style={styles.hedearContainer}>
                <View>
                    <Pressable onPress={handleGoBack}>
                        <Ionicons
                            name="arrow-back-sharp"
                            color={'white'}
                            size={25}
                        />
                    </Pressable>
                </View>
                <View style={styles.chatDescr}>
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
                            const isUserMessage = item.user.id !== 7777;
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
                    <Button style={styles.joinChatBtn} onPress={() => {}}>
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
        paddingTop: 60,
        paddingLeft: 20,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chatDescr: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 35,
        gap: 15,
    },
    chatName: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.4,
        lineHeight: 28,
    },
    members: {
        fontSize: 12,
        color: 'gray',
    },
    image: {
        width: 35,
        height: 35,
    },
    // Chat styles
    chatSection: {
        position: 'relative',
        backgroundColor: '#FBEAFF',
        height: '100%',
        paddingHorizontal: 10,
        paddingBottom: 174,
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
    // Footer styles
    footer: {
        position: 'absolute',
        bottom: 112,
        left: 0,
        right: 0,
        height: 60,
    },
    joinChatBtn: {
        borderRadius: 0,
        backgroundColor: 'blue',
        height: '100%',
    },
});
