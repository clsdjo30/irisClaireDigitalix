import React, { useState, useEffect, useRef, RefObject } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  ImageSourcePropType,
  Dimensions,
  Text,
  Modal,
  ViewStyle
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CARD_DECK from '../../../data/cards';
import { colors } from '../../../theme/color';
import CustomModal from '../../../components/reusable/CustomModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import {
  useQuestionStore
} from '../../../hooks/useQuestionStore';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;

// On définit un type pour les props de notre composant FlipCard. Ces props incluent deux images: l'image de face et l'image de dos de la carte.
type CardProps = {
  frontImageUrl: Array<ImageSourcePropType>,
  backImageUrl: Array<ImageSourcePropType>,
  onFlip?: () => void,
  style?: ViewStyle
}
// Le composant FlipCard est responsable de l'affichage d'une seule carte et de la gestion de son état "flip".
const FlipCard: React.FC<CardProps> = ({ frontImageUrl, backImageUrl, onFlip, style }) => {
  // On utilise useState pour gérer l'état "flip" de la carte.
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const frontImageRef = useRef<Image>(null);
  const backImageRef = useRef<Image>(null);
  // On utilise useSharedValue de react-native-reanimated pour animer le flip de la carte.
  const flip = useSharedValue(0);
  const scale = useSharedValue(1);
  const up = useSharedValue(0);
  const left = useSharedValue(0);

  useEffect(() => {
    if (isCardFlipped) {
      frontImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: -1 }] } });
      backImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: -1 }] } });
    } else {
      frontImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: 1 }] } });
      backImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: 1 }] } });
    }
  }, [isCardFlipped]);

  // La fonction flipCard inverse l'état flip de la carte et déclenche l'animation.
  const flipCard = () => {
    if (!isFlipped) { // only allow flipping to front side
      setIsFlipped(true);
      flip.value = withTiming(180, { duration: 1200 });
      scale.value = withTiming(2, { duration: 1200 }, () => { scale.value = withTiming(1, { duration: 1200 }) });
      left.value = withTiming(-30, { duration: 1200 }, () => { left.value = withTiming(0, { duration: 1200 }) });
      up.value = withTiming(-80, { duration: 1200 }, () => { up.value = withTiming(0, { duration: 1200 }) });
      if (onFlip) { // make sure onFlip is not undefined before calling it
        onFlip();
      }
    }
  };

  // On utilise useAnimatedStyle pour créer des styles animés pour la carte.
  const animatedStyle = useAnimatedStyle(() => {
    return {
      // On anime la propriété rotateY pour créer l'effet de flip.
      transform: [
        { translateX: left.value },
        { translateY: up.value },
        { rotateY: `${flip.value}deg` },
        { scale: scale.value },
        { perspective: 1000 },
      ]
    };
  });

  return (
    <Pressable onPress={flipCard}>
      <Animated.View style={[styles.cardImage, animatedStyle, style]}>
        <Image
          ref={isFlipped ? backImageRef : frontImageRef}
          source={isFlipped ? frontImageUrl as ImageSourcePropType : backImageUrl as ImageSourcePropType}
          style={styles.image}
          onLoad={() => {
            frontImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: isFlipped ? -1 : 1 }] } });
            backImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: isFlipped ? -1 : 1 }] } });
          }}
        />
      </Animated.View>
    </Pressable>
  );
};


const DrawOneCardScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  // on stocke les informations du tirage en croix
  const [value, setValue] = useQuestionStore();
  // Ajoutez un nouvel état pour suivre la carte actuellement sélectionnée
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const [selectedCards, setSelectedCards] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [credit, setCredit] = useState(1);


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
      setTimeout(() => {
        setModalVisible(true);
      }, 2000);
    };

  }
  // l'user à valider son credit.
  function gotToResult() {
    navigation.navigate('DrawResult');
  }
  // l'user ne valide pas son credit
  function cancelModal() {
    navigation.navigate('Home');
  }

  function sendQuestion() {
    // TODO implementer la logique de validation avec credit
    if (credit > 0
      && value.question != null
      && value.choosecardname != null
      && value.choosecardnumber != null
      && value.choosecardpseudo != null
    ) {
      setCredit(credit - 1)
      navigation.navigate('YesDrawResult')
    }
    else {
      goBuyCredit()
    }
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
            Concentrez-vous sur votre question et retourné une carte !
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
          onValidate={() => {
            setModalVisible(!modalVisible);
            setCredit(credit - 1);
            sendQuestion();
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
    backgroundColor: colors.palette.violetBg
  },
  header: {
    position: 'absolute',
    top: 0,
    width: SCREEN_WIDTH - 5,
    height: SCREEN_HEIGHT * 0.4,
    borderBottomLeftRadius: SCREEN_WIDTH * 0.1,
    borderBottomRightRadius: SCREEN_WIDTH * 0.1,
    backgroundColor: colors.palette.violet
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
    color: colors.palette.violetBg,
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

export default DrawOneCardScreen;
