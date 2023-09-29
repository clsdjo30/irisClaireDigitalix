import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Pressable,
    Text,
    Dimensions,
    ActivityIndicator,
    BackHandler,
} from 'react-native';
import CARD_DECK from '../../../data/cards';
import { colors } from '../../../theme';
import { useQuestionStore } from '../../../store/useQuestionStore';
import { StackScreenProps } from '@react-navigation/stack';
import { useSimpleQuestion } from '../../../hooks/useSimpleQuestion';
import { setDoc, doc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore, getAuth } from '../../../config/firebaseConfig';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;

const auth = getAuth();

const YesDrawResultScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [cardImage, setCardImage] = useState(null);
    const [value, isLoading] = useSimpleQuestion(500);
    const [questionInformations, setQuestionInformations] = useQuestionStore();
    const currentUser = auth.currentUser;
    const userID = currentUser ? currentUser.uid : null;
    const choosedCard = CARD_DECK.find((card) => card.id === questionInformations.choosecardnumber);

    useEffect(() => {
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);


    function saveQuestion(useruid: string | any) {
        const db = firestore;
        if (!useruid) {
            console.error("User ID is null");
            return;
        }
        const usersCollectionRef = collection(db, 'users');
        const userQuestionsCollectionRef = collection(usersCollectionRef, useruid, 'yesquestions');
        const questionRef = doc(userQuestionsCollectionRef);

        setDoc(questionRef, {
            domain: questionInformations.domain,
            question: questionInformations.question,
            cardpseudo: questionInformations.choosecardpseudo,
            answer: questionInformations.answer,
            createdAt: serverTimestamp(),
        })
            .then(() => console.log('Question saved successfully!'))
            .catch((error) => console.error('Error saving question:', error));
        questionClosed();
    }



    const getContent = () => {
        if (isLoading) {
            return (
                <View style={styles.indicatorWrapper}>
                    <ActivityIndicator size="large" color={colors.palette.orange} style={styles.indicator} />
                    <Text style={styles.answerText}>
                        L'Iris Claire se concentre sur votre tirage
                    </Text>
                </View>
            );
        }
        //TODO : INCLURE UN TABLEAU POUR DES FINS DE PHRASES ALEATOIRES
        return `${questionInformations.answer}\n\n J'espère que cette réponse vous aidera à avancer dans votre vie. Si vous avez d'autres questions, n'hésitez pas à revenir vers moi. Je vous souhaite une bonne journée. L'Iris Claire.`;
    };

    function questionClosed() {
        setQuestionInformations({
            ...questionInformations,
            question: '',
            domain: '',
            choosecardnumber: 0,
            choosecardname: '',
            choosecardpseudo: '',
            answer: '',
        });
        navigation.navigate('Home');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} />

            <View style={styles.deckContainer}>
                <View style={styles.loadingContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.contentTitle}>Votre Tirage</Text>
                        <View style={styles.cardContainer}>
                            <View>
                                <Image
                                    style={styles.cardImage}
                                    source={choosedCard?.frontImageUrl}
                                />
                                <Text style={styles.pseudoTitle}>{choosedCard?.pseudo}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.resultView}>
                        <View style={styles.questionRow}>
                            <Text style={styles.questionTitle}>Votre question :</Text>
                            <Text style={styles.questionText}>{questionInformations.question}</Text>
                        </View>

                        <Text style={styles.answerTitle}>Votre réponse: </Text>
                        <Text style={styles.answerText} numberOfLines={0} lineBreakMode='clip'>{getContent()}</Text>
                    </View>
                </View>

                <View style={styles.validationButton}>
                    <View style={styles.buttonGroup}>
                        <Pressable style={styles.button} onPress={() => saveQuestion(userID)}>
                            <Text style={styles.buttonText}>Enregistrez</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={questionClosed}>
                            <Text style={styles.buttonText}>Ne Pas Enregistrer</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default YesDrawResultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        width: SCREEN_WIDTH - 5,
        height: SCREEN_HEIGHT * 0.4,
        borderBottomLeftRadius: SCREEN_WIDTH * 0.1,
        borderBottomRightRadius: SCREEN_WIDTH * 0.1,
        backgroundColor: colors.palette.violet,
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
    },
    // Domain Container
    deckContainer: {
        width: '95%',
        height: '95%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    contentTitle: {
        fontFamily: 'mulishRegular',
        fontSize: 14 * SCREEN_FONT_SCALE,
        color: colors.palette.ivory,
        textAlign: 'center',
    },
    cardContainer: {
        position: 'relative',
        top: 50,
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: 70,
        height: 130,
    },
    cardImage: {
        width: 70,
        height: 130,
        borderRadius: 10,
    },
    pseudoTitle: {
        fontFamily: 'oswaldMedium',
        fontSize: 10,
        color: colors.palette.ivory,
        textAlign: 'center',
    },
    resultView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '65%',
        backgroundColor: colors.palette.violetClair,
        borderRadius: 16,
        elevation: 3,
    },
    questionRow: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginHorizontal: 10,
        marginTop: 10,
    },
    questionTitle: {
        fontFamily: 'oswaldMedium',
        fontSize: 16,
        color: colors.palette.violet,
        textDecorationColor: colors.palette.violet,
        textDecorationLine: 'underline',
    },
    questionText: {
        width: '70%',
        flexWrap: 'wrap',
        marginHorizontal: 10,
        fontFamily: 'mulishRegular',
        fontSize: 16,
        color: colors.palette.violet,
        marginTop: 3,
    },
    answerTitle: {
        alignItems: 'center',
        paddingVertical: 10,
        marginLeft: 10,
        fontFamily: 'oswaldMedium',
        fontSize: 16,
        color: colors.palette.violet,
        textDecorationColor: colors.palette.violet,
        textDecorationLine: 'underline',
    },
    answerText: {
        width: '95%',
        marginHorizontal: 10,
        fontFamily: 'mulishRegular',
        fontSize: 16,
        color: colors.palette.violet,
        textAlign: 'justify',
    },
    validationButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        elevation: 5,
    },
    buttonGroup: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        width: '45%',
        backgroundColor: colors.palette.orange,
        marginTop: 10,
        borderRadius: 16,
    },
    buttonText: {
        textAlign: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        fontFamily: 'oswaldMedium',
        fontSize: 16,
        color: colors.palette.white,
    },
    //Loader
    indicatorWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    indicator: {
        marginBottom: 20,
    },
});
