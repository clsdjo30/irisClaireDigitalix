import React from 'react';
import { Dimensions, StyleSheet, Animated} from 'react-native';
import { bgs } from '../../theme';

const { width, height } = Dimensions.get('screen');

interface BackdropsProps {
    scrollx: Animated.Value
}

const Backdrop: React.FC<BackdropsProps> = ({ scrollx }) => {
    const bg = scrollx.interpolate({
        inputRange: bgs.map((_, i) => i * width),
        outputRange: bgs.map((bg) => bg)
    })
    return (
        <Animated.View
            style={[StyleSheet.absoluteFillObject, {
                backgroundColor: bg
            }]}
        />
    )
}

export default Backdrop;    