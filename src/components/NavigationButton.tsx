import React from 'react';
import { Pressable, Text, StyleSheet, Dimensions} from 'react-native';
import { colors } from '../theme';

const { width, height } = Dimensions.get('screen');

const NavigationButotn: React.FC<{ title: string, onPress: () => void }> = ({ title, onPress }) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </Pressable>
    );
}

export default NavigationButotn;

const styles = StyleSheet.create({
    button: {
        width: width -20 ,
        backgroundColor: colors.palette.orange,
        marginBottom: 10,
        borderRadius: 16,
        alignItems: "center",
        paddingVertical: 5,
    },
    buttonText: {
        fontFamily: "mulishBold",
        fontSize: 14,
        color: colors.palette.violetBg,
    },
});
