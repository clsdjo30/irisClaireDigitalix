import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '../../theme'

const secondStep = require("../../../assets/welcome/stepTwo.png")

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          style={styles.fortuneTeller}
          source={secondStep}
        />
        <Text style={styles.firstContent}>
          Comment ça marche :
        </Text>
        <Text style={styles.topContent}>
          Inspirez profondément et pensez à votre question
        </Text>
        <Text style={styles.secondContent}>
          Choisissez une carte du Tarot Iris Claire
        </Text>
        <Text style={styles.thirdContent}>
          Découvrez votre réponse immédiatement
        </Text>

        <View style={styles.blockButton}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FirstName')}>
            <Text style={styles.buttonText}>
              Suivant
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
    backgroundColor: colors.palette.purple600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
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
    fontSize: 20,
    color: colors.text,
    paddingHorizontal: 10,
    textAlign: "center",
    marginTop: 20,
  },
  topContent: {
    fontFamily: "mulishRegular",
    fontSize: 14,
    color: colors.text,
    paddingHorizontal: 12,
    textAlign: "center",
    marginTop: 10,
  },
  secondContent: {
    fontFamily: "mulishRegular",
    fontSize: 14,
    color: colors.text,
    paddingHorizontal: 12,
    textAlign: "center",
    marginTop: 10,
  },
  thirdContent: {
    fontFamily: "mulishBlack",
    fontSize: 14,
    color: colors.palette.ivory,
    paddingHorizontal: 12,
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
    textAlign: "center",
    padding: 3,
    fontFamily: "oswaldMedium",
    fontSize: 14,
    color: "#FFF8E7",

  },
});

export default WelcomeScreen;