import React, { useState, useEffect } from 'react';
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
import CARD_DECK from '../../../utils/cards';
import { colors } from '../../../theme/color'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

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
const FlipCard: React.FC<CardProps> = ({ frontImageUrl, backImageUrl, onFlip, style}) => {
  // On utilise useState pour gérer l'état "flip" de la carte.
  const [isFlipped, setIsFlipped] = useState(false);
  // On utilise useSharedValue de react-native-reanimated pour animer le flip de la carte.
  const flip = useSharedValue(0);
  const scale = useSharedValue(1);
  const up = useSharedValue(0);

  // La fonction flipCard inverse l'état flip de la carte et déclenche l'animation.
  const flipCard = () => {
    if (!isFlipped) { // only allow flipping to front side
      setIsFlipped(true);
      flip.value = withTiming(180, { duration: 1500 });
      up.value = withTiming(-200, { duration: 1500 }, () => { up.value = withTiming(0, { duration: 1000 })});
      scale.value = withTiming(2, { duration: 1500 }, () => { scale.value = withTiming(1, { duration: 1000 })});
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
        { rotateY: `${flip.value}deg` },
        { perspective: 1000},
        { translateY: up.value },
        {scale: scale.value  }
      ]
    };
  });

  return (
    <Pressable onPress={flipCard}>
      <Animated.View style={[styles.cardImage, animatedStyle, style]}>
        <Image source={isFlipped ? frontImageUrl as ImageSourcePropType : backImageUrl as ImageSourcePropType} style={styles.image} />
      </Animated.View>
    </Pressable>
  );
};


const CrossDrawScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  // Ajoutez un nouvel état pour suivre la carte actuellement sélectionnée
const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const [selectedCards, setSelectedCards] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [credit, setCredit] = useState(10);

  // On utilise useEffect pour détecter quand l'utilisateur a retourné les 4 cartes.
  const handleCardFlip = (index: number) => {
    setSelectedCards(selectedCards + 1);
    setSelectedCardIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.deckContainer}>
        <View style={styles.titleText}>
          <Text style={styles.title}>
            Concentrez-vous sur votre question et tirer 4 cartes !
          </Text>
        </View>

        {CARD_DECK.map((card, index) => (
          <FlipCard
            key={index}
            frontImageUrl={card.frontImageUrl}
            backImageUrl={card.backImageUrl}
            onFlip={selectedCards < 3 ? () => handleCardFlip(index) : () => setModalVisible(true)}
            style={{ zIndex: selectedCardIndex === index ? 1000 : 0 }} 
          />
        ))}

        {/* Display Modal when all cards are flipped */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}

        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* TODO implementer la logique de validation avec credit  */}
              {credit > 0
                ?
                <>
                  <Text style={styles.modalText}>Utilez 1 credit pour voir votre reponse</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setCredit(credit - 1);
                    }}
                  >
                    <Text style={styles.textStyle}>Voir votre résultat</Text>
                  </Pressable>
                </>
                :
                <>
                  <Text style={styles.modalText}>Vous n'avez plus de credit disponible </Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                  >
                    <Text style={styles.textStyle}>Acheter des credits</Text>
                  </Pressable>
                </>
              }
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.grayscale
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
    color: colors.palette.violet,
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
  },
  image: {
    width: SCREEN_WIDTH / 6,
    height: SCREEN_HEIGHT / 5,
    resizeMode: 'contain'

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
