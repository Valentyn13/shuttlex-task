import { FC } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

type ButtonProps = {
    children: React.ReactNode;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
};

const Button: FC<ButtonProps> = ({ style, children, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.baseButton,
                pressed && { backgroundColor: '#36C2CE' },
                style,
            ]}
        >
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    baseButton: {
        backgroundColor: '#478CCF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        borderRadius: 8,
    },
});

export { Button };
