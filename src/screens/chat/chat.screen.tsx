import { useEffect } from 'react';
import { Text, View } from 'react-native';

//import { useRouter } from 'expo-router';
import { chatsActions } from '@store/slices';

import { Container, useAppDispatch, useAppSelector } from '@shared/index';

export const ChatScreen = () => {
    const dispatch = useAppDispatch();
    //const router = useRouter();

    const chat = useAppSelector((state) => state.chats.currentChat);
    useEffect(() => {
        dispatch(chatsActions.getChat());
    }, [dispatch]);

    useEffect(() => {
        console.log(chat);
    }, [chat]);

    return (
        <Container>
            <View>
                <Text>Chat page</Text>
            </View>
        </Container>
    );
};
