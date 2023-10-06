import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  AppState,
  AppStateStatus
} from 'react-native';
import { Button } from '@rneui/themed';
import { StackScreenProps } from '@react-navigation/stack';
import CardChoices from '../../components/CardChoices';
import DayCardChoices from '../../components/DayCardChoices';
import WelcomeModal from '../../components/reusable/WelcomeModal';
import { goToYesDraw, goToCrossDraw } from '../../utils/NavigationFunctions';
import { styles } from './HomeScreen.styles';
import { colors } from '../../theme';
import { resetAtMidnight } from '../../utils/resetAtMidnight';
import { useDaydrawStore } from '../../store/useDayDrawStore';
import { useCrossQuestionStore } from '../../store/useCrossQuestionStore';
import { useUserInformation } from '../../hooks/useUserInformations';
import { useEmailVerification } from '../../hooks/useEmailVerification';

const eye = require('../../../assets/icons/iris_card.png');
const yesCard = require('../../../assets/icons/yesCard.png');

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = useCrossQuestionStore();
  const [daycard, setDayCard] = useDaydrawStore();
  const { user, fetchUser } = useUserInformation();
  // Gestion du state des modal de la page Home
  const [isModalVisible, setModalVisible] = useState(true);
  const [isEmailVerifyModalVisible, setEmailVerifyModalVisible] = useState(false);
  const [isIrisAddedModalVisible, setIrisAddedModalVisible] = useState(false);
  //Listener sur le changement d'état de l'application
  const [appState, setAppState] = useState(AppState.currentState);
  const {
    isEmailVerified,
    updateIrisAdded,
    updateIsEmailVerified,
    fetchUserVerification,
  } = useEmailVerification();

  useEffect(() => {
    // Si l'email n'est pas vérifié, affichez la modale de vérification d'email
    if (!isEmailVerified && !user?.isEmailVerified) {
      setEmailVerifyModalVisible(true);
      setIrisAddedModalVisible(false); // Assurez-vous que cette modale est cachée
    } else {
      setEmailVerifyModalVisible(false);
      // Si l'email est vérifié et que l'Iris n'a pas encore été ajouté, affichez la modale d'Iris ajouté
      if (isEmailVerified && !user?.isCoinAdded) {
        setIrisAddedModalVisible(true);
      } else {
        // Assurez-vous que les deux modales sont cachées
        setEmailVerifyModalVisible(false);
        setIrisAddedModalVisible(false);
      }
    }
  }, [isEmailVerified, user?.isCoinAdded]);

  // Fermez la modale d'Iris ajouté et mettez à jour la base de données pour indiquer que l'Iris a été ajouté
  const handleIrisAddedModalClose = () => {
    setIrisAddedModalVisible(false);
    // Mettez à jour la base de données pour indiquer que l'Iris a été ajouté
    updateIrisAdded();
  };

  useEffect(() => {
    // Mettez à jour le state de l'application
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // L'application est passée de l'arrière-plan à l'avant-plan
        // Mettez à jour les informations de l'utilisateur et la vérification de l'email
        fetchUser();
        updateIsEmailVerified();
        fetchUserVerification();
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState]);

  // Reset de la carte du jour à minuit
  useEffect(() => {
    // Définissez un délai d'expiration pour minuit
    const timer = resetAtMidnight(() => {
      setDayCard(prevState => ({
        ...prevState,
        isdraw: false
      }));
    });
    // Nettoyez le setTimeout lorsque le composant est démonté ou si les dépendances changent
    return () => clearTimeout(timer);
  }, []);

  // Affichage du didacticiel au premier lancement de l'application
  useEffect(() => {
    // Si l'utilisateur a déjà vu le didacticiel, ne l'affichez pas
    if (user.hasSeenModal === true) {
      setModalVisible(false);
    }
  }, [user?.hasSeenModal]);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Text style={styles.headerTitle}>Bonjour {user?.firstname}</Text>
      <View style={styles.tendanceContainer}>
        {daycard.isdraw === false ?
          <>
            <View style={styles.tendanceTextContainer}>
              <Text style={styles.tendanceText}>
                Allez vite découvrir la tendance de votre journée !
              </Text>
            </View>
          </>
          :
          <>

            <View style={styles.tendanceTextContainer}>
              <Text style={styles.displayTextTendance}>
                {daycard.daytendance}
              </Text>
            </View>
          </>
        }
      </View>

      <View style={styles.domainsContainer}>
        {/* Carte pour poser une question OUI/NON */}
        <CardChoices
          iconSource={yesCard}
          onPress={() => goToYesDraw(navigation)}
          title="Question Oui/Non"
          explanation="Recevez une réponse breve à vos questions les plus simple"
        />

        {/* Carte pour poser une question complete */}
        <CardChoices
          iconSource={eye}
          onPress={() => goToCrossDraw(navigation)}
          title="Tirage Complet"
          explanation="Vous avez de grande interogation, vous voulez ...."
        />

        {/* Carte pour l'horoscope du jour */}
        <DayCardChoices
          navigation={navigation}
          daycard={daycard}
        />

        {/* Affichage du Didacticiel au premier lancement de l'application */}
        <WelcomeModal
          visible={isModalVisible}
          onValidate={() => {
            setModalVisible(!isModalVisible);
          }}
        />

      </View>
      {/* // La modal indiquant de verifier son email */}
      {isEmailVerifyModalVisible && isModalVisible === false && (

        <Modal
          animationType="slide"
          transparent={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalTitle}> Profitez d'une question gratuite !</Text>
                <Text style={styles.modalsubTitle}>Votre question offerte vous attend !</Text>
                <Text style={styles.modalText}>Cliquez sur le lien dans l'email que nous vous avons envoyé.</Text>
              </View>
              <View style={styles.buttonGroup}>
                <Button
                  title="Fermer"
                  onPress={() => setEmailVerifyModalVisible(false)}
                  buttonStyle={{
                    backgroundColor: colors.palette.orange,
                    borderRadius: 5,
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
      {/* // La modal indiquant que l'Iris a été ajouté */}
      {isIrisAddedModalVisible && (

        <Modal
          animationType="slide"
          transparent={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalTitle}> Email Vérifié </Text>
                <Text style={styles.modalsubTitle}>C'est le moment de poser cette question qui vous trotte dans la tête. </Text>
                <Text style={styles.modalText}>Utilisez votre question gratuite et découvrez ce que l'avenir vous réserve !</Text>
              </View>
              <View style={styles.buttonGroup}>
                <Button
                  title="Fermer"
                  onPress={handleIrisAddedModalClose}
                  buttonStyle={{
                    backgroundColor: colors.palette.orange,
                    borderRadius: 5,
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

export default HomeScreen;
