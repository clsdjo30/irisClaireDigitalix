import React from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import { Input } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Form, FormItem } from 'react-native-form-component';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../theme';
import { useQuestionStore } from '../../../utils/hooks/useQuestionStore';
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

const YesDrawScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = useQuestionStore();
console.log(value)

  function goToChooseCard() {
    
    navigation.navigate('DrawOneCard');
  }
  return (
    <LinearGradient
      // Card Linear Gradient
      colors={[colors.palette.purple600, colors.palette.purple500]}
      style={styles.container}>
      
        <View style={styles.blockExplain}>
          <Text style={styles.contentTitle}> Un text pour dire comment poser sa question</Text>
        </View>
        <View style={styles.blockDomain}>
          <Text style={styles.contentTitle}>Vous allez poser une question concernant le domaine : {value.domain}</Text>
        </View>
        <Form
          onButtonPress={goToChooseCard}
          buttonStyle={styles.button}
          buttonText='Tirer votre carte'
          buttonTextStyle={styles.buttonText}
        >

          <FormItem
            placeholder='Saisissez votre question'
            isRequired
            multiline
            numberOfLines={4}
            textAlignVertical='top'
            value={value.question}
            onChangeText={(text) => setValue({ ...value, question: text })}
            style={styles.control}
            textInputStyle={styles.input}
            children={<Icon
              name='question-circle'
              size={28}
              style={styles.icon}
            />}
          />

        </Form>
      
    </LinearGradient >
  )
}

export default YesDrawScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.palette.outterSpace,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //LOGOUT BUTTON
  blockButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {

    backgroundColor: colors.palette.pink500,
    marginBottom: 10,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  buttonText: {
    fontFamily: "oswaldRegular",
    fontSize: 14,
    color: colors.palette.ivory,
    textTransform: "capitalize"
  },
  control: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.2,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.palette.ivory,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: colors.palette.darkgold,
    borderBottomColor: colors.palette.darkgold,
  },
  icon: {
    marginRight: 20,
    color: colors.palette.lightgold,
  },
  input: {
    fontFamily: 'mulishRegular',
    color: colors.palette.blue,
    fontSize: 14,
  },
  blockExplain: {
   width:"90%",
    borderWidth:1,
    marginBottom:30
  },
  blockDomain: {
    width:"90%",
    borderWidth:1
  },
  contentTitle: {
    fontFamily: "mulishRegular",
    fontSize: 14,
    color: colors.palette.ivory,
    marginBottom: 20
  }
})