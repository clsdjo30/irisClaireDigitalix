import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageSourcePropType
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '../../../theme';
import { useDaydrawStore } from '../../../hooks/useDayDrawStore';
import CARD_DECK from '../../../data/cards';


const TendanceResultScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [daydraw, setDayDraw] = useDaydrawStore();
    const resetTime = 120000;
    console.log(daydraw)
    useEffect(() => {
        if (daydraw.isdraw) {
            setTimeout(() => {
                setDayDraw({
                    ...daydraw,
                    isdraw: false,
                    daycard: '',
                    daycardimage: '' as ImageSourcePropType,
                    daycardbackimage: '' as ImageSourcePropType,
                    daytendance: ''
                });
                navigation.navigate('Tirage');
            }, resetTime);
        }
    }, [daydraw.isdraw]);

    return (

        <View style={styles.container}>
            <View style={styles.tendanceScreen}>
                <View style={styles.cardContainer}>
                    <Image source={daydraw.daycardimage as ImageSourcePropType} style={styles.fortuneTeller} />
                </View>
                <View style={styles.tendanceTextContainer}>
                    <Text style={styles.cardNameTextStyle}>{daydraw.daycard}</Text>
                    <Text style={styles.textStyle}>{daydraw.daytendance}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>
                        A Demain
                    </Text>
                </TouchableOpacity>

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.palette.purple600,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tendanceScreen: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.palette.purple600,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 10,
        margin: 20,
        paddingVertical: 30
    },
    cardContainer: {
        width: 170,
        height: 300,
        borderRadius: 3,
        elevation: 5,
        shadowColor: colors.palette.ivory
    },
    fortuneTeller: {
        width: 170,
        height: 300,
        borderRadius: 3,
        resizeMode: 'cover',
    },
    tendanceTextContainer: {
        marginTop: 20,
        width: '70%',
    },
    titleStyle: {
        fontFamily: "oswaldMedium",
        fontSize: 18,
        color: colors.palette.ivory,
        textAlign: 'center',
        marginBottom: 20,
    },
    textStyle: {
        fontFamily: "mulishRegular",
        fontSize: 16,
        color: colors.palette.ivory,
        textAlign: 'center',
    },
    cardNameTextStyle: {
        fontFamily: "oswaldMedium",
        fontSize: 22,
        color: colors.palette.lightgold,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        width: 300,
        backgroundColor: "#CBA135",
        marginTop: 60,
        marginBottom: 10,
        borderRadius: 16,
        alignItems: "center",
        paddingVertical: 5,
    },
    buttonText: {
        fontFamily: "oswaldMedium",
        fontSize: 14,
        color: colors.palette.ivory,
    },
});

export default TendanceResultScreen;