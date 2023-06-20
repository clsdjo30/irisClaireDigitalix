import React from 'react';
import { Animated, Dimensions } from 'react-native';
import { colors } from '../../theme';
const { width, height } = Dimensions.get('screen');

interface SquareProps {
    scrollx: Animated.Value
}

const Square: React.FC<SquareProps> = ({ scrollx }) => {
    const YOLO = Animated.modulo(
        Animated.divide(
            Animated.modulo(scrollx, width),
            new Animated.Value(width)
        ),
        1
    )
    const rotate = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['40deg', '0deg', '40deg']
    })
    const translateX = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -height, 0]
    })
    return (
        <Animated.View
            style={{
                width: height,
                height: height,
                backgroundColor: colors.palette.violet,
                borderRadius: 86,
                position: 'absolute',
                top: -height * 0.65,
                left: -height * 0.3,
                transform: [{
                    rotate
                },
                {
                    translateX
                }
                ]
            }}
        />
    )
}

export default Square;

