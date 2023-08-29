import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import NavigationButton from '../NavigationButton';
import { colors } from '../../theme/color';
const { width, height, scale } = Dimensions.get('window');
import { useUserInformation } from '../../hooks/useUserInformations';

type WelcomeModalProps = {
    visible: boolean;
    buttonText: string;
    onValidate: () => void;
    modalTitle: string;
    modalSubTitle: string;
    modalContent: string;
    modalExplain: string;
};

const WelcomeModal: React.FC<WelcomeModalProps> = ({
    visible,
    buttonText,
    onValidate,
    modalTitle,
    modalSubTitle,
    modalContent,
    modalExplain,
}) => {

    const [currentSection, setCurrentSection] = useState('daydraw');
    const userInformation = useUserInformation();
    function toggleSection() {
        if (currentSection === 'daydraw') {
            setCurrentSection('yesno');
        } else if (currentSection === 'yesno') {
            setCurrentSection('complet');
        } else if (currentSection === 'complet') {
            setCurrentSection('profil');
        } else if (currentSection === 'profil') {
            setCurrentSection('credit');
        } else {
            setCurrentSection('daydraw');
            userInformation.updateHasSeenModal();
            onValidate();
        }
    }



    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={styles.headerTuto}>
                        <Text style={styles.headerTutoTiltle}>Iris Claire</Text>
                        <Text style={styles.headerTutoSubTiltle}>Votre guide spirituelle de poche</Text>
                    </View>
                    {/* YES NO SECTION */}
                    {currentSection === 'yesno' && (
                        <View style={styles.yesNoTutoView} >
                            <Pressable style={styles.tutoButton} onPress={toggleSection}>
                                <Text style={styles.textTutoButton}>Click</Text>
                            </Pressable>
                            <View style={styles.textView}>
                                <Text style={styles.textTuto}>
                                    Si vous avez besoin d'une réponse rapide à une question simple, c'est ici que vous pourrez la trouver !
                                </Text>
                            </View>
                        </View>
                    )}
                    {/* TIRAGE COMPLET SECTION */}
                    {currentSection === 'complet' && (
                        <View style={styles.completTutoView}>
                            <Pressable style={styles.tutoButton} onPress={toggleSection}>
                                <Text style={styles.textTutoButton}>Click</Text>
                            </Pressable>
                            <View style={styles.textView}>
                                <Text style={styles.textTuto}>
                                    C'est ici que vous pourrez poser vos questions les plus profondes et obtenir des réponses plus détaillées et plus précises
                                </Text>
                            </View>
                        </View>
                    )}
                    {/* DAYDRAW SECTION */}
                    {currentSection === 'daydraw' && (
                        <View style={styles.daydrawTutoView}>
                            <Pressable style={styles.tutoButton} onPress={toggleSection}>
                                <Text style={styles.textTutoButton}>Click</Text>
                            </Pressable>
                            <View style={styles.textView}>
                                <Text style={styles.textTuto}>
                                    Ici vous pourrez tirez une carte chaque jour afin de découvrir la tendance de votre journée, à la manière d'un horoscope
                                </Text>
                            </View>
                        </View>
                    )}
                    {currentSection === 'profil' && (
                    <View style={styles.profilTutoView} >
                        <View style={styles.profilTextView}>
                            <Text style={styles.textTuto}>
                                Endroit important de l'application, c'est ici que vous pourrez retrouver l'historique de vos tirages, vos questions, vos réponses et vos credits
                            </Text>
                        </View>
                        <Pressable style={styles.profilTutoButton} onPress={toggleSection}>
                            <Text style={styles.textTutoButton}>Click</Text>
                        </Pressable>
                        </View>
                    )}
                    {currentSection === 'credit' && (
                        <View style={styles.creditTutoView} >
                            <View style={styles.creditTextView}>
                                <Text style={styles.textTuto}>
                                    Enfin ici vous pourrez acheter des crédits pour pouvoir trouver les reponses à vos questions
                                </Text>
                            </View>
                            <Pressable style={styles.creditTutoButton} onPress={toggleSection}>
                                <Text style={styles.textTutoButton}>Commencez !</Text>
                            </Pressable>
                        </View>
                    )}
                    {/* <>
                            <View>
                                <Text style={styles.modalTitle}>{modalTitle}</Text>
                                <Text style={styles.modalSubTitle}>{modalSubTitle}</Text>
                                <Text style={styles.modalExplain}>{modalExplain}</Text>
                                <Text style={styles.modalExplain}>{modalContent}</Text>
                            </View>
                            <View style={styles.buttonView}>
                                <NavigationButton
                                    title={buttonText}
                                    onPress={onValidate}
                                    width={width * 0.6}
                                    color={colors.palette.violet}
                                    backgroundColor={colors.palette.orange}
                                />
                            </View>
                        </> */}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.palette.violet,
        opacity: 0.7,
    },
    modalView: {
        width: width * 0.95,
        heigth: height * 1.5,
        backgroundColor: colors.palette.violetBg,
        borderRadius: 16,
        paddingHorizontal: width * 0.05,
        alignItems: 'center',
    },
    buttonView: {
        marginTop: 30,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTitle: {
        color: colors.palette.darkgold,
        fontSize: scale + 28,
        fontFamily: 'oswaldRegular',
        textAlign: 'center',
        marginTop: height * 0.03,
    },
    modalSubTitle: {
        color: colors.palette.violet,
        fontSize: scale + 15,
        fontFamily: 'oswaldRegular',
        textAlign: 'center',
        marginTop: -height * 0.01,
        marginBottom: height * 0.03,
    },
    modalExplain: {
        color: colors.palette.violet,
        fontSize: scale + 14,
        fontFamily: 'oswaldLight',
        textAlign: 'center',
        marginTop: -height * 0.02,
        marginBottom: height * 0.03,
    },
    modalContent: {

    },
    // HEADER TUTO SECTION
    headerTuto: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: height *0.3 ,
    },
    headerTutoTiltle: {
        color: colors.palette.white,
        fontSize: scale + 45,
        fontFamily: 'oswaldBold',
        textAlign: 'center',
        marginTop: height * 0.03,
    },
    headerTutoSubTiltle: {
        color: colors.palette.white,
        fontSize: scale + 22,
        fontFamily: 'oswaldRegular',
        textAlign: 'center',
        marginTop: -height * 0.026,
    },
    // DAYDRAW TUTO SECTION
    daydrawTutoView: {
        width: width * 0.76,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: height * 0.21,
        right: width * 0.08,
    },
    tutoButton: {
        backgroundColor: colors.palette.orange,
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTutoButton: {
        color: colors.palette.violetBg,
        fontSize: scale + 15,
        fontFamily: 'oswaldRegular',
        marginBottom: height * 0.01,
    },
    textView: {
        width: width * 0.55,
    },
    textTuto: {
        color: colors.palette.white,
        fontFamily: 'oswaldBold',
        textAlign: 'justify',
    },
    // YES NO TUTO SECTION
    completTutoView: {
        width: width * 0.75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        right: width * 0.08,
    },
    // YES NO TUTO SECTION
    yesNoTutoView: {
        width: width * 0.75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: height * 0.12,
        right: width * 0.08,
    },
    // PROFIL TUTO SECTION
    profilTutoView: {
        width: width * 0.75,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: height * 0.24,
        left: width * 0.42, 
    },
    profilTutoButton: {
        backgroundColor: colors.palette.orange,
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.08,
    },
    profilTextView: {
        width: width * 0.8,
        position: 'relative',
        top: height * 0.05,
        right: width * 0.35,
    },
    // CREDIT TUTO SECTION
    creditTutoView: {
        width: width * 0.75,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: height * 0.27,
        left: width * 0.08,
    },
    creditTextView: {
        width: width * 0.8,
        position: 'relative',
        top: height * 0.045,
        right: 0,
    }, 
    creditTutoButton: {
        backgroundColor: colors.palette.orange,
        width: width * 0.3,
        height: width * 0.12,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.08,
    }


});

export default WelcomeModal;
