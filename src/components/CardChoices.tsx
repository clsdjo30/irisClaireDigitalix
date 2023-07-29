import React from 'react';
import { View, Pressable, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../screens/Main/HomeScreen.styles';
import { colors } from '../theme/color';

interface CardChoicesProps {
    iconSource: any;
    onPress: () => void;
    title: string;
    explanation: string;
}

const CardChoices: React.FC<CardChoicesProps> =({ iconSource, onPress, title, explanation }) => (
    <LinearGradient
        colors={[colors.palette.violetClair, colors.palette.violetClair]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        locations={[0.1, 0.9]}
        style={styles.domainCard}
    >
        <Pressable
            onPress={onPress}
            style={styles.innerContainer}
        >
            <Image source={iconSource} style={styles.icon} />
            <View style={styles.direction}>
                <Text style={styles.domainText}>{title}</Text>
                <Text style={styles.domainTextExplain}>{explanation}</Text>
            </View>
        </Pressable>
    </LinearGradient>
);

export default CardChoices;
