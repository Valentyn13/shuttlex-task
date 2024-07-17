import { FC } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { useAppSelector } from '@shared/index';
import { Button } from '@shared/ui';

type ChatHeaderProps = {
    isModalOpen: boolean;
    isOwner: boolean;
    handleDeleteChat: () => void;
    handleLeaveChat: () => void;
    handleGoBack: () => void;
    handleModalOpen: () => void;
};

export const ChatHeader: FC<ChatHeaderProps> = ({
    isModalOpen,
    isOwner,
    handleDeleteChat,
    handleGoBack,
    handleLeaveChat,
    handleModalOpen,
}) => {
    const chat = useAppSelector((state) => state.chats.currentChat);
    return (
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
    image: {
        width: 35,
        height: 35,
    },
    members: {
        fontSize: 12,
        color: 'gray',
    },
    chatName: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.4,
        lineHeight: 28,
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

    dropDownContainer: {
        position: 'relative',
    },
});
