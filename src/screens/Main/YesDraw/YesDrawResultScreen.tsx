import React, { useRef, useEffect, useState } from 'react'
import {
    StyleSheet,
    Image,
    View,
    Pressable,
    Text,
    Dimensions,
    ActivityIndicator

} from 'react-native';
import CARD_DECK from '../../../utils/cards';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../theme';
import { useQuestionStore } from '../../../utils/hooks/useQuestionStore';
import { StackScreenProps } from '@react-navigation/stack';
import { useSimpleQuestion } from '../../../utils/hooks/useSimpleQuestion';
import { useFocusEffect } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;

const YesDrawResultScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {

    const [cardImage, setCardImage] = useState(null);
    const [value, isLoading] = useSimpleQuestion(500);
    const [questionInformations, setQuestionInformations] = useQuestionStore()

    const getCardImage = () => {
        return <Image style={styles.card} source={CARD_DECK[questionInformations.choosecardnumber].frontImageUrl} />;
    };

    const getContent = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" />

        }
        return <Text style={styles.contentTitle}>{questionInformations.answer}</Text>;
    };



    function questionClosed() {
        setQuestionInformations({
            ...questionInformations,
            question: "",
            domain: "",
            choosecardnumber: 0,
            choosecardname: "",
            choosecardpseuso: "",
            answer: ""
        })
        navigation.navigate('Home')
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
    }

    return (
        <LinearGradient
            // Card Linear Gradient
            colors={[colors.palette.purple600, colors.palette.purple500]}
            style={styles.container}>


            <View style={styles.deckContainer}>
                <View style={styles.loadingContainer}>
                <Text style={styles.contentTitle}>Resultat de la question</Text>
                    <View style={styles.cardContainer}>
                        {getCardImage()}
                    </View>
                    {getContent()}
                </View>

                <View style={styles.validationButton}>
                    <Pressable style={styles.button} onPress={questionClosed}>
                        <Text style={styles.buttonText}>Revenir à l'accueil</Text>
                    </Pressable>
                </View>

            </View>


        </LinearGradient >
    )
}

export default YesDrawResultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: colors.palette.outterSpace,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Domain Container
    deckContainer: {
        width: "95%",
        height: "95%",
        justifyContent: 'center',
        alignContent: 'center',


    },
    contentTitle: {
        fontFamily: "mulishRegular",
        fontSize: 14 * SCREEN_FONT_SCALE,
        color: colors.palette.ivory,
        marginBottom: 10,
        textAlign: 'center',
    },
    cardContainer: {
        position: 'relative',
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',


    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: 120,
        height: 240,
    },
    validationButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        width: '80%',
        backgroundColor: "#CBA135",
        marginTop: 10,
        borderRadius: 16,
    },
    buttonText: {
        textAlign: "center",
        alignItems: "center",
        paddingVertical: 10,
        fontFamily: "oswaldMedium",
        fontSize: 14,
        color: colors.palette.ivory,
    },
})