import { FC } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ChatWithoutMessages } from '@shared/index';

type ChatItemProps = {
    item: ChatWithoutMessages;
};

export const ChatItem: FC<ChatItemProps> = ({ item }) => {
    const router = useRouter();

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
                        <Text style={styles.nameText}>{item.name}</Text>
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
};

const styles = StyleSheet.create({
    chatContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
    },
    membersText: {
        fontSize: 12,
        color: 'gray',
    },
    line: {
        height: 1,
        backgroundColor: 'lightgray',
        marginTop: 8,
    },
});
