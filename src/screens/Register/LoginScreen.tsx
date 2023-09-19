import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from '@rneui/themed';
import { StackScreenProps } from '@react-navigation/stack';
import {
  getAuth,
  signInWithEmailAndPassword,
  FirebaseError
} from '../../config/firebaseConfig'
import { colors } from '../../theme';
import NavigationButotn from '../../components/NavigationButton';

const { width, height } = Dimensions.get('screen');


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
          inputContainerStyle={styles.input}
          inputStyle={{ fontSize: 16, marginLeft: 10, fontFamily: "mulishMedium", color: colors.palette.violet }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={<Icon
            name='envelope'
            size={20}
            style={styles.icon}
          />}
        />

        <Input
          placeholder='Password'
          placeholderTextColor={colors.palette.purple200}
          inputContainerStyle={[styles.input, { marginBottom: 60}]}
          inputStyle={{ fontSize: 16, marginLeft: 10, fontFamily: "mulishMedium", color: colors.palette.violet }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={20}
            style={styles.icon}
          />}
        />
          <NavigationButotn 
          width={width / 1.1}
          backgroundColor={colors.palette.orange}
          title="Connexion" 
          color= {colors.palette.violetBg}
          onPress={loginUser} />

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.violet,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    marginBottom: 60,
  },
  icon: {
    marginLeft: 10,
    color: colors.palette.gold,
  },
  error: {
    width: width - 40,
    textAlign: 'center',
    backgroundColor: colors.palette.orange,
    borderRadius: 6,
    padding: 10,
    marginTop: 30,
    fontSize: 12,
    color: colors.palette.ivory,

  },
  input: {
    backgroundColor: colors.palette.ivory,
    padding: 3,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: colors.palette.violet,
    borderBottomColor: colors.palette.violet,
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
