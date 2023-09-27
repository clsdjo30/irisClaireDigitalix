import React, { useRef, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageSourcePropType, 
    BackHandler
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '../../../theme';
import { useDaydrawStore } from '../../../hooks/useDayDrawStore';
import NavigationButton from '../../../components/NavigationButton';
import { SCREEN_WIDTH } from '../../../utils/constants';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

const TendanceResultScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [ daydraw ] = useDaydrawStore();
    const viewRef = useRef<View>(null);

    useEffect(() => {
     
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);
   
    const captureAndShare = async (viewRef:  React.ReactInstance | React.RefObject<unknown>) => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
        }

        // Capturez l'écran
        const uri = await captureRef(viewRef, {
            format: 'png',
            quality: 1,
        });

        // Partagez l'image
        await Sharing.shareAsync(uri);
    }

    return (

        <View style={styles.container} testID={'day-result-screen'}>
            <View style={styles.tendanceScreen} ref={viewRef}>
                <View style={styles.cardContainer}>
                    <Image source={daydraw.daycardimage as ImageSourcePropType} style={styles.fortuneTeller} />
                </View>
                <View style={styles.tendanceTextContainer}>
                    <Text style={styles.cardNameTextStyle}>{daydraw.daycard}</Text>
                    <Text style={styles.textStyle}>{daydraw.daytendance}</Text>
                </View>
            </View>

            <View style={styles.blockButton}>
                <NavigationButton
                    testID='share-result-button'
                    color={colors.palette.violetBg}
                    backgroundColor={colors.palette.orange}
                    width={SCREEN_WIDTH / 1.3}
                    title="Partagez votre tendance"
                    onPress={() => captureAndShare(viewRef)}
                />
                <NavigationButton
                    testID='day-result-button'
                    color={colors.palette.violet}
                    backgroundColor={colors.palette.violetClair}
                    width={SCREEN_WIDTH / 1.3}
                    title="A Demain"
                    onPress={() => navigation.navigate('Home')}
                />
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
        height: "90%",
        backgroundColor: colors.palette.purple600,
        alignItems: 'center',
    },
    cardContainer: {
        position: 'relative',
        top: 0,
        width: 170,
        height: 200,
    },
    fortuneTeller: {
        width: 170,
        height: 300,
    },
    tendanceTextContainer: {
        position: 'relative',
        top: 100,
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
    blockButton: {
        position: 'absolute',
        bottom: 30,
    },
});

export default TendanceResultScreen;