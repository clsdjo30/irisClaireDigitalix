import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Icon } from '@rneui/base'
import { StackScreenProps } from '@react-navigation/stack';
import { useUserStore } from '../../hooks/useUserStore';
import { colors } from '../../theme'
import NavigationButton from '../../components/NavigationButton';
import { CheckBox } from '@rneui/themed';

const width = Dimensions.get('window').width;



const GenreScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [user, setUser] = useUserStore()
    const [error, setError] = useState('')
    const [homme, setHomme] = useState(false)
    const [femme, setFemme] = useState(false)
    const [autres, setAutres] = useState(false)

    const resetAll = () => {
        setHomme(false);
        setFemme(false);
        setAutres(false);
    }

    const handleHommeCheck = () => {
        resetAll();
        setHomme(true);
        setUser({ ...user, genre: 'homme' })
    }

    const handleFemmeCheck = () => {
        resetAll();
        setFemme(true);
        setUser({ ...user, genre: 'femme' })
    }

    const handleAutresCheck = () => {
        resetAll();
        setAutres(true);
        setUser({ ...user, genre: 'autres' })
    }

    function goToBirthday() {
        if (user.genre.length === 0) {
            setError("Vous devez choisir un genre");
            return;
        }

        navigation.navigate('Birthday');
    }


    return (
        <View testID='genre-screen' style={styles.container}>
            {error !== '' && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
            <View style={styles.controls}>
                <View style={styles.genderTitle}>
                    <Text style={styles.contentTitle}>Vous êtes : </Text>
                </View>
                <View style={styles.checkContainer}>
                    <CheckBox
                        title="Un Homme"
                        size={20}
                        checked={homme}
                        checkedTitle='Je suis un homme'
                        checkedIcon={
                            <Icon
                                name="man-outline"
                                type="ionicon"
                                color={colors.palette.golden}
                                size={30}
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        uncheckedIcon={
                            <Icon
                                name="man-outline"
                                type="ionicon"
                                color={colors.palette.white}
                                size={30}
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        onPress={handleHommeCheck}
                        containerStyle={styles.genderCheckBox}
                        wrapperStyle={homme ? styles.positionCheckedBox : styles.positionBox}
                        titleProps={homme ? { style: styles.checkedText } : { style: styles.checkText }}

                    />
                    <CheckBox
                        title="Une Femme"
                        checked={femme}
                        checkedTitle='Je suis une femme'
                        checkedIcon={
                            <Icon
                                name="woman-outline"
                                type="ionicon"
                                color={colors.palette.golden}
                                size={30}
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        uncheckedIcon={
                            <Icon
                                name="woman-outline"
                                type="ionicon"
                                color={colors.palette.white}
                                size={30}
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        onPress={handleFemmeCheck}
                        containerStyle={styles.genderCheckBox}
                        wrapperStyle={femme ? styles.positionCheckedBox : styles.positionBox}
                        titleProps={femme ? { style: styles.checkedText } : { style: styles.checkText }}
                    />
                    <CheckBox
                        title="Autres"
                        checked={autres}
                        checkedTitle='Je ne sais pas'
                        checkedIcon={
                            <Icon
                                name="transgender-outline"
                                type="ionicon"
                                color={colors.palette.golden}
                                size={30}
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        uncheckedIcon={
                            <Icon
                                name="transgender-outline"
                                type="ionicon"
                                color={colors.palette.white}
                                size={30}
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        onPress={handleAutresCheck}
                        containerStyle={styles.genderCheckBox}
                        wrapperStyle={autres ? styles.positionCheckedBox : styles.positionBox}
                        titleProps={autres ? { style: styles.checkedText } : { style: styles.checkText }}
                    />

                </View>
            </View>
            <NavigationButton
                color={colors.palette.violetBg}
                backgroundColor={colors.palette.orange}
                width={width * 0.85}
                title="Suivant"
                onPress={goToBirthday}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.palette.purple600,
    },
    icon: {
        marginRight: 16,
    },
    genderTitle: {
        width: width * 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    //CHECKBOX
    checkContainer: {
        width: width * 0.8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    genderCheckBox: {
        backgroundColor: colors.palette.violet,
    },
    checkText: {
        color: colors.palette.white,
        fontSize: 20,
        fontFamily: 'mulishLight',
        marginLeft: 20,
    },
    checkedText: {
        color: colors.palette.violet,
        fontSize: 20,
        fontFamily: 'mulishSemiBold',
        marginLeft: 20,
    },
    positionBox: {
        width: width * 0.8,
        backgroundColor: colors.palette.purple500,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    positionCheckedBox: {
        width: width * 0.8,
        backgroundColor: colors.palette.purple100,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    controls: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 40,
    },
    contentTitle: {
        fontFamily: "mulishSemiBold",
        fontSize: 20,
        color: colors.palette.violetClair,
        marginBottom: 20
    },
    //ERROR
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

export default GenreScreen;