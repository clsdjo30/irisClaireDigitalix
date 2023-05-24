import React, { useState } from 'react';
import { Animated, View, Text, TouchableWithoutFeedback } from 'react-native';

const FlipCard = (card: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = new Animated.Value(0);

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 1,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }

    setIsFlipped(!isFlipped);
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={flipCard}>
        <Animated.View style={frontAnimatedStyle}>
          {/* Display the front of the card */}
          <Text>{card}</Text>
        </Animated.View>
        <Animated.View style={backAnimatedStyle}>
          {/* Display the back of the card */}
          <Text>{card}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};
