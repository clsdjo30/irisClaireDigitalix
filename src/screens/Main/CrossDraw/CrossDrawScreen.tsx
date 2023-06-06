import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  ImageSourcePropType, 
  StatusBar
} from 'react-native';
import CARD_DECK from '../../../utils/cards';
import { colors } from '../../../theme/color'
import { SafeAreaView } from 'react-native-safe-area-context';

const CrossDrawScreen = () => {
  const [selectedCards, setSelectedCards] = useState<Array<any>>([]);
  const [cards, setCards] = useState<Array<{ id: number; frontImageUrl: string; backImageUrl: string }>>([]);


  useEffect(() => {
    setCards(shuffleCards(CARD_DECK));
  }, []);

  const shuffleCards = (cards: Array<{ id: number, frontImageUrl: string, backImageUrl: string }>) => {
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



  const renderCard = ({ item }: { item: { id: number; frontImageUrl: string; backImageUrl: string } }) => {
    const isSelected = selectedCards.includes(item);
    return (
      <TouchableOpacity onPress={() => selectCard(item)}>
        <Image
          style={styles.cardImage}
          source={isSelected ? item.frontImageUrl as ImageSourcePropType : item.backImageUrl as ImageSourcePropType}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: 'center' }}
        contentContainerStyle={styles.deckContainer}
        centerContent={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: 20,
  },
  deckContainer: {
   
   
  },
  cardImage: {
    width: 60,
    height: 120,
    resizeMode: 'cover',
    margin: 5
  },
});

export default CrossDrawScreen;
