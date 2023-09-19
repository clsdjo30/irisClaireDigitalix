import React, { useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from '@rneui/base'
import { StackScreenProps } from '@react-navigation/stack';
import { useUserStore } from '../../hooks/useUserStore';
import { colors } from '../../theme';
import NavigationButton from '../../components/NavigationButton';

const width = Dimensions.get('window').width;


const FirstNameScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [user, setUser] = useUserStore()
  const [error, setError] = useState('')

  // Fonction pour nettoyer les entrées utilisateur
  const sanitizeInput = (text: string) => {
    // Remplacer les caractères potentiellement malveillants
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function goToGenreScreen() {
    if (user.firstname.length === 0) {
      setError("Le prénom ne peut pas être vide");
      return;
    }

    if (user.firstname.length < 3) {
      setError("Le prénom doit contenir au moins 3 caractères");
      return;
    }

    navigation.navigate('Genre');
  }
  
  return (
    <View testID='first-name-screen' style={styles.container}>
      {error !== '' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
     
      <View style={styles.controls}>
        <View style={styles.genderTitle}>
          <Text style={styles.contentTitle}>Quelle est votre prénom ?</Text>
        </View>
        <View style={styles.inputView}>
          <Input
            value={user.firstname}
            placeholder='Saisissez votre prénom'
            placeholderTextColor={colors.palette.purple200}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputStyle}
            onChangeText={(text) => {
              setError(''); 
              setUser({ ...user, firstname: sanitizeInput(text) });
            }}
            leftIcon={<Icon
              name='user'
              size={28}
              style={styles.icon}
            />}
          />
        </View>
        <NavigationButton
          color={colors.palette.violetBg}
          backgroundColor={colors.palette.orange}
          width={width * 0.85}
          title="Suivant"
          onPress={goToGenreScreen}
          
        />

      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.palette.purple600,
  },
  controls: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
  inputView: {
    width: width * 0.9,
    marginBottom: 20
  },
  input: {
    backgroundColor: colors.palette.ivory,
    padding: 3,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: colors.palette.darkgold,
    borderBottomColor: colors.palette.darkgold,
  },
  inputStyle: {
    fontSize: 14,
    marginLeft: 10,
    fontFamily: "mulishRegular",
    color: colors.palette.violet
  },
  icon: {
    marginLeft: 10,
    color: colors.palette.golden,
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