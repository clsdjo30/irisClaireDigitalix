import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { colors } from '../../../theme';
import { StackScreenProps } from '@react-navigation/stack';
import { useUserInformation } from '../../../hooks/useUserInformations';
import UserSignIcon from '../../../components/UserSignIcon';
import UserStoneIcon from '../../../components/UserStoneIcon';
import UserElementIcon from '../../../components/UserElementIcon';
import NavigationButton from '../../../components/NavigationButton';
import * as Localization from "expo-localization";
import { getLocaleSign, getLocaleStone, getLocaleElement } from '../../../utils/zodiacTranslate';

const auth = getAuth();
const rightArrow = require('../../../../assets/icons/caretRight.png');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;


const ProfilScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {

  const userInfo = useUserInformation();

  // console.log('ProfilScreen.tsx USER', userInfo.user)
  // Récupérez la locale actuelle (par exemple, "fr-FR" ou "en-US")
  const locale = Localization.locale.split("-")[0];

  // recup user Astro, Element, Stone
  const userSign = userInfo.user?.zodiacname
  const userStone = userInfo.user?.stone
  const userElement = userInfo.user?.element
  const userIrisCoins = userInfo?.user?.irisCoins

  // recup user IrisCoins
  useEffect(() => {
    userInfo.fetchUser()
  }, [])

  // Affiche le nom en fonction de la locale
  const userTransSign = getLocaleSign(userInfo.user?.zodiacname, locale)
  const userTransStone = getLocaleStone(userInfo.user?.zodiacname, locale)
  const userTransElement = getLocaleElement(userInfo.user?.element, locale)


  return (
    <View style={styles.container}>

      <View style={styles.header}>

        {/* START USER CARD */}
        <View style={styles.userCard}>
          <Text style={styles.headerTitle}>mon profil</Text>

          {/* Header User Element Informations  */}
          <View style={styles.headerUnderlineTop}>
            {UserElementIcon({ userElement: userElement })}
            {UserSignIcon({ userSign: userSign })}
            {UserStoneIcon({ userStone: userStone })}
          </View>

          {/* Header User Information */}
          <View style={styles.blockProfilInput}>
            <View style={styles.profilInput}>
              <Text style={styles.textEmail}>Mes Iris: </Text>
              <Text style={styles.textDetail} >{userIrisCoins}</Text>
            </View>
            <View style={styles.profilInput}>
              <Text style={styles.textEmail}>Email: </Text>
              <Text style={styles.textDetail} >{userInfo.user?.email}</Text>
            </View>
            <View style={styles.profilInput}>
              <Text style={styles.textEmail}>Date de naissance: </Text>
              <Text style={styles.textDetail} >{userInfo.user?.birthday}</Text>
            </View>
          </View>

          <View style={styles.headerUnderlineTop} />
          {/* User Astro information*/}
          <View style={styles.blockElement}>
            <View style={styles.profilInput}>
              <Text style={styles.textEmail}>Mon Element: </Text>
              <Text style={styles.textDetail} >{userTransElement}</Text>
            </View>
            <View style={styles.profilInput}>
              <Text style={styles.textEmail}>Mon Signe: </Text>
              <Text style={styles.textDetail} >{userTransSign}</Text>
            </View>
            <View style={styles.profilInput}>
              <Text style={styles.textEmail}>Ma Pierre: </Text>
              <Text style={styles.textDetail} >{userTransStone}</Text>
            </View>
          </View>
          <View>
          </View>
        </View>
      </View>

      {/* END USER CARD */}


      <View style={styles.paramContent}>

        <View style={styles.paramsList}>
          <View style={styles.blockParam}>
            <TouchableOpacity
              style={styles.paramRow}
              onPress={() => navigation.navigate('MyQuestions')}>
              <Text style={styles.switchText}>Mon historique</Text>
              <Image source={rightArrow} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.blockParam}>
            <TouchableOpacity
              style={styles.paramRow}
              onPress={() => navigation.navigate('FirstName')}>
              <Text style={styles.switchText}>Modifier mes informations</Text>
              <Image source={rightArrow} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.blockParam}>
            <TouchableOpacity
              style={styles.paramRow}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.switchText}>Laissez un avis</Text>
              <Image source={rightArrow} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.blockParam}>
            <TouchableOpacity
              style={styles.paramRow}
              onPress={() => navigation.navigate('Faq')}>
              <Text style={styles.switchText}>Aide</Text>
              <Image source={rightArrow} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.blockParam}>
            <TouchableOpacity
              style={styles.paramRow}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.switchText}>A Propos</Text>
              <Image source={rightArrow} style={styles.iconImage} />
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.blockButton}>
          <NavigationButton
            title="Se Déconnecter"
            onPress={() => auth.signOut()}
            width={SCREEN_WIDTH / 1.2}
            backgroundColor={colors.palette.violet}
            color={colors.palette.violetBg}
          />
        </View>
      </View>

    </View>
  )
}

