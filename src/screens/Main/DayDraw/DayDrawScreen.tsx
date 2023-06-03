import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageSourcePropType,
  Text,
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
    const [selectedCard, setSelectedCard] = useState('');
    const [tendance, setTendance] = useState('');
    const [daydraw, setDayDraw] = useDaydrawStore();
    
    const PAGE_WIDTH = Dimensions.get('window').width;
    const itemWidth = 80;
    const centerOffset = PAGE_WIDTH / 2 - itemWidth / 2;
    
    const [flippedCardIndex, setFlippedCardIndex] = React.useState(-1);
    
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
                  [-itemWidth - 70, 0, itemWidth + 70])
              + centerOffset
              - itemGap;

          const translateY = interpolate(
              value,
              [-1, -0.8, 0, 0.8, 1],
              [85, 70, 55, 60, 75],
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

  const handleCardChange = (index: number) => {
      if (flippedCardIndex === -1) {
          setFlippedCardIndex(index);
          rotates[index].value = rotates[index].value ? 0 : 1;
        }
  };
    
  


  return (

    <View style={styles.container}>
  <Carousel
                width={itemWidth / 1.2}
                height={itemWidth * 8}
                style={{
                    width: PAGE_WIDTH,
                    height: PAGE_WIDTH / 1,
                    position: 'absolute',
                    bottom: 0,
                    

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
                                        ]
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
            <View style={styles.button}>
                <Text style={styles.buttonText}>Choisissez votre Carte</Text>
            </View>
                
            
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.purple500,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  deckContainer: {
    width: 120,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    bottom: -30,
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
}

});

export default DayDrawScreen;