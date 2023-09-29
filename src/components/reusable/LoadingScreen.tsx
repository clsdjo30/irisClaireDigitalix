import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUserInformation } from '../../hooks/useUserInformations';
import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/constants';
import { colors } from '../../theme';

const LoadingScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const { user, fetchUser } = useUserInformation();
    
    useEffect(() => {
        // Définissez un délai de 3 secondes
        const timer = setTimeout(() => {
            // Redirigez vers la page 'Profil' après le délai
            navigation.navigate('Profil');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Profil' }],
            }); 
        }, 6000); // 3000ms = 3s

        // Nettoyez le timer lorsque le composant est démonté
        return () => clearTimeout(timer);
    }, []); // Le tableau de dépendances vide signifie que useEffect ne s'exécutera qu'une fois après le montage du composant

    return (
        <View style={styles.container}>
            <LottieView
                autoPlay
                style={{
                    width: SCREEN_WIDTH * 0.4,
                    height: SCREEN_HEIGHT * 0.4,
                    backgroundColor: '#423C7F',
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../../assets/lottie/circle.json')}
            />
            <Text style={styles.text}>Iris Claire enregistre vos modifications</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.palette.stepViolet,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        position: 'absolute',
        bottom: 150,
        fontFamily: "mulishExtraLight",
        fontSize: 16,
        color: colors.palette.violetClair,
    },
});

export default LoadingScreen;
