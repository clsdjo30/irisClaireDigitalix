// DayDrawScreen.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageSourcePropType, Text } from 'react-native';
import { interpolate, useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '../../../theme';
import { useDaydrawStore } from '../../../hooks/useDayDrawStore';
import CARD_DECK from '../../../data/cards';
import FlippableCard from '../../../components/DayDraw/FlippableCard';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../utils/constants';
import { useUserInformation } from '../../../hooks/useUserInformations';
import WelcomeDaydrawModal from '../../../components/reusable/WelcomeDaydawModal';

const DayDrawScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [daydraw, setDayDraw] = useDaydrawStore();
    const [showTendanceButton, setShowTendanceButton] = useState(false);
    const itemWidth = 80;
    const centerOffset = SCREEN_WIDTH / 2 - itemWidth / 2;
    const [flippedCardIndex, setFlippedCardIndex] = React.useState(-1);
    //DISPLAY BACK CARD IMAGE
    const backCard: Array<ImageSourcePropType> = CARD_DECK.map((card) => card.backImageUrl);
    //DISPLAY FRONT CARD IMAGE
    const frontCard: ImageSourcePropType = CARD_DECK.map((card) => card.frontImageUrl);
    const { user, updateHasSeenModal } = useUserInformation();
    const [isModalVisible, setModalVisible] = useState(false);

    //START CAROUSEL ANIMATION
    const animationStyle = React.useCallback(
        (value: number) => {
            "worklet";

            const itemGap = interpolate(
                value,
                [-15, -10, -5, 0, 5, 10, 15],
                [-30, -15, -2, 0, 2, 15, 30],
            );

            const translateX = interpolate(value, [-1, 0, 1], [-itemWidth - 5, 0, itemWidth + 5]) + centerOffset - itemGap;
            const translateY = interpolate(value, [-1, -0.5, 0, 0.5, 1], [90, 65, 70, 65, 80]);
            const rotate = interpolate(value, [-1, -0.7, 0, 0.7, 1], [-0.3, -0.2, 0, 0.2, 0.3]);

            return {
                transform: [
                    { translateX },
                    { translateY },
                    { rotate: `${rotate}rad` },
                ],
            };
        },
        [],
    );

    useEffect(() => {
        if (user?.hasSeenModal === false) {
            setModalVisible(true);
        }

    }, []);

    const selectCard = (index: number) => {
        const newtendance = CARD_DECK[index].tendance[Math.floor(Math.random() * CARD_DECK[index].tendance.length)];

        setDayDraw({
            ...daydraw,
            daycard: CARD_DECK[index].pseudo,
            daycardimage: CARD_DECK[index].frontImageUrl,
            daycardbackimage: CARD_DECK[index].backImageUrl,
            daytendance: newtendance,
            isdraw: true
        });

        setTimeout(() => {
            navigation.navigate('TendanceResult');
        }, 1500);
    };

    const handleCardChange = (index: number) => {
        if (flippedCardIndex === -1) {
            setFlippedCardIndex(index);
        } else {
            setFlippedCardIndex(-1);
        }
        selectCard(index);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Tirage du jour</Text>
            </View>

            <Carousel
                width={itemWidth / 1.2}
                height={itemWidth * 4}
                style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_WIDTH / 1,
                    position: 'relative',
                    top: 140,
                }}
                loop
                autoPlay={false}
                autoPlayInterval={1000}
                data={backCard}
                renderItem={({ index }) => (
                    <View style={styles.deckContainer}>
                        {/*Back Card*/}
                        <FlippableCard
                            source={backCard[index]}
                            onPress={() => handleCardChange(index)}
                            flipped={flippedCardIndex === index}
                            style={styles.frontCard}
                            isBackCard={false}
                        />
                        {/*Front Card*/}
                        <FlippableCard
                            source={frontCard[index]}
                            onPress={() => handleCardChange(index)}
                            flipped={flippedCardIndex === index}
                            style={styles.backCard}
                            isBackCard={true}
                        />
                    </View>
                )}
                customAnimation={animationStyle}
            />
            {showTendanceButton && (
                <Text style={styles.tendanceButtonText}>{daydraw.daytendance}</Text>
            )}
            <View style={styles.choiceButton}>
                <Text style={styles.tendanceButtonText}>Choisissez votre Carte</Text>
            </View>
            
            <WelcomeDaydrawModal
                visible={isModalVisible}
                onValidate={() => {
                    setModalVisible(!isModalVisible);
                }}
                modalTitle="Tirage du jour"
                modalSubTitle="Découvrez la tendance de votre journée"
                modalExplain="Chaque jour, une carte vous est attribuée. Cette carte vous permet de connaitre la tendance de votre journée."
                modalContent="Pour cela, choisissez une carte et découvrez la tendance de votre journée."
                buttonText="Je découvre ma tendance"
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: colors.palette.violet
    },
    titleContainer: {
        position: 'absolute',
        top: 0,
        width: SCREEN_WIDTH - 5,
        height: SCREEN_HEIGHT * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.palette.white,
    },
    deckContainer: {
        width: 80,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 10,
    },
    frontCard: {
        position: "absolute",
        backfaceVisibility: 'hidden',

    },
    backCard: {
        backfaceVisibility: "hidden",
    },
    button: {
        position: 'absolute',
        bottom: 20,
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    tendanceButton: {
        width: 300,
        backgroundColor: "#CBA135",
        marginBottom: 10,
        borderRadius: 16,
        alignItems: "center",
        paddingVertical: 5,
    },
    choiceButton: {
        position: 'absolute',
        bottom: 40,
        width: 300,
        backgroundColor: "#CBA135",
        marginBottom: 10,
        borderRadius: 16,
        alignItems: "center",
        paddingVertical: 5,
    },
    tendanceButtonText: {
        fontFamily: "oswaldRegular",
        fontSize: 14,
        color: colors.palette.ivory,
    }

});

export default DayDrawScreen;