import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme';

interface UserStoneIconProps {
  userStone: string | null;
  name: string | null;
}

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

 
  const UserStoneIcon: React.FC<UserStoneIconProps> = ({userStone, name}) => {
    const stoneIcon = userStone ? STONE_ICON.find((item) => item.hasOwnProperty(userStone.toLowerCase())) : null;
    const stone = userStone;
    if (stoneIcon) {
      return (
        <View style={styles.blockSign}>
          <Image testID="stone-image" source={Object.values(stoneIcon)[0]} style={styles.stoneImage} />
          {name && <Text testID="stone-name" style={styles.signText}>Ma Pierre</Text>}
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