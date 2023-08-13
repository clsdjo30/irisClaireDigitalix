import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme';

interface UserStoneIconProps {
  userStone: string | null;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;

const STONE_ICON = [
    { Onyx: require('../../assets/icons/stones/onyx.png') },
    { Cornaline: require('../../assets/icons/stones/garnet.png') },
    { Amethyst: require('../../assets/icons/stones/amethyst.png') },
    { Emerald: require('../../assets/icons/stones/emerald.png') },
    { Ruby: require('../../assets/icons/stones/ruby.png') },
    { Sapphire: require('../../assets/icons/stones/sapphire.png') },
    { Topaz: require('../../assets/icons/stones/topaz.png') },
    { Agate: require('../../assets/icons/stones/agate.png') },
    { Beryl: require('../../assets/icons/stones/beryl.png') },
    { Chrysolite: require('../../assets/icons/stones/chrysolite.png') },
    { Camelian: require('../../assets/icons/stones/camelian.png') },
    { Heliotrope: require('../../assets/icons/stones/heliotrope.png') },

  ];

 
  const UserStoneIcon: React.FC<UserStoneIconProps> = ({userStone}) => {
    const stoneIcon = userStone ? STONE_ICON.find((item) => item.hasOwnProperty(userStone)) : null;
    if (stoneIcon) {
      return (
        <View style={styles.blockSign}>
          <Image testID="stone-image" source={Object.values(stoneIcon)[0]} style={styles.stoneImage} />
          <Text style={styles.signText}>Ma Pierre</Text>
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
      width: 60,
      height: 60,
      },
    signText: {
      color: colors.palette.violet,
      fontSize: SCREEN_FONT_SCALE + 12,
      fontFamily: 'mulishRegular',
    },
});

export default UserStoneIcon;