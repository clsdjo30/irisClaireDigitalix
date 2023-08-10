import React from 'react';
import { View, Image, Text, StyleSheet , Dimensions} from 'react-native';
import { colors } from '../theme';

interface UserElementIconProps {
    userElement: string | null;
    name: string | null;
}

const air = require('../../assets/icons/elements/air.png');
const earth = require('../../assets/icons/elements/earth.png');
const fire = require('../../assets/icons/elements/fire.png');
const water = require('../../assets/icons/elements/water.png');

const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;

const UserElementIcon: React.FC<UserElementIconProps> = ({userElement, name}) => {


    if (userElement === 'air' ) {
       
        return (
            <View style={styles.blockSign}>
                <Image testID='element-image' source={air} style={styles.elementImage} />
                <Text style={styles.signText}>{name}</Text>
            </View>
        );
    }

    if (userElement === 'water' ) {
        return (
            <View style={styles.blockSign}>
                <Image  source={water} style={styles.elementImage} />
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
                <Text style={styles.signText}>Mon Element</Text>
            </View>
        );
    };

    return null;
};


const styles = StyleSheet.create({
    blockSign: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    elementImage: {
        width: 60,
        height: 60,
    },
    signText: {
        color: colors.palette.violet,
        fontSize: SCREEN_FONT_SCALE + 12,
        fontFamily: 'mulishLight',
    },
});

export default UserElementIcon;