import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Button } from '@shared/ui';
import { Input } from '@shared/ui/input/input';
type ChatFooterProps = {
    isMember: boolean;
    newMessage: string;
    handleNewMessageChange: (message: string) => void;
    handleJoinChat: () => void;
    handleAddMessage: () => void;
};
export const ChatFooter: FC<ChatFooterProps> = ({
    isMember,
    newMessage,
    handleAddMessage,
    handleJoinChat,
    handleNewMessageChange,
}) => {
    return (
        <View style={styles.footer}>
            {isMember ? (
                <View style={styles.footerLayoyt}>
                    <Input
                        style={{ flex: 1 }}
                        value={newMessage}
                        onChangeText={handleNewMessageChange}
                    />
                    <Button
                        style={styles.sendButton}
                        onPress={handleAddMessage}
                    >
                        <AntDesign name="upcircleo" size={34} color="#478CCF" />
                    </Button>
                </View>
            ) : (
                <Button style={styles.joinChatBtn} onPress={handleJoinChat}>
                    <Text style={styles.buttonText}>Join chat</Text>
                </Button>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    joinChatBtn: {
        borderRadius: 0,
        backgroundColor: '#3FA2F6',
        height: '100%',
    },
    footerLayoyt: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 20,
    },
    sendButton: {
        backgroundColor: 'transparent',
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    footer: {
        bottom: 0,
        height: 60,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});
