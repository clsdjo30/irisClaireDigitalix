import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { FIREBASE_AUTH } from '../../config/firebaseConfig';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { colors } from '../../theme'





const SignInScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuthentication();

  const [error, setError] = React.useState(undefined as string | undefined);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error) {
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
        {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.controls}>
        <View style={styles.genderTitle}>
          <Text style={styles.contentTitle}>Connexion</Text>
        </View>

        <Input
          placeholder='Email'
          placeholderTextColor={'#2072AF'}
          inputContainerStyle={styles.input}
          inputStyle={{ fontSize: 14, marginLeft: 10, fontFamily: "mulishRegular", color: colors.palette.pink500 }}
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
          placeholderTextColor={'#2072AF'}
          inputContainerStyle={styles.input}
          inputStyle={{ fontSize: 14, marginLeft: 10, fontFamily: "mulishRegular", color: colors.palette.pink500 }}
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
    backgroundColor: colors.palette.purple600,
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
    color: '#FFD700',
  },
  error: {
    width: '90%', 
    textAlign: 'center',
    backgroundColor: colors.palette.pink500,
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
    borderLeftColor: colors.palette.darkgold,
    borderBottomColor: colors.palette.darkgold,
  },
  validationButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: '80%',
    backgroundColor: "#CBA135",
    marginTop: 10,
    borderRadius: 16,
  },
  buttonText: {
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 10,
    fontFamily: "oswaldMedium",
    fontSize: 14,
    color: colors.palette.ivory,
  },
  genderTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentTitle: {
    fontFamily: "mulishRegular",
    fontSize: 22,
    color: colors.text,
    marginBottom: 20
  }
});

export default SignInScreen;
