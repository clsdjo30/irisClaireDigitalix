import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  Text,
  Pressable,
  Animated,
  PanResponder
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '../../../theme';
import { useDaydrawStore } from '../../../utils/hooks/useDayDrawStore';


const { width, height } = Dimensions.get('screen');
const CARD_WIDTH = width * 0.17;
const CARD_HEIGHT = CARD_WIDTH * 1.5;



const DayDrawScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState('');
  const [tendance, setTendance] = useState('');
  const [daydraw, setDayDraw] = useDaydrawStore();

  return (

    <View style={styles.container}>
      <View style={styles.container}>
            
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
  cardContainerOne: {
    position: 'absolute',
    flex: 1,
    backgroundColor: colors.tint,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,


  },
  cardContainerTwo: {
    position: 'absolute',
    flex: 1,
    backgroundColor: colors.tint,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    transform: [{ rotate: '10deg' }],
  },
  cardContainerThree: {
    position: 'absolute',
    flex: 1,
    backgroundColor: colors.tint,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    transform: [{ rotate: '-10deg' }],
  },
  cardContainerFour: {
    position: 'absolute',
    flex: 1,
    backgroundColor: colors.tint,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    transform: [{ rotate: '5deg' }],
  },
  cardContainerFive: {
    position: 'absolute',
    flex: 1,
    backgroundColor: colors.tint,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    transform: [{ rotate: '-5deg' }],
  },
  fortuneTeller: {
    width: 170,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 3,
  },


  // MODAL STYLES
  buttonOpen: {
    backgroundColor: colors.palette.lightgold,
  },
  buttonClose: {
    backgroundColor: colors.palette.darkgold
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textTendance: {
    textAlign: 'center',
    fontFamily: "mulishRegular",
    fontSize: 14,
    color: colors.palette.ivory,
    margin: 20,
  },
  modalText: {
    fontFamily: "mulishRegular",
    fontSize: 16,
    color: colors.palette.ivory,
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    width: 300,
    marginBottom: 10,
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 5,
  },
  buttonText: {
    textAlign: "center",
    padding: 3,
    fontFamily: "oswaldMedium",
    fontSize: 14,
    color: "#FFF8E7",
  },
  dayCardContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.palette.purple500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    margin: 20,
    paddingVertical: 30
  }
});

export default DayDrawScreen;