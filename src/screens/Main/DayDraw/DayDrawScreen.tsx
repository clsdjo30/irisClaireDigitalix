import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ImageSourcePropType,
    Text,
    Pressable
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '../../../theme';
import { useDaydrawStore } from '../../../utils/hooks/useDayDrawStore';
import CARD_DECK from '../../../utils/cards';
import Card from '../../../components/Card';


const DayDrawScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
   
    const [daydraw, setDayDraw] = useDaydrawStore();
    const [showTendanceButton, setShowTendanceButton] = useState(false);
    const PAGE_WIDTH = Dimensions.get('window').width;
    const itemWidth = 80;
    const centerOffset = PAGE_WIDTH / 2 - itemWidth / 2;

    const [flippedCardIndex, setFlippedCardIndex] = React.useState(-1);
    const [isLoading, setIsLoading] = React.useState(false);

    // START FLIP ANIMATION
    const rotates = CARD_DECK.map(() => useSharedValue(0));



    //DISPLAY BACK CARD IMAGE
    const backCard: Array<ImageSourcePropType> = CARD_DECK.map((card) => {
        return card.backImageUrl;
    }
    );

    //DISPLAY FRONT CARD IMAGE
    const frontCard: ImageSourcePropType = CARD_DECK.map((card) => {
        return card.frontImageUrl;
    }
    );

    //START CAROUSEL ANIMATION
    const animationStyle = React.useCallback(
        (value: number) => {
            "worklet";

            const itemGap = interpolate(
                value,
                [-15, -10, -5, 0, 5, 10, 15],
                [-30, -15, -2, 0, 2, 15, 30],
            );

            const translateX
                = interpolate(value,
                    [-1, 0, 1],
                    [-itemWidth - 5, 0, itemWidth + 5])
                + centerOffset
                - itemGap;

            const translateY = interpolate(
                value,
                [-1, -0.5, 0, 0.5, 1],
                [80, 65, 70, 65, 80],
            );


            const rotate = interpolate(
                value,
                [-1, -0.7, 0, 0.7, 1],
                [-0.3, -0.2, 0, 0.2, 0.3],
            );


            return {
                transform: [
                    { translateX },
                    {
                        translateY,
                    },

                    { rotate: `${rotate}rad` },


                ],
            };
        },
        [],
    );

       // display card when click
         // display card when click

  const displayResult = () => {
    if (flippedCardIndex !== -1) {
        // choisir une phrase de tendance au hasard
        const newtendance = CARD_DECK[flippedCardIndex].tendance[Math.floor(Math.random() * CARD_DECK[flippedCardIndex].tendance.length)]
        setDayDraw({ ...daydraw, 
            daycard: CARD_DECK[flippedCardIndex].name, 
            daytendance: newtendance, 
            isdraw: true });
        
        navigation.navigate('DayDrawResult', { card: CARD_DECK[flippedCardIndex] });
    }
};

function goToResult() {
    navigation.navigate('TendanceResult');
}

const handleCardChange = (index: number) => {
  if (flippedCardIndex === -1) {
      setFlippedCardIndex(index);
      rotates[index].value = rotates[index].value ? 0 : 1;
    }
    const newtendance = CARD_DECK[index].tendance[Math.floor(Math.random() * CARD_DECK[index].tendance.length)]

    setDayDraw({ ...daydraw,
            daycard: CARD_DECK[index].name,
            daycardimage: CARD_DECK[index].frontImageUrl,
            daycardbackimage: CARD_DECK[index].backImageUrl,
            daytendance: newtendance,
            isdraw: true });
            setTimeout(() => {
    goToResult();
}, 1500);
};


   console.log(daydraw)

    return (

        <View style={styles.container}>
            <Carousel
                width={itemWidth / 1.2}
                height={itemWidth * 4}
                style={{
                    width: PAGE_WIDTH,
                    height: PAGE_WIDTH / 1,
                    position: 'absolute',
                    bottom: 40,
                }}
                loop
                autoPlay={false}
                autoPlayInterval={1000}
                data={backCard}
                renderItem={({ index }) => (
                    <View style={styles.deckContainer}>
                        {/*Back Card*/}
                        <Animated.View
                            style={[styles.frontcard,
                            useAnimatedStyle(() => {
                                const rotateValue = interpolate(
                                    rotates[index].value, [0, 1], [0, 180],
                                );
                                return {
                                    transform: [
                                        { rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }) }
                                    ]
                                }
                            })
                            ]}>
                            <Card
                                onPress={() => {
                                    {
                                        handleCardChange(index);
                                       
                                    }
                                }
                                }
                               
                                source={backCard[index]}
                            />
                        </Animated.View>
                        {/*Front Card*/}
                        <Animated.View
                            style={[
                                styles.backCard,
                                useAnimatedStyle(() => {
                                    const rotateValue = interpolate(
                                        rotates[index].value, [0, 1], [180, 360]
                                    );
                                    return {
                                        transform: [
                                            { rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }) }
                                        ],
                                    }
                                })
                            ]}
                        >
                            <Card
                                
                                onPress={() => {
                                    {
                                        handleCardChange(index);
                                       
                                    }
                                }}
                              
                                source={frontCard[index]}
                            />
                        </Animated.View>
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
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.palette.purple600,
        alignItems: 'center',
        justifyContent: 'center',

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
    frontcard: {
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
        bottom: 20,
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