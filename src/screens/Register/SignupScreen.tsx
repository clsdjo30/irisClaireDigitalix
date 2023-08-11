import React, { useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, CheckBox } from '@rneui/themed';
import { firestore, setDoc, doc, createUserWithEmailAndPassword, getAuth } from '../../config/firebaseConfig'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../hooks/useUserStore';
import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '../../theme';
import NavigationButton from '../../components/NavigationButton';
import { SCREEN_WIDTH } from '../../utils/constants';
import { getZodiacSign } from '../../utils/zodiacHelpers';


const auth = getAuth()

interface User {
  email: string;
  password: string;
}

const SignInScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [user, setUser] = useUserStore();
  const [policy, setPolicy] = useState([false, false]);
  const [error, setError] = useState(''); 


  const dateStr = user.birthday;
  const dateParts = dateStr.split('/');
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const zodiacInfo = getZodiacSign(day, month);

  console.log('zodiacInfo', zodiacInfo)

  function saveUser(useruid: string) {
    const db = firestore;
    setDoc(doc(db, "users", useruid), {
      email: user.email,
      firstname: user.firstname,
      genre: user.genre,
      birthday: user.birthday,
      isagree: user.isagree,
      zodiac: zodiacInfo.transUserSign,
      stone: zodiacInfo.transUserStone,
      element: zodiacInfo.element,
    });
  }

  function isAgree() {
    setPolicy([!policy[0], policy[1]])
    if (policy[0] === false) {
      setUser({ ...user, isagree: true })
      setError('Vous devez accepter les conditions générales d\'utilisation')
    } else {
      setUser({ ...user, isagree: false })
    }
  }


  async function signIn() {
    if (user.email === '' || user.password === '' || policy[0] === false) {
      setUser({
        ...user,
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          const useruid = userCredential.user.uid;
          //save user in firestore
          saveUser(useruid);
        })
    } catch (error) {
      setUser({
        ...user,
      })
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.controls}>
        <View style={styles.genderTitle}>
          <Text style={styles.contentTitle}>Créer votre compte </Text>
        </View>
        <Input
          placeholder='Email'
          placeholderTextColor={'#2072AF'}
          inputContainerStyle={styles.input}
          inputStyle={{ fontSize: 14, marginLeft: 10, fontFamily: "mulishRegular", color: colors.palette.pink500 }}

          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
          leftIcon={<Icon
            name='envelope'
            size={28}
            style={styles.icon}
          />}
        />

        <Input
          placeholder='Password'
          placeholderTextColor={'#2072AF'}
          inputContainerStyle={styles.input}
          inputStyle={{ fontSize: 14, marginLeft: 10, fontFamily: "mulishRegular", color: colors.palette.pink500 }}
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={28}
            style={styles.icon}
          />}
        />
        <View style={styles.policy}>
          <CheckBox
            checked={policy[0]}
            size={16}
            onPress={isAgree}
            center={true}
            checkedColor={colors.palette.pink500}
            containerStyle={{ backgroundColor: colors.palette.violet, borderColor: colors.palette.violet, }}
          />
          <Text style={styles.policy}>
            J'accepte les conditions générales d'utilisation
          </Text>
        </View>
        <View style={styles.validationButton}>
          <NavigationButton
            width={SCREEN_WIDTH / 1.2}
            backgroundColor={colors.palette.orange}
            color={colors.palette.violetBg}
            title="Commencer a poser vos questions"
            onPress={signIn}

          />

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
  logoContainer: {
    position: 'absolute',
    top: 50,
    left: "30%",
    width: '100%',


  },
  logo: {
    width: 120,
    height: 120,
  },
  controls: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '90%'
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
  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#FFF8E7',
  },
  validationButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: '100%',
    backgroundColor: "#CBA135",
    marginTop: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    paddingVertical: 5,
    fontFamily: "oswaldMedium",
    fontSize: 14,
    color: colors.palette.ivory,
  },
  policy: {
    width: 350,
    flexDirection: 'row',
    alignItems: "center",
    fontFamily: "mulishRegularItalic",
    fontSize: 11,
    color: colors.palette.violetBg,
    marginLeft: -6,


  },
  genderTitle: {
    width: 300,
    flexDirection: 'row',
    marginLeft: 10

  },
  icon: {
    marginLeft: 10,
    color: '#FFD700',
  },
  contentTitle: {
    fontFamily: "mulishRegular",
    fontSize: 18,
    color: colors.palette.violetBg,
    marginBottom: 20
  }
});

export default SignInScreen;