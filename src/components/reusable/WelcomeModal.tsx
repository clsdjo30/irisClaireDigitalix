import React from 'react';
import { Modal, StyleSheet, Text, View, Dimensions } from 'react-native';
import NavigationButton from '../NavigationButton';
import { colors } from '../../theme/color';
const { width, height, scale } = Dimensions.get('window');

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
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  
                        <>
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
                        </>
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
        opacity: 0.85,
    },
    modalView: {
        width: width * 0.9,
        heigth: height * 1.5,
        backgroundColor: colors.palette.violetClair,
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
        fontSize: scale + 30,
        fontFamily: 'oswaldLight',
        textAlign: 'center',
        marginTop: height * 0.03,
    },
    modalSubTitle: {
        color: colors.palette.violet,
        fontSize: scale + 15,
        fontFamily: 'oswaldLight',
        textAlign: 'center',
        marginTop: -height * 0.01,
        marginBottom: height * 0.03,
    },
    modalExplain: {
        color: colors.palette.violet,
        fontSize: scale + 14,
        fontFamily: 'oswaldExtraLight',
        textAlign: 'center',
        marginTop: -height * 0.02,
        marginBottom: height * 0.03,
    },
    modalContent: {

    },
    
});

export default WelcomeModal;
