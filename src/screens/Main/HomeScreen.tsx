import React, { useEffect, useState} from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useUserInformation } from '../../hooks/useUserInformations';
import { StackScreenProps } from '@react-navigation/stack';
import { useDaydrawStore } from '../../hooks/useDayDrawStore';
import CardChoices from '../../components/CardChoices';
import DayCardChoices from '../../components/DayCardChoices';
import { goToYesDraw, goToCrossDraw, goToDayDraw } from '../../utils/NavigationFunctions';
import { styles } from './HomeScreen.styles';
import { resetAtMidnight } from '../../utils/resetAtMidnight';
import WelcomeModal from '../../components/reusable/WelcomeModal';

const eye = require('../../../assets/icons/iris_card.png');
const yesCard = require('../../../assets/icons/yesCard.png');

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [daycard, setDayCard] = useDaydrawStore();
  const userInformation = useUserInformation();
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = resetAtMidnight(() => {
      setDayCard(prevState => ({
        ...prevState,
        isdraw: false
      }));
    });

    if (userInformation.user?.hasSeenModal === false) {
      setModalVisible(true);
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
          onPress={() => goToCrossDraw(navigation)}
          title="Tirage Complet"
          explanation="Vous avez de grande interogation, vous voulez ...."
        />

        <DayCardChoices
          navigation={navigation}
          daycard={daycard}
        />


        <WelcomeModal
          visible={isModalVisible}
          modalTitle="Bienvenue dans Iris Claire"
          modalSubTitle='Votre nouveau guide spirituel de poche.'
          modalExplain='Je suis là pour vous aider à trouver des réponses à vos questions.'
          modalContent='Pour commencer, je vous propose de découvrir la tendance de votre journée.'
          buttonText="C'est parti !"
          onValidate={ () => {
            setModalVisible(!isModalVisible);
           
          }}          
        />

      </View>

    </View>
  );
}

export default HomeScreen;
