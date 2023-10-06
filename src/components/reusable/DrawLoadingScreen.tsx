import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, BackHandler } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_SCALE } from '../../utils/constants';
import { colors } from '../../theme';
import { useCrossQuestionStore } from '../../store/useCrossQuestionStore';
import { useCrossQuestion } from '../../hooks/useCrossQuestion';
import CARD_DECK from '../../data/cards';

const LoadingScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [value] = useCrossQuestion(1000);

    const [question] = useCrossQuestionStore();
    const firstCard = CARD_DECK.find(card => card.id === question.choosecardnumber);
    const secondCard = CARD_DECK.find(card => card.id === question.choosecardtwonumber);
    const thirdCard = CARD_DECK.find(card => card.id === question.choosecardthreenumber);
    const fourthCard = CARD_DECK.find(card => card.id === question.choosecardfournumber);
    const fithCard = CARD_DECK.find(card => card.id === question.choosecardfivenumber);

    
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

    useEffect(() => {
        if (question.isanswered === true) {
            navigation.navigate('DrawResult');
        }
    }, [question.isanswered, navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.contentTitle}>Vous avez tiré les cartes suivantes</Text>
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
            <View style={styles.loaderContainer}>
                <LottieView
                    autoPlay
                    style={{
                        width: SCREEN_WIDTH * 0.15,
                        height: SCREEN_HEIGHT * 0.15,
                        backgroundColor: '#423C7F',
                    }}
                    // Find more Lottie files at https://lottiefiles.com/featured
                    source={require('../../../assets/lottie/circle.json')}
                />
                <Text style={styles.text}>Iris Claire se concentre sur votre tirage</Text>
            </View>
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
    cardContainer: {
        position: 'relative',
        top: 0,
        width: SCREEN_WIDTH,
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    cardImage: {
        width: SCREEN_WIDTH * 0.176,
        height: SCREEN_HEIGHT * 0.165,

    },
    pseudoTitle: {
        fontFamily: "oswaldMedium",
        fontSize: 10,
        color: colors.palette.ivory,
        textAlign: 'center',
    },
    contentTitle: {
        position: 'relative',
        top: 0,
        fontFamily: "mulishRegular",
        fontSize: SCREEN_SCALE * 7,
        color: colors.palette.ivory,
        textAlign: 'center',
    },
    loaderContainer: {
        position: 'relative',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        width: SCREEN_WIDTH / 2,
        textAlign: 'center',
        fontFamily: "mulishLight",
        fontSize: 18,
        color: colors.palette.violetClair,
    },
});

export default LoadingScreen;
