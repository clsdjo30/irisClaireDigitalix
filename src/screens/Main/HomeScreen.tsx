import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { Button, Icon, Image } from '@rneui/themed';
import { useUserStore } from '../../utils/hooks/useUserStore';
import { colors } from '../../theme';
import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient'

const auth = getAuth();

const rightArrow = require('../../../assets/fonts/caretRight.png');
const oneQuestionEye = require('../../../assets/images/tabsImage/006.png');
const secondQuestionEye = require('../../../assets/images/tabsImage/008.png');
const thirdQuestionEye = require('../../../assets/images/tabsImage/010.png');
const star = require('../../../assets/icons/sparkling-gold.png')


const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [user, setUser] = useUserStore();
  console.log(user)

  function goToYesDraw() {
    navigation.navigate('YesDraw');
  }

  // function goToCrossDraw() {
  //   navigation.navigate('CrossDraw');
  // }

  return (

    <LinearGradient
      // Card Linear Gradient
      colors={[colors.palette.purple600, colors.palette.purple500]}
      style={styles.container}>

      {/* START USER CARD */}
      <LinearGradient
        colors={[colors.palette.purple400, colors.palette.purple500]}
        style={styles.cardUserStyle}>
        <View style={styles.starContainerTop}>
          <Image source={star} style={styles.starImage} />
        </View>
        {/* Header User Information */}
        <View style={styles.headerImageContainer}>
          <Text style={styles.headerTitle}>bienvenue </Text>
          <Text style={styles.headerSubTitle}>{user?.firstname} </Text>
        </View>
        {/* User Astro information*/}

        <View style={styles.starContainerBottom}>
          <Image source={star} style={styles.starImage} />
        </View>
      </LinearGradient>
      {/* END USER CARD */}

      {/* START 3 ACTIONS CARD */}
      {/* Select Action  */}
      <View style={styles.centerBlock}>
        <View style={styles.contentBlock}>
          {/* First Card */}
          <LinearGradient
            // Card Linear Gradient
            colors={['transparent', colors.palette.purple400]}
            style={styles.cardStyle}>

            <View style={styles.cardRow}>
              <View>
                <Image source={oneQuestionEye} style={styles.imageContainerStyle}></Image>
              </View>
              <View style={styles.textView}>
                <Text style={styles.cardTitle}>Poser une question Express</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconPosition} onPress={goToYesDraw}>
                  <Image source={rightArrow} style={styles.iconImage}></Image>
                </TouchableOpacity>
              </View>
            </View>

          </LinearGradient>
          {/* Second Card */}

          <LinearGradient
            // Card Linear Gradient
            colors={['transparent', colors.palette.purple400]}
            style={styles.cardStyle}>
            <View style={styles.cardRow}>
              <View>
                <Image source={secondQuestionEye} style={styles.imageContainerStyle}></Image>
              </View>
              <View style={styles.textView}>
                <Text style={styles.cardTitle}>Poser une nouvelle question Détaillée</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconPosition} >
                  <Image source={rightArrow} style={styles.iconImage}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* Third Card */}
          <LinearGradient
            // Card Linear Gradient
            colors={['transparent', colors.palette.purple400]}
            style={styles.cardStyle}>
            <View style={styles.cardRow}>
              <View>
                <Image source={thirdQuestionEye} style={styles.imageContainerStyle}></Image>
              </View>
              <View style={styles.textView}>
                <Text style={styles.cardTitle}>Poser une nouvelle question Express</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconPosition}>
                  <Image source={rightArrow} style={styles.iconImage}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
      {/* START 3 ACTIONS CARD */}

    </LinearGradient>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.outterSpace,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBlock: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '50%',
    marginTop: 40,
  },
  cardStyle: {
    width: '90%',
    height: '25%',
    backgroundColor: colors.palette.purple100,
    borderRadius: 20,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: colors.palette.pink200,
    borderBottomColor: colors.palette.pink200,
    elevation: 10,
  },
  title: {
    fontSize: 30,
  },
  button: {
    marginTop: 10
  },
  cardRow: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 30,
  },
  imageContainer: {
    width: 70,
    height: 70,
    backgroundColor: colors.palette.pink500,
    borderRadius: 10,
  },
  textView: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'oswaldSemiBold',
    color: colors.palette.purple600,
    textAlign: 'center',
  },
  iconContainer: {
    width: "30%",
    height: '90%',
    borderRadius: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageContainerStyle: {
    width: 70,
    height: 70,
  },
  iconPosition: {
    width: 40,
    height: 40,
    backgroundColor: colors.palette.pink500,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
  headerImage: {
    width: 20,
    height: 20,
  },
  headerContent: {
    color: colors.palette.ivory,
    fontSize: 14,
    fontFamily: 'mulishRegular',
  },
  //START OFUSER CARD INFORMATION
  cardUserStyle: {
    width: '90%',
    height: '25%',
    backgroundColor: colors.palette.purple200,
    borderRadius: 10,
    borderBottomWidth: 0.9,
    borderRightWidth: 0.9,
    borderRightColor: colors.palette.lightgold,
    borderBottomColor: colors.palette.lightgold,
    elevation: 10,
  },
  headerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 23,
    marginBottom: 3
  },
  headerTitle: {
    color: colors.palette.ivory,
    fontSize: 24,
    fontFamily: 'oswaldLight',
    textTransform: 'capitalize',
  },
  headerSubTitle: {
    color: colors.palette.darkgold,
    fontSize: 24,
    fontFamily: 'oswaldBold',
    textTransform: 'capitalize',
  },
  headerUnderline: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },


  // css pour placer les etoiles dans la carte user information
  starImage: {
    width: 25,
    height: 25,
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
  //END OF USER CARD INFORMATION

  // START OF ACTION CARD
  centerBlock: {
    width: '100%',
    height: '60%',
  },

  // END OF ACTION CARD

});

export default HomeScreen;