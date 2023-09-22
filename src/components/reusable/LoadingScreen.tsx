import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUserInformation } from '../../hooks/useUserInformations';
import { StackScreenProps } from '@react-navigation/stack';

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
        }, 3000); // 3000ms = 3s

        // Nettoyez le timer lorsque le composant est démonté
        return () => clearTimeout(timer);
    }, []); // Le tableau de dépendances vide signifie que useEffect ne s'exécutera qu'une fois après le montage du composant

    return (
        <View style={styles.container}>
            <Text style={styles.text}>CHARGEMENT DES DONNÉES</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default LoadingScreen;
