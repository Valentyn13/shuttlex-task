import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@shared/ui';
import { Input } from '@shared/ui/input/input';

type CreateChatSectionProps = {
    isNameInputOpen: boolean;
    handleNewName: (name: string) => void;
    handleAddNewChat: () => void;
    handleOpenInput: () => void;
};

export const CreateChatSection: FC<CreateChatSectionProps> = ({
    isNameInputOpen,
    handleAddNewChat,
    handleNewName,
    handleOpenInput,
}) => {
    return (
        <View style={styles.container}>
            {isNameInputOpen && (
                <Input
                    placeholder="Enter chat name"
                    onChangeText={handleNewName}
                />
            )}
            {isNameInputOpen ? (
                <Button style={styles.button} onPress={handleAddNewChat}>
                    <Text style={styles.buttonText}>Create chat</Text>
                </Button>
            ) : (
                <Button style={styles.button} onPress={handleOpenInput}>
                    <Text style={styles.buttonText}>Add new chat</Text>
                </Button>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 10,
        height: 120,
    },
    button: {
        height: '50%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});
