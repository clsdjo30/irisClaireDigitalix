import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Switch } from '@rneui/themed';
import { colors } from '../../../theme';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { useUserStore } from '../../../utils/hooks/useUserStore';
import { useUserInformation } from '../../../utils/hooks/useUserInformations';
import { getAuth } from 'firebase/auth';
import UserSignIcon from '../../../components/UserSignIcon';
import UserStoneIcon from '../../../components/UserStoneIcon';
import UserElementIcon from '../../../components/UserElementIcon';

interface Item {
  id: string;
  title: string;
}

const auth = getAuth();
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;


const ProfilScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  
  
  useUserInformation();
  const [checked, setChecked] = React.useState(false);
  const [user, setUser] = useUserStore();
console.log(user);
  const star = require('../../../../assets/icons/sparkling-gold.png')
  const rightArrow = require('../../../../assets/icons/caretRight.png');

  const userSign = user?.zodiacname;
  const userStone = user?.stone;
  const userElement = user?.element;

console.log(user);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
      // Card Linear Gradient
        colors={[colors.palette.purple600, colors.palette.purple500]}
        style={styles.containerGradient}>

        {/* START USER CARD */}
        <LinearGradient
          colors={[colors.palette.purple400, colors.palette.purple500]}
          style={styles.cardUserStyle}>
          <View style={styles.starContainerTop}>
            <Image source={star} style={styles.starImage} />
          </View>
          {/* Header User Information */}
          <View style={styles.headerImageContainer}>
            <Text style={styles.headerTitle}>mon compte</Text>
          </View>
          {/* User Astro information*/}
          <View style={styles.headerUnderlineTop}>
            <Text style={styles.headerSubTitle}>{user?.firstname}</Text>
            <Text style={styles.textEmail}>{user?.email}</Text>
          </View>
          <View style={styles.headerUnderline}>
            {UserStoneIcon(userStone, user?.stone)}
            {UserSignIcon(userSign, user?.zodiacname)}
            {UserElementIcon(userElement, user?.element)}
          </View>
        </LinearGradient>
        {/* END USER CARD */}


        <View style={styles.paramContent}>
          <View style={styles.switchParam}>
            <Text style={styles.switchText}>Notifications</Text>
            <Switch
              value={checked}
              onValueChange={(value) => setChecked(value)}
            />
          </View>
          <View style={styles.switchParam}>
            <Text style={styles.switchText}>Recevoir nos offre</Text>
            <Switch
              value={checked}
              onValueChange={(value) => setChecked(value)}
            />
          </View>

          <View style={styles.paramsList}>
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
                onPress={() => navigation.navigate('FirstName')}>
                <Text style={styles.switchText}>Laissez un avis</Text>
                <Image source={rightArrow} style={styles.iconImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.blockParam}>
              <TouchableOpacity
                style={styles.paramRow}
                onPress={() => navigation.navigate('FirstName')}>
                <Text style={styles.switchText}>Aide</Text>
                <Image source={rightArrow} style={styles.iconImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.blockParam}>
              <TouchableOpacity
                style={styles.paramRow}
                onPress={() => navigation.navigate('FirstName')}>
                <Text style={styles.switchText}>A Propos</Text>
                <Image source={rightArrow} style={styles.iconImage} />
              </TouchableOpacity>
            </View>

          </View>
          <View style={styles.blockButton}>
            <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
              <Text style={styles.buttonText}>
                se déconnecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default ProfilScreen

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: colors.palette.purple600,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerGradient: {
    flex: 1,
    width: SCREEN_WIDTH ,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  paramContent: {
    width:  SCREEN_WIDTH / 1.12
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
    fontSize: SCREEN_FONT_SCALE ,
  },
  //SWITCH PARAM
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
   
  },
  blockParam: {
    paddingVertical: SCREEN_HEIGHT / 50,
    borderBottomWidth: 0.5,
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
  //START OFUSER CARD INFORMATION
  cardUserStyle: {
    width: SCREEN_WIDTH / 1.1,
    height: SCREEN_HEIGHT * 0.345,
    backgroundColor: colors.palette.purple200,
    borderRadius: 10,
    borderBottomWidth: 0.9,
    borderRightWidth: 0.9,
    borderRightColor: colors.palette.lightgold,
    borderBottomColor: colors.palette.lightgold,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SCREEN_HEIGHT * 0.05,
  },
  headerImageContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 3
  },
  headerTitle: {
    color: colors.palette.darkgold,
    fontSize: SCREEN_FONT_SCALE + 18,
    fontFamily: 'oswaldLight',
    textTransform: 'capitalize',
  },
  headerSubTitle: {
    color: colors.palette.ivory,
    fontSize: SCREEN_FONT_SCALE + 16,
    fontFamily: 'oswaldBold',
    textTransform: 'capitalize',
  },
  headerUnderline: {
    width: SCREEN_WIDTH / 1.1,
    paddingVertical: SCREEN_HEIGHT / 80,
    paddingBottom: SCREEN_HEIGHT * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerUnderlineTop: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: SCREEN_WIDTH / 1.2,
    paddingVertical: SCREEN_HEIGHT / 50,
    borderBottomWidth: 0.5,
  },
  textEmail: {
    color: colors.palette.ivory,
    fontFamily: 'mulishLight',
    fontSize: 16,
    
  },
  // css pour placer les etoiles dans la carte user information
  starImage: {
    width: SCREEN_WIDTH / 15,
    height: SCREEN_HEIGHT / 30,
  },
  starContainerTop: {
    position: 'absolute',
    left: 10,
    top: 10
  },
  starContainerBottom: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
})