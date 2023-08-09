import React, { useEffect} from 'react';
import { View, Text } from 'react-native';
import { useUserInformation } from '../../hooks/useUserInformations';
import { StackScreenProps } from '@react-navigation/stack';
import { useDaydrawStore } from '../../hooks/useDayDrawStore';
import CardChoices from '../../components/CardChoices';
import DayCardChoices from '../../components/DayCardChoices';
import { goToYesDraw, goToCrossDraw } from '../../utils/NavigationFunctions';
import { styles } from './HomeScreen.styles';
import { resetAtMidnight } from '../../utils/resetAtMidnight';

const eye = require('../../../assets/icons/iris_card.png');
const yesCard = require('../../../assets/icons/yesCard.png');

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [daycard, setDayCard] = useDaydrawStore();
  const userInformation = useUserInformation();

  useEffect(() => {
    const timer = resetAtMidnight(() => {
      setDayCard(prevState => ({
        ...prevState,
        isdraw: false
      }));
    });

    return () => clearTimeout(timer);  // Nettoyez le setTimeout lorsque le composant est démonté ou si les dépendances changent
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




      </View>

    </View>
  );
}

export default HomeScreen;
