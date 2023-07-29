import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../screens/Main/HomeScreen.styles';

interface DayCardProps {
    isDraw: boolean;
    dayTendance: string;
}

const DayCard: React.FC<DayCardProps> = ({ isDraw, dayTendance }) => (
    <View style={styles.tendanceContainer}>
        {isDraw === false ?
            <>
                <View style={styles.tendanceTextContainer}>
                    <Text style={styles.tendanceText}>
                        Allez vite découvrir la tendance de votre journée !
                    </Text>
                </View>
            </>
            :
            <>
                <View style={styles.tendanceTextContainer}>
                    <Text style={styles.displayTextTendance}>
                        {dayTendance}
                    </Text>
                </View>
            </>
        }
    </View>
);

export default DayCard;
