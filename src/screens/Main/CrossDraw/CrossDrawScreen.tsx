import React from 'react';
import { FlatList, Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import CARD_DECK from '../../../utils/cards';

class CrossDraw extends React.Component {
  state = {
    selectedCards: [],
    cards: [],
  };

  componentDidMount() {
    this.setState({ cards: this.shuffleCards(CARD_DECK) });
  }

  shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  selectCard = (card) => {
    let { selectedCards } = this.state;
    if (selectedCards.length < 4) {
      selectedCards.push(card);
      this.setState({ selectedCards });
    }
  };

  renderCard = ({ item }) => {
    const isSelected = this.state.selectedCards.includes(item);
    return (
      <TouchableOpacity onPress={() => this.selectCard(item)}>
        <Image
          style={styles.cardImage}
          source={isSelected ? item.frontImageUrl : item.backImageUrl}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.cards}
          renderItem={this.renderCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 120,
    resizeMode: 'cover',
  },
});

export default CrossDraw;
