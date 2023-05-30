import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '../../theme'


const firstStep = require('../../../assets/welcome/stepOne.png');


const StepOneScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
 
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
          <Image source={firstStep} style={styles.fortuneTeller} />
        
        <Text style={styles.firstContent}>
          Notre Tarot a été créé pour vous apporter les réponses à toutes vos questions et faire disparaître le doute de votre vie.
        </Text>
        <Text style={styles.secondContent}>
          Soyez prêt à entendre la vérité sur votre avenir super
        </Text>
        <Text style={styles.thirdContent}>
          Ici ou par la , pas de demi-mesure en matière de divination !
        </Text>


        <View style={styles.blockButton}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StepTwo')}>
            <Text style={styles.buttonText}>
              Suivant
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>
              Se Connecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.palette.purple600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fortuneTeller: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  firstContent: {
    fontFamily: "mulishRegular",
    fontSize: 14,
    color: colors.palette.ivory,
    paddingHorizontal: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  secondContent: {
    fontFamily: "mulishRegular",
    fontSize: 14,
    paddingHorizontal: 16,
    color: colors.palette.ivory,
    textAlign: "center",
  },
  thirdContent: {
    fontFamily: "mulishBold",
    fontSize: 14,
    color: colors.palette.ivory,
    paddingHorizontal: 16,
    textAlign: "center",
    marginTop: 10,
  },
  blockButton: {
    marginTop: 30,
  },
  button: {
    width: 300,
    backgroundColor: "#CBA135",
    marginBottom: 10,
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 5,
  },
  buttonText: {
    fontFamily: "oswaldRegular",
    fontSize: 14,
    color: colors.palette.ivory,
  },
});

export default StepOneScreen;