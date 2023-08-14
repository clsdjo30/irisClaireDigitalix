import React from 'react';
import { View, Image, Text, StyleSheet , Dimensions} from 'react-native';
import { colors } from '../theme';

interface UserElementIconProps {
    userElement: string | null;
}

const air = require('../../assets/icons/elements/air.png');
const earth = require('../../assets/icons/elements/earth.png');
const fire = require('../../assets/icons/elements/fire.png');
const water = require('../../assets/icons/elements/water.png');

const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;

const UserElementIcon: React.FC<UserElementIconProps> = ({userElement}) => {


    if (userElement === 'Air' ) {
       
        return (
            <View style={styles.blockSign}>
                <Image testID='element-image' source={air} style={styles.elementImage} />
                <Text style={styles.signText}>Mon Element</Text>
            </View>
        );
    }

    if (userElement === 'Water' ) {
        return (
            <View style={styles.blockSign}>
                <Image testID='element-image' source={water} style={styles.elementImage} />
                <Text style={styles.signText}>Mon Element</Text>
            </View>
        );
    };

    if (userElement === 'Fire' ) {
        return (
            <View style={styles.blockSign}>
                <Image testID='element-image' source={fire} style={styles.elementImage} />
                <Text style={styles.signText}>Mon Element</Text>
            </View>
        );
    };

    if (userElement === 'Earth' ) {
        return (
            <View style={styles.blockSign}>
                <Image testID='element-image' source={earth} style={styles.elementImage} />
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
        fontFamily: 'mulishRegular',
    },
});

export default UserElementIcon;