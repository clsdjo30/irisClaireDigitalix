import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import {  getAuth, signInWithEmailAndPassword, FirebaseError} from '../../config/firebaseConfig'
import { colors } from '../../theme'


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
    <SafeAreaView style={styles.container}>
        {error && <Text style={styles.error}>{String(error)}</Text>}
      <View style={styles.controls}>
        <View style={styles.genderTitle}>
          <Text style={styles.contentTitle}>Connexion</Text>
        </View>

        <Input
          placeholder='Email'
          placeholderTextColor={colors.palette.violetClair}
          inputContainerStyle={styles.input}
          inputStyle={{ fontSize: 14, marginLeft: 10, fontFamily: "mulishMedium", color: colors.palette.violet }}
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
          placeholderTextColor={colors.palette.violetClair}
          inputContainerStyle={styles.input}
          inputStyle={{ fontSize: 14, marginLeft: 10, fontFamily: "mulishMedium", color: colors.palette.violet }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={20}
            style={styles.icon}
          />}
        />
        <View style={styles.validationButton}>
          <TouchableOpacity style={styles.button} onPress={loginUser}>
            <Text style={styles.buttonText}>
              Se Connecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.grayscale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  controls: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '90%',
  },
  icon: {
    marginLeft: 10,
    color: colors.palette.gold,
  },
  error: {
    width: '90%', 
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
  validationButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: '80%',
    backgroundColor: colors.palette.orange,
    marginTop: 10,
    borderRadius: 16,
  },
  buttonText: {
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 10,
    fontFamily: "oswaldBold",
    fontSize: 18,
    color: colors.palette.grayscale,
  },
  genderTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentTitle: {
    fontFamily: "mulishBold",
    fontSize: 24,
    color: colors.palette.violet,
    marginBottom: 20
  }
});

export default SignInScreen;
