import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Input, Icon } from '@rneui/base';
import { StackScreenProps } from '@react-navigation/stack';
import { useUserStore } from '../../hooks/useUserStore';
import { colors } from '../../theme';
import NavigationButton from '../../components/NavigationButton';
import { useUserInformation } from '../../hooks/useUserInformations';

import { SCREEN_WIDTH } from "../../utils/constants";

const FirstNameScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [newUser, setUser] = useUserStore();
  // console.log('FirstNameScreen.tsx NEW USER', newUser)
  const [error, setError] = useState('');

//interdire les caracteres speciaux
  const isValidName = (text: string) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(text);
  };

  // Controller la saisi du prenom
  const handleInputChange = (text: string) => {
    setError('');

    // Si le texte est vide, permettez la mise à jour
    if (text === '') {
      setUser({ ...newUser, firstname: text });
      return;
    }

    if (!isValidName(text)) {
      setError('Veuillez entrer uniquement des lettres.');
      return;
    }

    setUser({ ...newUser, firstname: text });
  };

  const goToGenreScreen = () => {
    if (newUser.firstname.length === 0) {
      setError('Le prénom ne peut pas être vide');
      return;
    }

    if (newUser.firstname.length < 3) {
      setError('Le prénom doit contenir au moins 3 caractères');
      return;
    }

    navigation.navigate('Genre');
  };

  return (
    <View testID='first-name-screen' style={styles.container}>
      {error && <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>}
      <View style={styles.controls}>
        <View style={styles.genderTitle}>
          <Text style={styles.contentTitle}>Quelle est votre prénom ?</Text>
        </View>
        <View style={styles.inputView}>
          <Input
            value={newUser.firstname}
            placeholder='Saisissez votre prénom'
            placeholderTextColor={colors.palette.purple200}
            style={styles.input}
            onChangeText={handleInputChange}
            leftIcon={<Icon
              name="person-outline"
              type="ionicon"
              color={colors.palette.white}
              size={20}
            />}
          />
        </View>
        <NavigationButton
          color={colors.palette.violetBg}
          backgroundColor={colors.palette.orange}
          width={SCREEN_WIDTH * 0.85}
          title="Suivant"
          onPress={goToGenreScreen}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.palette.stepViolet
  },
  controls: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
  inputView: {
    width: SCREEN_WIDTH * 0.9,
    marginBottom: 20
  },
  input: {
    width: SCREEN_WIDTH / 0.3,
    height: 48,
    backgroundColor: colors.palette.stepViolet,
    borderRadius: 16,
    paddingLeft: 20,
    fontFamily: "mulishExtraLight",
    fontSize: 18,
    color: colors.palette.white,
    textTransform: 'capitalize' 
  },
  inputStyle: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "mulishRegular",
    color: colors.palette.violet
  },
  icon: {
    marginLeft: 10,
    color: colors.palette.violet,
  },
  genderTitle: {
    width: 300,
    flexDirection: 'row',
  },
  contentTitle: {
    fontFamily: "mulishSemiBold",
    fontSize: 20,
    color: colors.palette.violetClair,
    marginBottom: 20
  },
  //ERROR
  errorContainer: {
    position: 'absolute',
    top: 0,
    width: '80%',
    backgroundColor: colors.palette.orange,
    marginTop: 40,
    borderRadius: 16,
  },
  errorText: {
    textAlign: "center",
    fontFamily: "mulishBold",
    fontSize: 12,
    color: colors.palette.violetClair,
    paddingVertical: 6,
  },

});

export default FirstNameScreen;