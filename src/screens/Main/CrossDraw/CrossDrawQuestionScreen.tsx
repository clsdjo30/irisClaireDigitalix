import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from '@rneui/themed';
import { colors } from '../../../theme';
import { useCrossQuestionStore } from '../../../hooks/useCrossQuestionStore';
import { StackScreenProps } from '@react-navigation/stack';

interface YesDrawScreenProps {
  navigation: any;
}

interface YesDrawScreenState {
  value: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;

const CrossDrawQuestionScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = useCrossQuestionStore();
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

    navigation.navigate('DrawCard');
  }
  console.log("crossQuestion", value)
  console.log("Question", value.question)
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
        <Text style={styles.contentTitle}>Formulez votre question</Text>
      </View>

      <View style={styles.formBlock}>
        <Input
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          placeholder='Saisissez votre question'
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
          <TouchableOpacity style={styles.button} onPress={goToChooseCard}>
            <Text style={styles.buttonText}>
              Tirer ma carte
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

export default CrossDrawQuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2,
    borderBottomLeftRadius: SCREEN_WIDTH * 0.18,
    borderBottomRightRadius: SCREEN_WIDTH * 0.18,
    backgroundColor: colors.palette.violet,
    alignItems: 'center',

  },
  blockTitle: {
    paddingVertical: SCREEN_HEIGHT * 0.2,
  },
  contentTitle: {
    fontFamily: "mulishBold",
    fontSize: 22,
    color: colors.palette.ivory,
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
    backgroundColor: colors.palette.orange,
    marginTop: 20,
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