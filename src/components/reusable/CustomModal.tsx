import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import NavigationButton from '../NavigationButton';
import { colors } from '../../theme/color';
const { width, height } = Dimensions.get('window');

type CustomModalProps = {
    visible: boolean;
    credit: number;
    onValidate: () => void;
    onCancel: () => void;
    onBuyCredit: () => void;
};


const CustomModal: React.FC<CustomModalProps> = ({
    visible,
    credit,
    onValidate,
    onCancel,
    onBuyCredit,
}) => {
    return (
        <Modal 
        animationType="fade" 
        transparent={true} 
        visible={visible}
        statusBarTranslucent={true}
        onRequestClose={onCancel}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {credit > 0 ? (
                        <>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.modalText}>Voulez-vous utilisez 1 crédit pour recevoir votre réponse ?</Text>
                            </View>
                            <View style={styles.buttonView}>
                                <NavigationButton
                                    title='Utiliser un crédit'
                                    onPress={onValidate}
                                    width={width * 0.6}
                                    color={colors.palette.violet}
                                    backgroundColor={colors.palette.orange}
                                />
                                <NavigationButton
                                    title="Revenir à l'accueil"
                                    onPress={onCancel}
                                    width={width * 0.6}
                                    color={colors.palette.violetClair}
                                    backgroundColor={colors.palette.violet}
                                />
                            </View>
                        </>
                    ) : (
                        <>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.modalText}>Vous n'avez plus de crédits disponibles</Text>
                        </View>
                            <NavigationButton
                                    title='Acheter des crédits'
                                    onPress={onBuyCredit}
                                    width={width * 0.6}
                                    color={colors.palette.violet}
                                    backgroundColor={colors.palette.orange}
                                />
                                <NavigationButton
                                    title="Revenir à l'accueil"
                                    onPress={onCancel}
                                    width={width * 0.6}
                                    color={colors.palette.violetClair}
                                    backgroundColor={colors.palette.violet}
                                />
                        </>
                    )}
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
    },
    modalView: {
        width: width * 0.8,
        heigth: 800,
        backgroundColor: colors.palette.violetClair,
        borderRadius: 16,
        paddingVertical: height * 0.05,
        paddingHorizontal: width * 0.1,
        alignItems: 'center',
        shadowColor: colors.palette.violetBg,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
    modalText: {
        textAlign: 'center',
        fontFamily: 'mulishRegular',
        fontSize: 20,
        color: colors.palette.violet,
    },
});

export default CustomModal;
