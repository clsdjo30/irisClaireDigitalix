import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  ImageSourcePropType,
  StatusBar,
  Dimensions
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/color';
import CARD_DECK from '../../../utils/cards';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;

const CrossDrawScreen = () => {
  const [selectedCards, setSelectedCards] = useState<Array<any>>([]);
  const [cards, setCards] = useState<
    Array<{ id: number; frontImageUrl: string; backImageUrl: string }>
  >([]);
  const [flippedCardIndex, setFlippedCardIndex] = useState(-1);

  const rotates = useSharedValue<number[]>([]);

  useEffect(() => {
    setCards(shuffleCards(CARD_DECK));
    rotates.value = CARD_DECK.map(() => withTiming(0, { duration: 500 }));
  }, []);

  const shuffleCards = (
    cards: Array<{ id: number; frontImageUrl: string; backImageUrl: string }>
  ) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const selectCard = (card: any) => {
    if (selectedCards.length < 4) {
      setSelectedCards((prevSelectedCards) => [...prevSelectedCards, card]);
    }
  };

  const flipCard = (index: number) => {
    setFlippedCardIndex(index);
    rotates.value[index] = withTiming(180, {
      duration: 500,
      easing: Easing.linear,
    });
  };

  const renderCard = ({
    item,
    index,
  }: {
    item: { id: number; frontImageUrl: string; backImageUrl: string };
    index: number;
  }) => {
    const isSelected = selectedCards.includes(item);
    const rotateY = interpolate(rotates.value[index], [0, 180], [0, 180]);

    const cardStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotateY: `${rotateY}deg` }],
      };
    });

    return (
      <Animated.View style={[styles.cardContainer, cardStyle]}>
        <Pressable onPress={() => flipCard(index)}>
          <Image
            source={
              isSelected
                ? item.frontImageUrl as ImageSourcePropType
                : item.backImageUrl as ImageSourcePropType
            }
            style={styles.cardImage}
          />
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={5}
        contentContainerStyle={styles.deckContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.grayscale,
  },
  deckContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  cardImage: {
    width: 65,
    height: 130,
    resizeMode: 'cover',
  },
});

export default CrossDrawScreen;
