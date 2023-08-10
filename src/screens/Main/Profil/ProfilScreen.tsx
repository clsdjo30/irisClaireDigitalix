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
import { StackScreenProps } from '@react-navigation/stack';
import { useUserStore } from '../../../hooks/useUserStore';
import { useUserInformation } from '../../../hooks/useUserInformations';
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
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useUserStore();


  const rightArrow = require('../../../../assets/icons/caretRight.png');

  const userSign = user?.zodiacname;
  const userStone = user?.stone;
  const userElement = user?.element;




  return (
    <View style={styles.container}>

      <View style={styles.header}>
        
        {/* START USER CARD */}
        {/* Header User Information */}
        <View style={styles.userCard}>
          <Text style={styles.headerTitle}>mon profil</Text>
          <View style={styles.headerUnderlineTop}>
            {UserStoneIcon({ userStone: userStone, name: user?.stone })}
            {UserSignIcon({ userSign: userSign, name: user?.zodiacname })}
            {UserElementIcon({ userElement: userElement, name: user?.element })}
          </View>
          <View style={styles.blockProfilInput}>
            <View style={styles.profilInput}>
              <Text style={styles.textEmail}>Prénom: </Text>
              <Text style={styles.textDetail}>{user?.firstname}</Text>
            </View>
            <View style={styles.profilInput}>
              <Text style={styles.textEmail}>Email: </Text>
              <Text style={styles.textDetail} >{user?.email}</Text>
            </View>
            <View style={styles.profilInput}>
              <Text style={styles.textEmail}>Date de naissance: </Text>
              <Text style={styles.textDetail} >{user?.birthday}</Text>
            </View>
          </View>
          <View style={styles.headerUnderlineTop} />
          
          <View style={styles.blockElement}>
            <View style={styles.profilInput}>
              <Text style={styles.textEmail}>Ma Pierre: </Text>
              <Text style={styles.textDetail} >{userStone}</Text>
            </View>
            <View style={styles.profilInput}>
              <Text style={styles.textEmail}>Mon Signe: </Text>
              {userSign === 'Taurus'
                ?
                <Text style={styles.textDetail} >Taureau</Text>
                :
                <Text style={styles.textDetail} >{userSign}</Text>

              }
            </View>
            <View style={styles.profilInput}>
              <Text style={styles.textEmail}>Mon Element: </Text>
              <Text style={styles.textDetail} >{userElement}</Text>
            </View>
          </View>
          <View>


          </View>

        </View>
      </View>

      {/* User Astro information*/}

      {/* END USER CARD */}


      <View style={styles.paramContent}>

        {/* <View style={styles.blockSwitch}>
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
        </View> */}



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

    </View>
  )
}

export default ProfilScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: colors.palette.violet,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    position: 'absolute',
    top: 0,
    width: SCREEN_WIDTH - 5,
    height: SCREEN_HEIGHT * 0.63,
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
    marginTop: SCREEN_HEIGHT / 50,
  },
  headerSubTitle: {
    color: colors.palette.violet,
    fontSize: 14,
    fontFamily: 'oswaldBold',
    textTransform: 'capitalize',
  },
  headerUnderline: {
    width: SCREEN_WIDTH / 1.1,
    paddingVertical: SCREEN_HEIGHT / 80,
    paddingBottom: SCREEN_HEIGHT * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT / 50,
  },
  headerUnderlineTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH / 1.2,
    paddingVertical: SCREEN_HEIGHT / 50,
    borderBottomWidth: 0.5,
  },

  //Header Profil
  userCard: {
    position: 'relative',
    marginLeft: SCREEN_WIDTH / 20,
  },
  profilInput: {
    flexDirection: 'row',
  },
  blockProfilInput: {
    marginTop: SCREEN_HEIGHT / 50,

  },
  textEmail: {
    color: colors.palette.violet,
    fontFamily: 'mulishLight',
    fontSize: 16,
  },
  textDetail: {
    color: colors.palette.orange,
    fontFamily: 'mulishLight',
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
    marginTop: SCREEN_HEIGHT / 50,
    flexDirection: 'column',
  }
})