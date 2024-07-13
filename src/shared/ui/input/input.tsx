import { FC, useState } from 'react';
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
} from 'react-native';

interface InputProps extends TextInputProps {
    style?: StyleProp<TextStyle>;
    placeholderTextColor?: string;
    cursorColor?: string;
}

export const Input: FC<InputProps> = ({
    style,
    value,
    placeholderTextColor,
    cursorColor,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <TextInput
            value={value}
            placeholderTextColor={placeholderTextColor}
            cursorColor={cursorColor}
            {...props}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            style={[
                styles.input,
                styles.border,
                isFocused && styles.focused,
                style,
            ]}
        />
    );
};

export const styles = StyleSheet.create({
    input: {
        borderRadius: 12,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        letterSpacing: 0.5,
        justifyContent: 'center',
        lineHeight: 20,
    },
    border: {
        borderStyle: 'solid',
        borderWidth: 0.8,
        borderColor: '#F1F1F1',
    },
    focused: {
        borderColor: '#36C2CE',
    },
});
