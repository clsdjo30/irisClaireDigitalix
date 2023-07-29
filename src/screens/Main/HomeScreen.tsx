import React from 'react';
import { View, Text } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useUserStore } from '../../hooks/useUserStore';
import { useUserInformation } from '../../hooks/useUserInformations';
import { StackScreenProps } from '@react-navigation/stack';
import { useDaydrawStore } from '../../hooks/useDayDrawStore';
import CardChoices from '../../components/CardChoices';
import DayCard from '../../components/DayCardChoices';
import { goToYesDraw, goToCrossDraw, goToDayDraw } from '../../utils/NavigationFunctions';
import { styles } from './HomeScreen.styles';

const auth = getAuth();
const yesNo = require('../../../assets/images/testVector/yesNo.png');
const question = require('../../../assets/images/testVector/simple_question.png');
const questionPlus = require('../../../assets/images/testVector/question_point.png');

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [daycard, setDayCard] = useDaydrawStore();
  const userInformation = useUserInformation();
  const [user, setUser] = useUserStore();

  return (
    <View style={styles.container}>
     
      <CardChoices
        iconSource={yesNo}
        onPress={() => goToYesDraw(navigation)}
        title="Question Oui/Non"
        explanation="Recevez une réponse breve à vos questions les plus simple"
      />

      <CardChoices
        iconSource={yesNo}
        onPress={() => goToCrossDraw(navigation)}
        title="Question Oui/Non"
        explanation="Recevez une réponse breve à vos questions les plus simple"
      />
      <DayCard isDraw={daycard.isdraw} dayTendance={daycard.daytendance} />

    
        

    </View>
  );
}

export default HomeScreen;
