import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useSocket } from '../../context/socket';

import { ChatItem } from './chat-item/chat-item';
import { CreateChatSection } from './create-chat/craete-chat';
import { MainHeader } from './header/header';

import { chatsActions } from '@store/slices';
import { getAllChats } from '@store/slices/chats/actions';

import { MessageAction } from '@shared/constants/enums/message-action.enum';
import {
    ChatWithoutMessages,
    Container,
    SliceState,
    useAppDispatch,
    useAppSelector,
} from '@shared/index';
import { generateSystemMessage } from '@shared/lib/helpers/generate-system-message-data';
import { Loader } from '@shared/ui/loader/loader';

const MainScreen = () => {
    const dispatch = useAppDispatch();

    const { socket } = useSocket();

    const { chats, user, state } = useAppSelector((state) => state.chats);

    const [chatName, setChatName] = useState('');
    const [isNameInputOpen, setIsNameInputOpen] = useState(false);

    const isLoading = state === SliceState.LOADING;

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
                    generateSystemMessage(user.name, MessageAction.CREATE_CHAT),
                ],
            };
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
            socket.off('DECREASE_MEMBER');
        };
    }, [socket, dispatch]);

    return (
        <Container style={[styles.container, isLoading && { padding: 0 }]}>
            <MainHeader />
            {isLoading && <Loader />}
            <FlatList
                style={{ flex: 1 }}
                data={chats}
                renderItem={({ item }) => <ChatItem item={item} />}
            />
            <CreateChatSection
                isNameInputOpen={isNameInputOpen}
                handleNewName={handleNewName}
                handleAddNewChat={handleAddNewChat}
                handleOpenInput={handleOpenInput}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 15,
    },
});

export { MainScreen };
