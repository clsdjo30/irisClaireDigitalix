import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { Icon, Input } from '@rneui/base';
import { StackScreenProps } from '@react-navigation/stack';
import { useUserStore } from '../../hooks/useUserStore';
import { colors } from '../../theme';
import NavigationButton from '../../components/NavigationButton';

const width = Dimensions.get('window').width;

const BirthdayScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [user, setUser] = useUserStore();
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState('');

    const handleDateChange = (text: string) => {
        if (text.length < birthDate.length) { // Si la longueur du texte est inférieure à celle de l'état précédent, l'utilisateur supprime un caractère
            if (birthDate[birthDate.length - 1] === '/') { // Si le dernier caractère est un '/', supprimez-le
                setBirthDate(birthDate.slice(0, -1));
                return;
            }
        }

        let newText = '';
        const numbers = '0123456789';

        for (let i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            if (newText.length == 2 || newText.length == 5) {
                newText = newText + '/';
            }
        }
        setBirthDate(newText);
    };



    function goToSignUp() {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (!birthDate.match(regex)) {
            setError("Veuillez entrer une date valide au format JJ/MM/YYYY");
            return;
        }

        const [day, month, year] = birthDate.split('/').map(Number);
        const selectedDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

        if (year < 1930) {
            setError("L'année de naissance ne peut pas être avant 1930");
            return;
        }

        if (selectedDate > eighteenYearsAgo) {
            setError("Vous devez avoir plus de 18 ans pour vous inscrire");
            return;
        }

        setUser({ ...user, birthday: birthDate });
        navigation.navigate('Sign Up');
    }

    return (
        <View testID='birthday-screen' style={styles.container}>
            {error !== '' && (
                <View testID='error' style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
            <Text style={styles.contentTitle}>Quelle est votre date de naissance ?</Text>
            <View style={styles.inputContainer}>
                <Input
                    style={styles.input}
                    placeholder="JJ/MM/YYYY"
                    placeholderTextColor={colors.palette.purple200}
                    value={birthDate}
                    onChangeText={handleDateChange}
                    keyboardType="numeric"
                    maxLength={10}
                    leftIconContainerStyle={styles.IconBox}
                    leftIcon={
                        <Icon
                            name="calendar"
                            type="foundation"
                            color={colors.palette.white}
                            size={30}
                        />
                    }
                />
            </View>
            <NavigationButton
                testID='goToSignUp'
                color={colors.palette.violetBg}
                backgroundColor={colors.palette.orange}
                width={width / 1.3}
                title="S'inscrire"
                onPress={goToSignUp}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.palette.stepViolet,
    },
    inputContainer: {
        width: width / 1.2,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        width: width / 1.3,
        height: 50,
        backgroundColor: colors.palette.stepViolet,
        borderRadius: 16,
        paddingLeft: 30,
        fontFamily: "mulishRegular",
        fontSize: 20,
        color: colors.palette.white,
    },
    IconBox: {
        width: 50,
        height: 50,
    },
    contentTitle: {
        fontFamily: "mulishSemiBold",
        fontSize: 20,
        color: colors.palette.violetClair,
        marginBottom: 20
    },
    errorContainer: {
        position: 'absolute',
        top: 0,
        width: '80%',
        backgroundColor: colors.palette.orange,
        marginTop: 40,
        borderRadius: 16,
    },
    errorText: {
        textAlign: "center",
        fontFamily: "mulishBold",
        fontSize: 12,
        color: colors.palette.violetClair,
        paddingVertical: 6,
    },
});

export default BirthdayScreen;
