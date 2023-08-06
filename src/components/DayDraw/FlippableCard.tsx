// FlippableCard.tsx
import React, { useEffect} from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate } from 'react-native-reanimated';
import Card from '../Card';
import { ImageSourcePropType, ViewStyle } from 'react-native';

type FlippableCardProps = {
    source: ImageSourcePropType,
    onPress: () => void,
    flipped: boolean,
    isBackCard: boolean,
    style?: ViewStyle | ViewStyle[]
};

const FlippableCard: React.FC<FlippableCardProps> = ({ source, onPress, flipped, isBackCard, style }) => {
    const rotate = useSharedValue(flipped ? 1 : 0);

    useEffect(() => {
        rotate.value = flipped ? 1 : 0;
    }, [flipped]);

    const animatedStyles = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 1], isBackCard ? [180, 360] : [0, 180]);
        return {
            transform: [
                { rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }) }
            ]
        };
    });

    return (
        <Animated.View  style={[animatedStyles, style]}>
            <Card onPress={onPress} source={source} />
        </Animated.View>
    );
};

export default FlippableCard;
