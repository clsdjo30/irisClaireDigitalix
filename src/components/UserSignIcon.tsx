import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;

const ASTRO_ICON = [
    { aquarius: require('../../assets/icons/astroSign/aquarius.png') },
    { aries: require('../../assets/icons/astroSign/aries.png') },
    { cancer: require('../../assets/icons/astroSign/cancer.png') },
    { capricorn: require('../../assets/icons/astroSign/capricorn.png') },
    { gemini: require('../../assets/icons/astroSign/gemini.png') },
    { leo: require('../../assets/icons/astroSign/leo.png') },
    { libra: require('../../assets/icons/astroSign/libra.png') },
    { pisces: require('../../assets/icons/astroSign/pisces.png') },
    { sagittarius: require('../../assets/icons/astroSign/sagittarius.png') },
    { scorpio: require('../../assets/icons/astroSign/scorpio.png') },
    { taurus: require('../../assets/icons/astroSign/taurus.png') },
    { virgo: require('../../assets/icons/astroSign/virgo.png') },
];

const UserSignIcon = (userSign: string, name: string) => {
    const astroIcon = ASTRO_ICON.find((item) => item.hasOwnProperty(userSign.toLowerCase()));

    if (astroIcon) {
        return (
            <View style={styles.blockSign}>
                <Image source={Object.values(astroIcon)[0]} style={styles.astroImage} />
                <Text style={styles.signText}>{name}</Text>
            </View>
        );
    }

    return null;
};


const styles = StyleSheet.create({
    blockSign: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    astroImage: {
        width: 60,
        height: 60,
    },
    signText: {
        paddingTop: 10,
        color: colors.palette.violet,
        fontSize:  SCREEN_FONT_SCALE +12,
        fontFamily: 'mulishLight',
    },
});

export default UserSignIcon;