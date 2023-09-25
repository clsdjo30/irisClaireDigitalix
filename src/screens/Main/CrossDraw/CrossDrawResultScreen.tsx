import React, { useState } from 'react'
import {
    StyleSheet,
    Image,
    View,
    Pressable,
    Text,
    Dimensions,
    ScrollView,
    ActivityIndicator

} from 'react-native';
import CARD_DECK from '../../../data/cards';
import { colors } from '../../../theme';
import { StackScreenProps } from '@react-navigation/stack';
import { useCrossQuestionStore } from '../../../hooks/useCrossQuestionStore';
import { useCrossQuestion } from '../../../hooks/useCrossQuestion';
import { setDoc, doc, collection } from 'firebase/firestore';
import { firestore, getAuth } from '../../../config/firebaseConfig';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;

const auth = getAuth();

const CrossDrawResultScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {

    const [cardImage, setCardImage] = useState(null);
    const [value, isLoading] = useCrossQuestion(1000);
    const [questionInformations, setQuestionInformations] = useCrossQuestionStore()
    const currentUser = auth.currentUser;
    const userID = currentUser ? currentUser.uid : null;

    // console.log('Valeur de QuestionStore', questionInformations)


    const firstCard = CARD_DECK.find(card => card.id === questionInformations.choosecardnumber);
    const secondCard = CARD_DECK.find(card => card.id === questionInformations.choosecardtwonumber);
    const thirdCard = CARD_DECK.find(card => card.id === questionInformations.choosecardthreenumber);
    const fourthCard = CARD_DECK.find(card => card.id === questionInformations.choosecardfournumber);
    const fithCard = CARD_DECK.find(card => card.id === questionInformations.choosecardfivenumber);

    function saveCrossQuestion(useruid: string | any) {
        const db = firestore;
        if (!useruid) {
            console.error("User ID is null");
            return;
        }
        const usersCollectionRef = collection(db, 'users');
        const userQuestionsCollectionRef = collection(usersCollectionRef, useruid, 'crossquestions');
        const questionRef = doc(userQuestionsCollectionRef);

        setDoc(questionRef, {
            domain: questionInformations.domain,
            question: questionInformations.question,
            cardpseudoone: questionInformations.choosecardpseudo,
            cardpseudotwo: questionInformations.choosecardtwopseudo,
            cardpseudothree: questionInformations.choosecardthreepseudo,
            cardpseudofour: questionInformations.choosecardfourpseudo,
            cardpseudofive: questionInformations.choosecardfivepseudo,
            answer: questionInformations.answer,
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
            )

        }
        return `${questionInformations.answer}`;
    };



    function questionClosed() {
        setQuestionInformations({
            ...questionInformations,
            question: "",
            domain: "",
            answer: "",
            choosecardnumber: 0,
            choosecardtwonumber: 0,
            choosecardthreenumber: 0,
            choosecardfournumber: 0,
            choosecardfivenumber: 0,
            choosecardname: "",
            choosecardtwoname: "",
            choosecardthreename: "",
            choosecardfourname: "",
            choosecardfivename: "",
            choosecardpseudo: "",
            choosecardtwopseudo: "",
            choosecardthreepseudo: "",
            choosecardfourpseudo: "",
            choosecardfivepseudo: "",
        })
        navigation.navigate('Home')
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
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
                                    source={firstCard?.frontImageUrl}
                                />
                                <Text style={styles.pseudoTitle}>{firstCard?.pseudo}</Text>
                            </View>
                            <View>
                                <Image
                                    style={styles.cardImage}
                                    source={secondCard?.frontImageUrl}
                                />
                                <Text style={styles.pseudoTitle}>{secondCard?.pseudo}</Text>
                            </View>
                            <View>
                                <Image
                                    style={styles.cardImage}
                                    source={thirdCard?.frontImageUrl}
                                />
                                <Text style={styles.pseudoTitle}>{thirdCard?.pseudo}</Text>
                            </View>

                            <View>
                                <Image
                                    style={styles.cardImage}
                                    source={fourthCard?.frontImageUrl}
                                />
                                <Text style={styles.pseudoTitle}>{fourthCard?.pseudo}</Text>
                            </View>
                            <View>
                                <Image
                                    style={styles.cardImage}
                                    source={fithCard?.frontImageUrl}
                                />
                                <Text style={styles.pseudoTitle}>{fithCard?.pseudo}</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView style={styles.resultView}>
                        <View style={styles.questionRow}>
                            <Text style={styles.questionTitle}>Votre question :</Text>
                            <Text style={styles.questionText}>{questionInformations.question}</Text>
                        </View>

                        <Text style={styles.answerTitle}>Votre réponse: </Text>
                        <Text style={styles.answerText} numberOfLines={0} lineBreakMode='clip'>
                            {getContent()}
                        </Text>
                    </ScrollView>
                </View>

                <View style={styles.validationButton}>
                    <Pressable style={styles.button} onPress={() => saveCrossQuestion(userID)}>
                        <Text style={styles.buttonText}>Revenir à l'accueil</Text>
                    </Pressable>
                </View>

            </View>


        </View >
    )
}

export default CrossDrawResultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: colors.palette.violetBg,
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
        backgroundColor: colors.palette.violet
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
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
    },
    cardImage: {
        width: SCREEN_WIDTH * 0.18,
        height: SCREEN_HEIGHT * 0.22,
        
    },
    pseudoTitle: {
        fontFamily: "oswaldMedium",
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
        fontFamily: "oswaldMedium",
        fontSize: 16,
        color: colors.palette.violet,
        textDecorationColor: colors.palette.violet,
        textDecorationLine: 'underline',
    },
    questionText: {
        width: '70%',
        flexWrap: 'wrap',
        marginHorizontal: 10,
        fontFamily: "mulishRegular",
        fontSize: 16,
        color: colors.palette.violet,
        marginTop: 3,
    },
    answerTitle: {
        alignItems: "center",
        paddingVertical: 10,
        marginLeft: 10,
        fontFamily: "oswaldMedium",
        fontSize: 16,
        color: colors.palette.violet,
        textDecorationColor: colors.palette.violet,
        textDecorationLine: 'underline',
    },
    answerText: {
        width: '95%',
        marginHorizontal: 10,
        fontFamily: "mulishRegular",
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
})