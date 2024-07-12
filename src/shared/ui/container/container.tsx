import { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
type ContainerProps = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};
export const Container: FC<ContainerProps> = ({ style, children }) => {
    return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
});
