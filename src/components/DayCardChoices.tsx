import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../theme';
import { styles } from '../screens/Main/HomeScreen.styles';
import { goToDayDraw } from '../utils/NavigationFunctions';

interface DayTendanceCardProps {
    navigation: { navigate: (arg0: string) => void; };
    daycard: { isdraw: boolean; };
}

const DayTendanceCard: React.FC<DayTendanceCardProps> = ({ navigation, daycard }) => {
    const horoscope = require('../../assets/icons/horoscope.png');

    return (
        <LinearGradient
            colors={[colors.palette.violetClair, colors.palette.violetClair]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            locations={[0.1, 0.9]}
            style={styles.domainCard}
        >
            <Pressable style={styles.innerContainer} onPress={() => goToDayDraw(navigation, daycard)} testID="day-tendance-card">
                <Image source={horoscope} style={styles.icon} />
                <View style={[styles.direction]}>
                    {daycard.isdraw === false ?
                        <>
                            <Text style={styles.domainText}>Tendance du Jour</Text>
                            <Text style={styles.domainTextExplain}>Une pensée inspirante pour éclairer votre journée !</Text>
                        </>
                        :
                        <Text style={styles.domainText}>Tendance du Jour</Text>
                    }

                </View>
                <View style={styles.dayDrawAlert}>
                    {daycard.isdraw === false ?
                        <View style={styles.iconContainer}>
                            <Icon name="exclamation" size={10} color={colors.palette.ivory} testID="exclamation-icon" />
                        </View>
                        :
                        <View style={styles.iconContainerCheck}>
                            <Icon name="check" size={10} color={colors.palette.ivory} testID="check-icon" />
                        </View>
                    }
                </View>
            </Pressable>
        </LinearGradient>
    );
}

export default DayTendanceCard;
