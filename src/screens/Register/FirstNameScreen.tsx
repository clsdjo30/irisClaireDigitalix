import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from '@rneui/base'
import { StackScreenProps } from '@react-navigation/stack';
import { useUserStore } from '../../utils/hooks/useUserStore';
import { colors } from '../../theme';
import NavigationButton from '../../components/NavigationButton';

const width = Dimensions.get('window').width;


const FirstNameScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [user, setUser] = useUserStore()
  return (
    <View testID='first-name-screen' style={styles.container}>

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
            onChangeText={(text) => setUser({ ...user, firstname: text })}
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
          onPress={() => navigation.navigate('Genre', { user: user })}
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
    fontFamily: "mulishRegular",
    fontSize: 18,
    color: colors.palette.violetClair,
    marginBottom: 20
  }

});

export default FirstNameScreen;