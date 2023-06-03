import React from 'react';
import { StyleSheet, Text, Image, View, Pressable } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useUserStore } from '../../utils/hooks/useUserStore';
import { useUserInformation } from '../../utils/hooks/useUserInformations';
import { colors } from '../../theme';
import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

const auth = getAuth();

const rightArrow = require('../../../assets/icons/caretRight.png');
const yesNo = require('../../../assets/images/testVector/yes_no.png');
const question = require('../../../assets/images/testVector/simple_question.png');
const questionPlus = require('../../../assets/images/testVector/question_plus.png');

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {


  const userInformation = useUserInformation();

  console.log('userInformation', userInformation);

  const [user, setUser] = useUserStore();

  function goToYesDraw() {
    navigation.navigate('YesDraw');
  }

  function goToCrossDraw() {
    navigation.navigate('CrossDraw');
  }

  function goToDayDraw() {
    navigation.navigate('Tirage');
  }

  return (

    <View style={styles.container}>

      <View style={styles.domainsContainer}>

      <LinearGradient colors={[colors.palette.purple600, colors.palette.purple500]} style={styles.header}>
      <Text style={{ color: colors.palette.lightgold, fontSize: 26, fontFamily: 'mulishBold', marginTop: 30 }}>Bonjour {user?.firstname} !</Text>
      <Text style={{ color: colors.palette.ivory, fontSize: 20, fontFamily: 'mulishRegular', marginTop: 10 }}>Que souhaitez-vous faire aujourd'hui ?</Text>
      </LinearGradient>

        <Pressable style={styles.domainCard} onPress={goToYesDraw}>
          <Image source={yesNo} style={styles.icon} />
          <View style={styles.direction}>
            <Text style={styles.domainText}>Poser une question Simple</Text>
            {/* <Image source={rightArrow} style={styles.iconImage}></Image> */}
          </View>
        </Pressable>
        <Pressable style={styles.domainCard} onPress={goToCrossDraw}>
          <Image source={questionPlus} style={styles.icon} />
          <View style={styles.direction}>
            <Text style={styles.domainText}>Poser une question complète</Text>
            {/* <Image source={rightArrow} style={styles.iconImage}></Image> */}
          </View>
        </Pressable>
        <Pressable style={styles.domainCard} onPress={goToDayDraw}>
          <Image source={question} style={styles.icon} />
          <View style={styles.direction}>
            <Text style={styles.domainText}>Tirage du jour</Text>
            {/* <Image source={rightArrow} style={styles.iconImage}></Image> */}
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
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

});

export default HomeScreen;

