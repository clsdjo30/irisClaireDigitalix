import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useUserInformation } from '../../hooks/useUserInformations';
import { StackScreenProps } from '@react-navigation/stack';
import CardChoices from '../../components/CardChoices';
import DayCardChoices from '../../components/DayCardChoices';
import { goToYesDraw, goToCrossDraw } from '../../utils/NavigationFunctions';
import { styles } from './HomeScreen.styles';
import { resetAtMidnight } from '../../utils/resetAtMidnight';
import WelcomeModal from '../../components/reusable/WelcomeModal';
import { useDaydrawStore } from '../../store/useDayDrawStore';
import { useCrossQuestionStore } from '../../store/useCrossQuestionStore';

const eye = require('../../../assets/icons/iris_card.png');
const yesCard = require('../../../assets/icons/yesCard.png');

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [daycard, setDayCard] = useDaydrawStore();
  const userInformation = useUserInformation();
  const [isModalVisible, setModalVisible] = useState(true);
  const [value, setValue] = useCrossQuestionStore();

  

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
        {/* Carte pour poser une question OUI/NON */}
        <CardChoices
          iconSource={yesCard}
          onPress={() => goToYesDraw(navigation)}
          title="Question Oui/Non"
          explanation="Recevez une réponse breve à vos questions les plus simple"
          />

          {/* Carte pour poser une question complete */}
        <CardChoices
          iconSource={eye}
          onPress={() => goToCrossDraw(navigation)}
          title="Tirage Complet"
          explanation="Vous avez de grande interogation, vous voulez ...."
          />

          {/* Carte pour l'horoscope du jour */}
        <DayCardChoices
          navigation={navigation}
          daycard={daycard}
        />

       {/* Affichage du Didacticiel au premier lancement de l'application */}
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
