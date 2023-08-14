import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from '@rneui/themed';
import { colors } from '../../../theme';
import { useQuestionStore } from '../../../hooks/useQuestionStore';
import { StackScreenProps } from '@react-navigation/stack';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;

const YesDrawScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = useQuestionStore();
  const [errorMessage, setErrorMessage] = React.useState('');

  function handleTextChange(text: string) {
    setErrorMessage(''); // Réinitialise le message d'erreur
    setValue({ ...value, question: text }); // Met à jour la valeur de l'input
  }

  function goToChooseCard() {
    if (value.question.length < 20) {
      setErrorMessage('Votre question est trop courte');
      return;
    }

    if (value.question.length > 200) {
      setErrorMessage('Votre question est trop longue');
      return;
    }

    navigation.navigate('DrawOneCard');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {errorMessage !== '' && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
      </View>
      <View style={styles.blockTitle}>
        <Text style={styles.contentTitle}>Question Oui/Non</Text>
        <View>
          <Text style={styles.contentSubTitle}>
            {
              (() => {
                switch (value.domain) {
                  case "amour":
                    return "Votre question va concerner le domaine amoureux";
                  case "travail":
                    return "Votre question va concerner le domaine professionnel";
                  case "argent":
                    return "Votre question va concerner le domaine financier";
                  case "general":
                    return "Votre question est d'ordre général";
                  default:
                    return ""; // retourne une chaîne vide si aucune des conditions ci-dessus n'est respectée
                }
              })()
            }
          </Text>
        </View>


        <View style={styles.formBlock}>
          <Input
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            placeholder='Formulez votre question'
            placeholderTextColor={colors.palette.violet}
            textAlignVertical='top'
            value={value.question}
            onChangeText={handleTextChange}
            style={{ fontFamily: "mulishMedium" }}
            maxLength={300}
            multiline={true}
            numberOfLines={5}
            leftIcon={<Icon
              name='question-circle'
              size={28}
              style={styles.icon}
            />}
          />
          <View style={styles.validationButton}>
            <Pressable style={styles.button} onPress={goToChooseCard}>
              <Text style={styles.buttonText}>
                Tirer ma carte
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View >
  )
}

export default YesDrawScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: SCREEN_WIDTH - 5,
    height: SCREEN_HEIGHT * 0.4,
    borderBottomLeftRadius: SCREEN_WIDTH * 0.1,
    borderBottomRightRadius: SCREEN_WIDTH * 0.1,
    backgroundColor: colors.palette.violet

  },
  blockTitle: {
    position: 'absolute', 
    top: 50,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contentTitle: {
    textAlign: "center",
    fontFamily: "mulishBold",
    fontSize: 22,
    color: colors.palette.violetClair,
  },
  contentSubTitle: {
    paddingTop: 10,
    textAlign: "center",
    fontFamily: "mulishExtraLight",
    fontSize: 14,
    color: colors.palette.violetClair,
  },
  containerStyle: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.3,
    backgroundColor: colors.palette.violetClair,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    elevation: 5,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  //ERROR
  errorContainer: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: colors.palette.orange,
    marginTop: 10,
    borderRadius: 16,
  },
  errorText: {
    textAlign: "center",
    fontFamily: "mulishBold",
    fontSize: 12,
    color: colors.palette.violetClair,
    paddingVertical: 6,
  },
  formBlock: {
    position: 'relative',
    top: -SCREEN_HEIGHT * 0.15,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.5,
    justifyContent: 'center',

  },
  inputStyle: {
    fontFamily: "mulishMedium",

  },
  icon: {
    position: 'relative',
    bottom: 40,
    color: colors.palette.golden,
    marginRight: 10
  },
  //BUTTON
  validationButton: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: '100%',
    backgroundColor: colors.palette.gold,
    marginTop: 10,
    borderRadius: 16,
  },
  buttonText: {
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 8,
    fontFamily: "mulishBold",
    fontSize: 18,
    color: colors.palette.violetBg,
  },

})