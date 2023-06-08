import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  ImageSourcePropType,
  Dimensions
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
const IrisCars = require('../../../assets/images/cards/back/Claire_Back_Card.png');
const yesNo = require('../../../assets/images/testVector/yesNo.png');
const question = require('../../../assets/images/testVector/simple_question.png');
const questionPlus = require('../../../assets/images/testVector/question_point.png');

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {

  const [daycard, setDayCard] = useDaydrawStore();
  const userInformation = useUserInformation();
  const backCard = require('../../../assets/images/cards/back/Claire_Back_Card.png');
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


      <View
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Bonjour {user?.firstname}</Text>
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
      </View>

      <View style={styles.domainsContainer}>
        <LinearGradient
          colors={[colors.palette.violetClair,  colors.palette.violetClair]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0.1, 0.9]}
          style={styles.domainCard}
        >
          <Pressable
            onPress={goToYesDraw}
            style={styles.innerContainer}
          >
            <Image source={yesNo} style={styles.icon} />
            <View style={styles.direction}>
              <Text style={styles.domainText}>Question Oui/Non</Text>
              <Text style={styles.domainTextExplain}>Recevez une réponse breve à vos questions les plus simple</Text>
            </View>
          </Pressable>
        </LinearGradient>
        {/* Card CrossDraw */}
        <LinearGradient
          colors={[colors.palette.violetClair,  colors.palette.violetClair]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0.1, 0.9]}
          style={styles.domainCard}
        >
        <Pressable style={styles.innerContainer} onPress={goToCrossDraw}>
          <Image source={questionPlus} style={styles.icon} />
          <View style={styles.direction}>
            <Text style={styles.domainText2}>Tirage Complet</Text>
            <Text style={styles.domainTextGoldExplain}>Vous avez de grande interogation, vous voulez ....</Text>
          </View>
        </Pressable>
        </LinearGradient>

      {/* CARD TENDANCE DU JOUR */}
      <LinearGradient
         colors={[colors.palette.violetClair,  colors.palette.violetClair]}
         start={{ x: 0, y: 0.5 }}
         end={{ x: 1, y: 0.5 }}
         locations={[0.1, 0.9]}
          style={styles.domainCard}
        >
        <Pressable style={styles.innerContainer} onPress={goToDayDraw}>
          <Image source={question} style={styles.icon} />
          <View style={[styles.direction]}>
            {daycard.isdraw === false ?
            <>
              <Text style={styles.domainText}>Tendance du Jour</Text>
              <Text style={styles.domainTextExplain}>Une pensée inspirante pour éclairer votre journée !</Text>
              </>
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
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    position: 'absolute',
    top: 0,
    width: WIDTH,
    height: HEIGHT / 3,
    borderBottomLeftRadius: WIDTH *0.18,
    borderBottomRightRadius: WIDTH *0.18,
    backgroundColor: colors.palette.violet

  },

  headerTitle: {
    color: colors.palette.golden,
    fontSize: 30,
    fontFamily: 'mulishBold',
    textTransform: 'capitalize',
    paddingTop: 20,
    textAlign: 'center',
  },

  // Domain Container
  domainsContainer: {
    position: 'absolute',
    bottom: 120,
    width: "90%",
    height: "55%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  domainCard: {
    width: "90%",
    height: "35%",
    marginBottom: 35,
    flexDirection: "row",
    borderRadius: 15,
    elevation: 5,
  },
  innerContainer: {
    borderRadius: 15,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  // taille image domain Card
  icon: {
    width: '25%',
    height: '55%',
  },
  //container text domain card
  direction: {
    width: "70%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",

  },
  domainText: {
    width: "90%",
    fontFamily: "mulishBold",
    fontSize: 20,
    color: colors.palette.violet,
    textAlign: "center",
    marginBottom: 10,
  },
  domainText2: {
    width: "90%",
    fontFamily: "mulishBold",
    fontSize: 20,
    color: colors.palette.golden,
    textAlign: "center",
    marginBottom: 10,
  },
  domainTextExplain: {
    width: "90%",
    fontFamily: "mulishLight",
    fontSize: 12,
    color: colors.palette.violet,
    textAlign: "center",
  },
  domainTextGoldExplain: {
    width: "90%",
    fontFamily: "mulishLight",
    fontSize: 12,
    color: colors.palette.violet,
    textAlign: "center",
  },
  domainGoldText: {
    width: "90%",
    fontFamily: "mulishRegular",
    fontSize: 20,
    color: colors.palette.violet,
    textAlign: "center",
    marginTop: 20,
  },
  iconImage: {
    width: 30,
    height: 30,
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: colors.palette.orange
  },
  iconContainerCheck: {
    position: 'absolute',
    right: 0,
    top: 18,
    justifyContent: "center",
    alignItems: "center",
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: 'green'
  },
  dayDrawAlert: {
    position: 'absolute',
    right: 20,
    top: 32,
  },
  tendanceContainer: {
    flexDirection: "row",
    width: "100%",
    height: "50%",
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
    color: colors.palette.violet,
    fontSize: 16,
    fontFamily: 'mulishRegular',
    textAlign: "center",
  },
  displayTextTendance: {
    color: colors.palette.ivory,
    fontSize: 16,
    fontFamily: 'mulishRegular',
    textAlign: "center",
  },
  cardContainer: {
    width: 60,
    height: 110,
    borderRadius: 5,
  },
  daydrawCard: {
    width: 60,
    height: 110,
    borderRadius: 5,
  }
});

export default HomeScreen;

