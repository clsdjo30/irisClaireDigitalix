import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useUserInformation } from '../../hooks/useUserInformations';
import { StackScreenProps } from '@react-navigation/stack';
import { useDaydrawStore } from '../../hooks/useDayDrawStore';
import CardChoices from '../../components/CardChoices';
import DayCardChoices from '../../components/DayCardChoices';
import { goToYesDraw, goToCrossDraw } from '../../utils/NavigationFunctions';
import { styles } from './HomeScreen.styles';
import { resetAtMidnight } from '../../utils/resetAtMidnight';
import WelcomeModal from '../../components/reusable/WelcomeModal';
import { useCrossQuestionStore } from '../../hooks/useCrossQuestionStore';
import CustomModal from '../../components/reusable/CustomModal';

const eye = require('../../../assets/icons/iris_card.png');
const yesCard = require('../../../assets/icons/yesCard.png');

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [daycard, setDayCard] = useDaydrawStore();
  const userInformation = useUserInformation();
  const [isModalVisible, setModalVisible] = useState(true);
  const [isIrisModalVisible, setIrisModalVisible] = useState(false);

  const [value, setValue] = useCrossQuestionStore();

  const possessedIris = userInformation.user?.irisCoins;
  const cancelModal = () => {
    setIrisModalVisible(false);
  }
  const goBuyIris = () => {
    navigation.navigate('Iris');
  }

  const goToCrossDrawUpdated = () => {
    if (possessedIris < 3) {
      setIrisModalVisible(true);
    } else {
      goToCrossDraw(navigation);
    }
  };

  useEffect(() => {
    const timer = resetAtMidnight(() => {
      setDayCard(prevState => ({
        ...prevState,
        isdraw: false
      }));
    });

    if (userInformation.user?.hasSeenModal === true) {
      setModalVisible(false);
    } 

    // Nettoyez le setTimeout lorsque le composant est démonté ou si les dépendances changent
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Text style={styles.headerTitle}>Bonjour {userInformation.user?.firstname}</Text>
      <View style={styles.tendanceContainer}>
        {daycard.isdraw === false ?
          <>
            <View style={styles.tendanceTextContainer}>
              <Text style={styles.tendanceText}>
                Allez vite découvrir la tendance de votre journée !
              </Text>
            </View>
          </>
          :
          <>

            <View style={styles.tendanceTextContainer}>
              <Text style={styles.displayTextTendance}>
                {daycard.daytendance}
              </Text>
            </View>
          </>
        }
      </View>

      <View style={styles.domainsContainer}>

        <CardChoices
          iconSource={yesCard}
          onPress={() => goToYesDraw(navigation)}
          title="Question Oui/Non"
          explanation="Recevez une réponse breve à vos questions les plus simple"
        />

        <CardChoices
          iconSource={eye}
          onPress={goToCrossDrawUpdated}
          title="Tirage Complet"
          explanation="Vous avez de grande interogation, vous voulez ...."
        />

        <DayCardChoices
          navigation={navigation}
          daycard={daycard}
        />

        <CustomModal
          visible={isIrisModalVisible}
          credit={possessedIris}
          modalText="Vous n'avez pas suffisament d'Iris pour posez votre question."
          useCreditButtonTitle='Acheter des credits'
          onValidate={() => {
            setModalVisible(!isIrisModalVisible);
            navigation.navigate('Iris');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }]
            })
          }}
          onCancel={cancelModal}
          onBuyCredit={goBuyIris}
        />
        <WelcomeModal
          visible={isModalVisible}
          onValidate={() => {
            setModalVisible(!isModalVisible);
          }}
        />

      </View>

    </View>
  );
}

export default HomeScreen;