export default ProfilScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: colors.palette.violet,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    position: 'absolute',
    top: 0,
    width: SCREEN_WIDTH - 5,
    height: SCREEN_HEIGHT * 0.55,
    borderBottomLeftRadius: SCREEN_WIDTH * 0.1,
    borderBottomRightRadius: SCREEN_WIDTH * 0.1,
    backgroundColor: colors.background
  },
  paramContent: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH / 1.12
  },
  textHeading: {
    color: colors.palette.darkgold,
    fontFamily: 'oswaldBold',
    fontSize: SCREEN_FONT_SCALE,
    textTransform: 'capitalize',
  },
  textStyle: {
    color: colors.palette.ivory,
    fontFamily: 'mulishLight',
    fontSize: SCREEN_FONT_SCALE,
  },
  //SWITCH PARAM
  blockSwitch: {
    marginBottom: SCREEN_HEIGHT / 10,
  },
  switchParam: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchText: {
    color: colors.palette.ivory,
    fontFamily: 'mulishMedium',
    fontSize: SCREEN_FONT_SCALE + 14
  },
  //LOGOUT BUTTON
  blockButton: {
    marginVertical: SCREEN_HEIGHT / 30,
    alignItems: 'center',
  },
  button: {
    width: 300,
    backgroundColor: colors.palette.pink500,
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: SCREEN_HEIGHT / 200,
  },
  buttonText: {
    fontFamily: "oswaldRegular",
    fontSize: 14,
    color: colors.palette.ivory,
    textTransform: "capitalize"
  },
  //LIST PARAMS
  paramsList: {
    marginBottom: SCREEN_HEIGHT / 20
  },
  blockParam: {
    paddingVertical: SCREEN_HEIGHT / 50,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.palette.violetClair
  },
  paramRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  // IRIS SECTION
  irisTitle: {
  
  },
  //START O FUSER CARD INFORMATION

  cardUserStyle: {
    width: SCREEN_WIDTH / 1.1,
    height: SCREEN_HEIGHT * 0.345,
  },
  headerTitle: {
    color: colors.palette.darkgold,
    fontSize: SCREEN_FONT_SCALE + 25,
    fontFamily: 'oswaldLight',
    textTransform: 'capitalize',
    textAlign: 'left',
  },
  headerSubTitle: {
    color: colors.palette.violet,
    fontSize: 14,
    fontFamily: 'oswaldBold',
    textTransform: 'capitalize',
  },
  headerUnderline: {
    width: SCREEN_WIDTH / 1.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerUnderlineTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH / 1.2,
    paddingVertical: SCREEN_HEIGHT / 100,
    borderBottomWidth: 0.5,
  },

  //Header Profil
  userCard: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: SCREEN_WIDTH / 20,
  },
  profilInput: {
    flexDirection: 'row',
  },
  blockProfilInput: {
    marginTop: SCREEN_HEIGHT / 90,

  },
  textEmail: {
    color: colors.palette.violet,
    fontFamily: 'mulishRegular',
    fontSize: 16,
  },
  textDetail: {
    color: colors.palette.orange,
    fontFamily: 'mulishRegular',
    fontSize: 16,
    paddingLeft: SCREEN_WIDTH / 30,
    textTransform: 'capitalize',
  },
  blockIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  // Block Element
  blockElement: {
    marginTop: SCREEN_HEIGHT / 90,
    flexDirection: 'column',
  }
})