import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Input, Icon } from '@rneui/themed';
import { StackScreenProps } from '@react-navigation/stack';
import {
  getAuth,
  signInWithEmailAndPassword,
  FirebaseError
} from '../../config/firebaseConfig'
import { colors } from '../../theme';
import NavigationButton from '../../components/NavigationButton';
import { SCREEN_WIDTH } from "../../utils/constants";


const SignInScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {

  const auth = getAuth();
  const [error, setError] = React.useState<string | FirebaseError | undefined>(undefined);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
        setError('Your email or password was incorrect');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else {
        setError('There was a problem with your request');
      }
    }
  };



  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{String(error)}</Text>}
      <View style={styles.controls}>
        <View style={styles.genderTitle}>
          <Text style={styles.contentTitle}>Connexion</Text>
        </View>

        <Input
          placeholder='Email'
          placeholderTextColor={colors.palette.purple200}
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIconContainerStyle={styles.iconBox}
          leftIcon={<Icon
            name="mail-outline"
            type="ionicon"
            color={colors.palette.white}
            size={20}
          />}
        />

        <Input
          placeholder='Password'
          placeholderTextColor={colors.palette.purple200}
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          leftIconContainerStyle={styles.iconBox}
          leftIcon={<Icon
            name="key"
            type="ionicon"
            color={colors.palette.white}
            size={20}
          />}
        />
        < View style={styles.validationButton}>
          <NavigationButton 
          width={SCREEN_WIDTH / 1.1}
          backgroundColor={colors.palette.orange}
          title="Connexion" 
          color= {colors.palette.violetBg}
          onPress={loginUser} />
          </View>

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.stepViolet,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH * 0.9,
    marginBottom: 60,
  },
  icon: {
    marginLeft: 10,
    color: colors.palette.gold,
  },
  error: {
    width: SCREEN_WIDTH - 40,
    textAlign: 'center',
    backgroundColor: colors.palette.orange,
    borderRadius: 6,
    padding: 10,
    marginTop: 30,
    fontSize: 12,
    color: colors.palette.ivory,

  },
  input: {
    width: SCREEN_WIDTH / 0.3,
    height: 50,
    backgroundColor: colors.palette.stepViolet,
    borderRadius: 16,
    paddingLeft: 20,
    fontFamily: "mulishLight",
    fontSize: 18,
    color: colors.palette.white,
  },
  iconBox: {
    width: 50,
    height: 50,
  },
  validationButton: {
    position: "relative",
    top: 150,
  },
  genderTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  contentTitle: {
    fontFamily: "mulishBold",
    fontSize: 26,
    color: colors.palette.violetBg,
    marginBottom: 20
  },
  button: {
    position: "relative",
    top: 0,
    

  }
});

export default SignInScreen;
