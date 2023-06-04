import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  ImageSourcePropType
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { useUserStore } from '../../utils/hooks/useUserStore';
import { useUserInformation } from '../../utils/hooks/useUserInformations';
import { colors } from '../../theme';
import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useDaydrawStore } from '../../utils/hooks/useDayDrawStore';
import Icon from 'react-native-vector-icons/FontAwesome';

const auth = getAuth();

const rightArrow = require('../../../assets/icons/caretRight.png');
const yesNo = require('../../../assets/images/testVector/yes_no.png');
const question = require('../../../assets/images/testVector/simple_question.png');
const questionPlus = require('../../../assets/images/testVector/question_plus.png');

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {

  const [daycard, setDayCard] = useDaydrawStore();
  const userInformation = useUserInformation();
  const backCard = require('../../../assets/images/cards/back/Claire_Back_Card.png');

  console.log('userInformation', userInformation);
  console.log('daydraw', daycard);

  const [user, setUser] = useUserStore();

  function goToYesDraw() {
    navigation.navigate('YesDraw');
  }

  function goToCrossDraw() {
    navigation.navigate('CrossDraw');
  }

  function goToDayDraw() {
    if (daycard.isdraw === false) {
      navigation.navigate('DayDraw');
    } 
  }

  return (

    <View style={styles.container}>

      <View style={styles.domainsContainer}>

        <LinearGradient colors={
          [
            colors.palette.purple600,
            colors.palette.purple500
          ]
        }
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Bonjour {user?.firstname}</Text>
          <View style={styles.tendanceContainer}>
            {daycard.isdraw === false ?
              <>
                <View style={styles.cardContainer}>
                  <Image source={backCard} style={styles.daydrawCard} />
                </View>
                <View style={styles.tendanceTextContainer}>
                  <Text style={styles.tendanceText}>
                    Allez vite découvrir la tendance de votre journée ! 🤩
                  </Text>
                </View>
              </>
              :
              <>
                <View style={styles.cardContainer}>
                  <Image source={daycard.daycardimage as ImageSourcePropType} style={styles.daydrawCard} />
                </View>
                <View style={styles.tendanceTextContainer}>
                  <Text style={styles.displayTextTendance}>
                    {daycard.daytendance}
                  </Text>
                </View>
              </>
            }
          </View>
        </LinearGradient>

        <Pressable style={styles.domainCard} onPress={goToYesDraw}>
          <Image source={yesNo} style={styles.icon} />
          <View style={styles.direction}>
            <Text style={styles.domainText}>Question Oui/Non</Text>
          </View>
        </Pressable>
        <Pressable style={styles.domainCard} onPress={goToCrossDraw}>
          <Image source={questionPlus} style={styles.icon} />
          <View style={styles.direction}>
            <Text style={styles.domainText}>Tirage Complet</Text>
          </View>
        </Pressable>
        <Pressable style={styles.domainCard} onPress={goToDayDraw}>
          <Image source={question} style={styles.icon} />
          <View style={[styles.direction]}>
            {daycard.isdraw === false ?
              <Text style={styles.domainText}>Tendance du Jour</Text>
              :
              <Text style={styles.domainText}>Tendance du Jour</Text>
            }
          </View>
          <View style={styles.dayDrawAlert}>
            {daycard.isdraw === false ?
              <View style={styles.iconContainer}>
                <Icon name="exclamation" size={10} color={colors.palette.ivory} />
              </View>
              :
              <View style={styles.iconContainerCheck}>
                <Icon name="check" size={10} color={colors.palette.ivory} />
              </View>
            }
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.purple600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Domain Container
  domainsContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "90%",
    height: "30%",
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    color: colors.palette.lightgold,
    fontSize: 26,
    fontFamily: 'mulishBold',
    textTransform: 'capitalize',
    marginTop: 20,
    marginLeft: 10
  },
  domainCard: {
    width: "90%",
    height: "16%",
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: colors.palette.ivory,
    borderRadius: 10,
    backgroundColor: 'rgba(198,198,231, 0.2)',
  },
  icon: {
    width: '35%',
    height: '70%',
  },
  domainText: {
    width: "90%",
    fontFamily: "mulishBold",
    fontSize: 18,
    color: colors.palette.ivory,
    textAlign: "center",
    marginTop: 20,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  direction: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: colors.palette.pink500
  },
  iconContainerCheck: {
    justifyContent: "center",
    alignItems: "center",
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: 'green'
  },
  dayDrawAlert: {
   position: 'absolute',
    right: 25,
    top: 50,
  },
  tendanceContainer: {
    flexDirection: "row",
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tendanceTextContainer: {
    width: "70%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  tendanceText: {
    color: colors.palette.ivory, 
    fontSize: 16, 
    fontFamily: 'mulishRegular',
  },
  displayTextTendance: {
    color: colors.palette.ivory, 
    fontSize: 16, 
    fontFamily:  'mulishRegular',
    textAlign: "justify", 
  },
  cardContainer: {
    width: 60,
    height: 100,
    borderRadius: 5,
  },
  daydrawCard: {
    width: 60,
    height: 100,
    borderRadius: 5,
  }


});

export default HomeScreen;

