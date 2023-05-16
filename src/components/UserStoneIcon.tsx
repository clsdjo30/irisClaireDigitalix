import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;

const STONE_ICON = [
    { onyx: require('../../assets/icons/stones/onyx.png') },
    { garnet: require('../../assets/icons/stones/garnet.png') },
    { amethyst: require('../../assets/icons/stones/amethyst.png') },
    { emerald: require('../../assets/icons/stones/emerald.png') },
    { ruby: require('../../assets/icons/stones/ruby.png') },
    { sapphire: require('../../assets/icons/stones/sapphire.png') },
    { topaz: require('../../assets/icons/stones/topaz.png') },
    { agate: require('../../assets/icons/stones/agate.png') },
    { beryl: require('../../assets/icons/stones/beryl.png') },
    { chrysolite: require('../../assets/icons/stones/chrysolite.png') },
    { camelian: require('../../assets/icons/stones/camelian.png') },
    { heliotrope: require('../../assets/icons/stones/heliotrope.png') },

  ];

 
  const UserStoneIcon = (userStone: string, name: string) => {
    const stoneIcon = STONE_ICON.find((item) => item.hasOwnProperty(userStone.toLowerCase()));
    const stone = userStone;
    if (stoneIcon) {
      return (
        <View style={styles.blockSign}>
          <Image source={Object.values(stoneIcon)[0]} style={styles.stoneImage} />
          <Text style={styles.signText}>{name} </Text>
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
    stoneImage: {
      width: SCREEN_WIDTH * 0.1 ,
      height: SCREEN_HEIGHT * 0.09,
      },
    signText: {
        color: colors.palette.ivory,
        fontSize: 13,
        fontFamily: 'mulishLight',
        textTransform: 'capitalize',
    },
});

export default UserStoneIcon;