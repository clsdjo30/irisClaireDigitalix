import React, { useState, useEffect, useRef, RefObject } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  ImageSourcePropType,
  Text,
  ViewStyle
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CARD_DECK from '../../../data/cards';
import { colors } from '../../../theme/color'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import {
  useCrossQuestionStore
} from '../../../hooks/useCrossQuestionStore';
import CustomModal from '../../../components/reusable/CustomModal';
import FlipCard from '../../../components/FlipCard';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../utils/constants';



const CrossDrawScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  // on stocke les informations du tirage en croix
  const [value, setValue] = useCrossQuestionStore();
  // Ajoutez un nouvel état pour suivre la carte actuellement sélectionnée
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const [selectedCards, setSelectedCards] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [credit, setCredit] = useState(5);




  // On utilise useEffect pour détecter quand l'utilisateur a retourné les 4 cartes.
  const handleCardFlip = (index: number) => {

    if (selectedCards === 0) {
      setValue({
        ...value,
        choosecardnumber: CARD_DECK[index].id,
        choosecardname: CARD_DECK[index].name,
        choosecardpseudo: CARD_DECK[index].pseudo,
      });
      setSelectedCards(selectedCards + 1);
      setSelectedCardIndex(index);
    }
    if (selectedCards === 1) {
      setValue({
        ...value,
        choosecardtwonumber: CARD_DECK[index].id,
        choosecardtwoname: CARD_DECK[index].name,
        choosecardtwopseudo: CARD_DECK[index].pseudo,
      });
      setSelectedCards(selectedCards + 1);
      setSelectedCardIndex(index);
    }
    if (selectedCards === 2) {
      setValue({
        ...value,
        choosecardthreenumber: CARD_DECK[index].id,
        choosecardthreename: CARD_DECK[index].name,
        choosecardthreepseudo: CARD_DECK[index].pseudo,
      });
      setSelectedCards(selectedCards + 1);
      setSelectedCardIndex(index);
    }
    if (selectedCards === 3) {
      setValue({
        ...value,
        choosecardfournumber: CARD_DECK[index].id,
        choosecardfourname: CARD_DECK[index].name,
        choosecardfourpseudo: CARD_DECK[index].pseudo,
      })
      setSelectedCards(selectedCards + 1);
      setSelectedCardIndex(index);

    }
    if (selectedCards === 4) {
      setValue({
        ...value,
        choosecardfivenumber: CARD_DECK[index].id,
        choosecardfivename: CARD_DECK[index].name,
        choosecardfivepseudo: CARD_DECK[index].pseudo,
      }

      );

      setSelectedCards(selectedCards + 1);
      setSelectedCardIndex(index);
      setTimeout(() => {
        setModalVisible(true);
      }, 1500);
    };

  }
 
  function gotToResult() {
    navigation.navigate('DrawResult');
  }
  function cancelModal() {
    navigation.navigate('Home');
  }
  function goBuyCredit() {
    navigation.navigate('Iris')
    //reinitialise la navigation de YesStack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }]
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header} />
      <View style={styles.deckContainer}>
        <View style={styles.titleText}>
          <Text style={styles.title}>
            Concentrez-vous sur votre question et tirer 5 cartes !
          </Text>
        </View>

        {CARD_DECK.map((card, index) => (
          <FlipCard
            key={index}
            frontImageUrl={card.frontImageUrl}
            backImageUrl={card.backImageUrl}
            onFlip={() => { handleCardFlip(index) }}
            style={{ zIndex: selectedCardIndex === index ? 1000 : 0 }}
          />
        ))}

        {/* Display Modal when all cards are flipped */}
        <CustomModal
          visible={modalVisible}
          credit={credit}
          modalText='Voulez-vous utiliser 3 credits pour voir le résultat ?'
          useCreditButtonTitle='Utiliser 3 credits'
          onValidate={() => {
            setModalVisible(!modalVisible);
            setCredit(credit - 1);
            gotToResult();
          }}
          onCancel={cancelModal}
          onBuyCredit={() => {
            goBuyCredit();
          }}

        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: "absolute",
    top: 0,
    width: SCREEN_WIDTH - 5,
    height: SCREEN_HEIGHT * 0.4,
    borderBottomLeftRadius: SCREEN_WIDTH * 0.1,
    borderBottomRightRadius: SCREEN_WIDTH * 0.1,
    backgroundColor: colors.palette.violet,
  },
  titleText: {
    width: "90%",
    height: "10%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'MulishRegular',
    fontSize: 18,
    color: colors.palette.violetClair,
  },
  deckContainer: {
    height: "80%",
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: SCREEN_WIDTH / 6,
    height: SCREEN_HEIGHT / 5,
    margin: 5,
    justifyContent: 'center',
    zIndex: 0,
    borderRadius: 10,
    elevation: 3,
    shadowColor: colors.palette.violetClair,
  },
  image: {
    width: SCREEN_WIDTH / 6,
    height: SCREEN_HEIGHT / 5,
    resizeMode: 'cover',
    borderRadius: 6,

  },
  // Modal Style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CrossDrawScreen;
