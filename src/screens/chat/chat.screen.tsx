import { useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useSocket } from '../../context/socket';

import { ChatHeader } from './chat-header/chat-header';
import { ChatFooter } from './footer/footer';
import { Messages } from './messages/messages';

import { chatsActions } from '@store/slices';

import {
    Message,
    SliceState,
    useAppDispatch,
    useAppSelector,
} from '@shared/index';
import { addChatActionMessage } from '@shared/lib/helpers/generate-system-message-data';
import { Loader } from '@shared/ui/loader/loader';

export const ChatScreen = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { socket } = useSocket();
    const { id } = useLocalSearchParams();

    const flatListRef = useRef<FlatList<Message>>(null);

    const {
        currentChat: chat,
        user,
        state,
    } = useAppSelector((state) => state.chats);

    const isLoading = state === SliceState.LOADING;

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
        if (user && chat) {
            socket?.emit(
                'ADD_MESSAGE',
                addChatActionMessage(user.name, chat._id),
            );

            socket?.emit('LEFT_CHAT', { userId: user.id, chatId: chat._id });

            setIsModalOpen(false);

            router.back();
        }
    };

    const handleJoinChat = () => {
        if (user && chat) {
            dispatch(chatsActions.joinToChat(user));

            socket?.emit('MANUAL_JOIN', { chatID: chat._id, member: user });
            socket?.emit(
                'ADD_MESSAGE',
                addChatActionMessage(user.name, chat._id),
            );
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
        if (user && chat) {
            socket?.emit('CHAT_OPEN', { chatID: chat._id, userID: user.id });
        }
    }, [user, socket, chat]);

    useEffect(() => {
        if (!socket) return;

        socket.on('UPDATE_CHAT', (message: Message) => {
            dispatch(chatsActions.addMessage(message));
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
        <View style={styles.container}>
            {isLoading && <Loader />}
            <ChatHeader
                isModalOpen={isModalOpen}
                isOwner={isOwner}
                handleDeleteChat={handleDeleteChat}
                handleLeaveChat={handleLeaveChat}
                handleGoBack={handleGoBack}
                handleModalOpen={handleModalOpen}
            />
            {chat && (
                <Messages user={user} chat={chat} flatListRef={flatListRef} />
            )}
            <ChatFooter
                isMember={!!isMember}
                newMessage={newMessage}
                handleNewMessageChange={handleNewMessageChange}
                handleAddMessage={handleAddMessage}
                handleJoinChat={handleJoinChat}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});
