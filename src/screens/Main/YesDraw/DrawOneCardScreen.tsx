// DrawOneCardScreen.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useQuestionStore } from '../../../hooks/useQuestionStore';
import FlipCard from '../../../components/FlipCard';
import CustomModal from '../../../components/reusable/CustomModal';
import { cardDeckStyles } from '../../../theme';
import CARD_DECK from '../../../data/cards';

const DrawOneCardScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = useQuestionStore();
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [selectedCards, setSelectedCards] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [credit, setCredit] = useState(1);

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

  const goToResult = () => {
    navigation.navigate('DrawResult');
  }

  const cancelModal = () => {
    navigation.navigate('Home');
  }

  const sendQuestion = () => {
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

  const goBuyCredit = () => {
    navigation.navigate('Iris')
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }]
    })
  }

  return (
    <View style={cardDeckStyles.container}>
      <View style={cardDeckStyles.header} />
      <View style={cardDeckStyles.deckContainer}>
        <View style={cardDeckStyles.titleText}>
          <Text style={cardDeckStyles.title}>
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

        <CustomModal
          visible={modalVisible}
          credit={credit}
          modalText='Voulez-vous utiliser 1 credit pour voir le résultat ?'
          useCreditButtonTitle='Utiliser 1 credit'
          onValidate={() => {
            setModalVisible(!modalVisible);
            setCredit(credit - 1);
            sendQuestion();
          }}
          onCancel={cancelModal}
          onBuyCredit={goBuyCredit}
        />
      </View>
    </View>
  );
};

export default DrawOneCardScreen;
