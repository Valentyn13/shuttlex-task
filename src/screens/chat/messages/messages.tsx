import { FC, RefObject } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Chat, Message, UserWithoutPassword } from '@shared/index';

type MessagesProps = {
    user: UserWithoutPassword | null;
    chat: Chat;
    flatListRef: RefObject<FlatList<Message>>;
};
export const Messages: FC<MessagesProps> = ({ flatListRef, user, chat }) => {
    return (
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
                                    <Text style={[styles.systemMessage]}>
                                        {item.message}
                                    </Text>
                                </View>
                            )}
                        </View>
                    );
                }}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    chatSection: {
        backgroundColor: '#FBEAFF',
        paddingHorizontal: 10,
        flex: 1,
    },
    messageContainer: {
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center',
    },
    myMessages: {
        flexDirection: 'row-reverse',
    },
    chatAvatar: {
        width: 35,
        height: 35,
    },

    userMessages: {
        padding: 8,
        backgroundColor: 'white',
        color: 'darkqray',
        marginVertical: 15,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },

    systemMessage: {
        textAlign: 'center',
        color: 'darkgray',
        fontSize: 13,
    },
});
