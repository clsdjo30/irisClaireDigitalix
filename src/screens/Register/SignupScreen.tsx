import React, { useState } from 'react';
import { styles } from './SignUpScreen.styles'
import {
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PolicyModal from '../../components/PolicyModal';
import {
  Input,
} from '@rneui/themed';
import { useUserStore } from '../../hooks/useUserStore';
import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '../../theme';
import NavigationButton from '../../components/NavigationButton';
import { SCREEN_WIDTH } from '../../utils/constants';
import { useSignIn } from '../../hooks/useSignIn'



const SignInScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [user, setUser] = useUserStore();
  const [policy, setPolicy] = useState(false);

  // utilise le hook SignIn
  const { signIn, error } = useSignIn();

  //modal visible
  const [visible, setVisible] = useState(false);

  // afficher la modal
  const togglePolicy = () => {
    setVisible(!visible);
  };

  console.log('USER SIGN IN HAS SEEN MODAL', user)
  // accepter les conditions générales d'utilisation
  const isAgree = () => {
    if (!policy) {
      setPolicy(true);
      setUser({
        ...user,
        isagree: true,
        irisCoins: 5,
        hasSeenModal: false
      });
    }
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      {error !== '' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <View style={styles.controls}>
        
          <Text style={styles.contentTitle}>Créer votre compte </Text>
        
        <Input
          placeholder='Email'
          placeholderTextColor={'#2072AF'}
          inputContainerStyle={styles.input}
          inputStyle={{ fontSize: 16, marginLeft: 10, fontFamily: "mulishRegular", color: colors.palette.pink500 }}

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
          inputStyle={{ fontSize: 16, marginLeft: 10, fontFamily: "mulishRegular", color: colors.palette.pink500 }}
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={28}
            style={styles.icon}
          />}
        />

        <View style={styles.validationButton}>
          <NavigationButton
            width={SCREEN_WIDTH / 1.2}
            backgroundColor={colors.palette.golden}
            color={colors.palette.violetBg}
            title="Accepter la politique d'utilisation"
            onPress={togglePolicy}
          />
          <NavigationButton
            width={SCREEN_WIDTH / 1.2}
            backgroundColor={colors.palette.orange}
            color={colors.palette.violetBg}
            title="Commencer à poser vos questions"
            onPress={() => signIn(user, policy)}
          />

        </View>
      </View>

      {/* Modal View */}
      <PolicyModal
        visible={visible}
        onClose={() => setVisible(false)}
        onAgree={isAgree}
      />
      {/* / Modal View */}
    </View >
  );
}

export default SignInScreen;