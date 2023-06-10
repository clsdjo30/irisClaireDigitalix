import React from 'react';
import { View, Image, Text, StyleSheet , Dimensions} from 'react-native';
import { colors } from '../theme';
import { useUserStore } from '../utils/hooks/useUserStore';


const air = require('../../assets/icons/elements/air.png');
const earth = require('../../assets/icons/elements/earth.png');
const fire = require('../../assets/icons/elements/fire.png');
const water = require('../../assets/icons/elements/water.png');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;

const UserSignIcon = (userElement: string, name: string) => {


    if (userElement === 'air' ) {
       
        return (
            <View style={styles.blockSign}>
                <Image source={air} style={styles.elementImage} />
                <Text style={styles.signText}>{name}</Text>
            </View>
        );
    }

    if (userElement === 'water' ) {
        return (
            <View style={styles.blockSign}>
                <Image source={water} style={styles.elementImage} />
                <Text style={styles.signText}>{name}</Text>
            </View>
        );
    };

    if (userElement === 'fire' ) {
        return (
            <View style={styles.blockSign}>
                <Image source={fire} style={styles.elementImage} />
                <Text style={styles.signText}>{name}</Text>
            </View>
        );
    };

    if (userElement === 'earth' ) {
        return (
            <View style={styles.blockSign}>
                <Image source={earth} style={styles.elementImage} />
                <Text style={styles.signText}>{name}</Text>
            </View>
        );
    };
};


const styles = StyleSheet.create({
    blockSign: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -5,
    },
    elementImage: {
        width: 70,
        height: 70,
    },
    signText: {
        paddingTop: 5,
        color: colors.palette.violet,
        fontSize: 13,
        fontFamily: 'mulishLight',
        textTransform: 'capitalize',
    },
});

export default UserSignIcon;