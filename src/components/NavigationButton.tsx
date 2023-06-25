import React from 'react';
import { Pressable, Text, StyleSheet, Dimensions} from 'react-native';
import { colors } from '../theme';

const { width, height } = Dimensions.get('screen');

type NavigationButtonProps = {
    title: string;
    onPress: () => void;
    width?: number;
    color?: string;
    backgroundColor?: string;
  };

const NavigationButotn: React.FC<NavigationButtonProps>  = ({ title, onPress, width, color, backgroundColor }) => {
    const buttonStyle = [styles.button, { width, backgroundColor }];
    const textStyle = [styles.buttonText, { color }];

  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}

export default NavigationButotn;

const styles = StyleSheet.create({
    button: {
        marginBottom: 10,
        borderRadius: 16,
        alignItems: "center",
        paddingVertical: 5,
    },
    buttonText: {
        fontFamily: "mulishBold",
        fontSize: 14,
    },
});
