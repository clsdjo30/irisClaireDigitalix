import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type NavigationButtonProps = {
    title: string;
    onPress: () => void;
    width?: number;
    color?: string;
  backgroundColor?: string;
    testID?: string;
  };

const NavigationButotn: React.FC<NavigationButtonProps>  = ({ title, onPress, width, color, backgroundColor, testID }) => {
    const buttonStyle = [styles.button, { width, backgroundColor }];
    const textStyle = [styles.buttonText, { color }];

  return (
    <Pressable style={buttonStyle} onPress={onPress} testID={testID}>
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
        paddingVertical: 10,
    },
    buttonText: {
        fontFamily: "mulishBold",
      fontSize: 16,
    },
});
