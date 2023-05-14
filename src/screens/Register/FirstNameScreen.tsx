import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from '@rneui/base'
import { StackScreenProps } from '@react-navigation/stack';
import { Form, FormItem } from 'react-native-form-component';
import { useUserStore } from '../../utils/hooks/useUserStore';
import { colors } from '../../theme'

const FirstNameScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [user, setUser] = useUserStore()


  console.log(user.firstname)
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.controls}>
        <View style={styles.genderTitle}>
          <Text style={styles.contentTitle}>Quelle est votre prénom ?</Text>
        </View>
        <Form
          onButtonPress={() => navigation.navigate('Genre', { user: user })}
          buttonStyle={styles.button}
          buttonText='Suivant'
          buttonTextStyle={styles.buttonText}
        >

          <FormItem
            placeholder='Saisissez votre prénom'
            isRequired
            value={user.firstname}
            onChangeText={(text) => setUser({ ...user, firstname: text })}
            style={styles.control}
            textInputStyle={styles.input}
            children={
              <Icon
                name='user'
                type='font-awesome'
                size={28}
                color= {colors.palette.lightgold}
                style={styles.icon}
              />
            }
          />

        </Form>
      </View>
    </SafeAreaView >
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
  control: {
    width: 300,
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
  },
  error: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#D54826FF',
    borderRadius: 10,
    width: "95%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  textError: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    fontFamily: 'oswaldBold',
    fontSize: 24,
    position: 'relative',
    top: 50,
    width: 300,
    backgroundColor: colors.gold,
    marginTop: 10,
    borderRadius: 16,
  },
  buttonText: {
    textAlign: "center",
    padding: 3,
    fontFamily: "oswaldMedium",
    fontSize: 14,
    color: colors.palette.ivory,
  },
  input: {
    fontFamily: 'mulishRegular',
    color: colors.palette.blue,
    fontSize: 14,
  },
  genderTitle: {
    width: 300,
    flexDirection: 'row',
  },
  contentTitle: {
    fontFamily: "mulishRegular",
    fontSize: 18,
    color: colors.text,
    marginBottom: 20
  }

});

export default FirstNameScreen;