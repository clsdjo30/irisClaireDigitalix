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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_SCALE = Dimensions.get('window').scale;

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
                <Text style={styles.signText}>{name}</Text>
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

export default UserElementIcon;