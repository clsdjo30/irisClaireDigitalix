// DrawOneCardScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import FlipCard from '../../../components/FlipCard';
import CustomModal from '../../../components/reusable/CustomModal';
import { cardDeckStyles } from '../../../theme';
import CARD_DECK from '../../../data/cards';
import { useUserInformation } from '../../../hooks/useUserInformations';
import { useQuestionStore } from '../../../store/useQuestionStore';
import { useUserStore } from '../../../store/useUserStore';
import { shuffleArray } from '../../../utils/shuffleArray';


const DrawOneCardScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = useQuestionStore();
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [selectedCards, setSelectedCards] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [actualUser, setUser] = useUserStore();
  const { user, updateUserIrisCoins } = useUserInformation();
  const [shuffledDeck, setShuffledDeck] = useState(CARD_DECK);
  const [isCardClicked, setIsCardClicked] = useState(false);
  
  const handleCardFlip = (index: number) => {
    if (selectedCards === 0 && !isCardClicked) {
      setValue({
        ...value,
        choosecardnumber: shuffledDeck[index].id,
        choosecardname: shuffledDeck[index].name,
        choosecardpseudo: shuffledDeck[index].pseudo,
      });
      console.log('DrawOneCardScreen.tsx - VALUE HANDLE FLIP', value)
      setSelectedCards(selectedCards + 1);
      setSelectedCardIndex(index);
      setIsCardClicked(true);
      setTimeout(() => {
        setModalVisible(true);
      }, 2000);
    };
  }
  
  const goToResult = () => {
    navigation.navigate('YesDrawResult');
  }

  const cancelModal = () => {
    navigation.navigate('Home');
  }
  

  const sendQuestion = () => {
    if ( user?.irisCoins > 0
      && value.question != null
      && value.choosecardname != null
      && value.choosecardnumber != null
      && value.choosecardpseudo != null
    ) {
      const newIrisCoins = user.irisCoins - 1;
      
      // Mettre à jour le state local
      setUser({ ...user, irisCoins: newIrisCoins });

      // Mettre à jour Firestore
      updateUserIrisCoins(newIrisCoins);
      goToResult();

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
 
  useEffect(() => {
    setShuffledDeck(shuffleArray([...CARD_DECK]));
     
  }, []);



  return (
    <View style={cardDeckStyles.container}>
      <View style={cardDeckStyles.header} />
      <View style={cardDeckStyles.deckContainer}>
        <View style={cardDeckStyles.titleText}>
          <Text style={cardDeckStyles.title}>
            Concentrez-vous sur votre question et retourné une carte !
          </Text>
        </View>

        {shuffledDeck.map((card, index) => (
          <FlipCard
            key={index}
            frontImageUrl={card.frontImageUrl}
            backImageUrl={card.backImageUrl}
            onFlip={() => { handleCardFlip(index) }}
            isClickable={!isCardClicked} 
            style={{ zIndex: selectedCardIndex === index ? 1000 : 0 }}
          />
        ))}

        <CustomModal
          visible={modalVisible}
          credit={user?.irisCoins}
          modalText='Voulez-vous utiliser 1 credit pour voir le résultat ?'
          useCreditButtonTitle='Utiliser 1 credit'
          onValidate={() => {
            setModalVisible(!modalVisible);
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
