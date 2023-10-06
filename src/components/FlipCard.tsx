// FlipCard.tsx
import React, { useRef } from 'react';
import { Image, Pressable, ImageSourcePropType, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { cardImageStyle } from '../theme/flipStyles';
import useFlipAnimation from '../hooks/useFlipAnimation';

type CardProps = {
    frontImageUrl: ImageSourcePropType,
    backImageUrl: ImageSourcePropType,
    onFlip?: () => void,
    style?: ViewStyle,
    isClickable?: boolean
}

const FlipCard: React.FC<CardProps> = ({ frontImageUrl, backImageUrl, onFlip, style, isClickable = true }) => {
    const { isFlipped, flipCard, flip, scale, up, left } = useFlipAnimation();
    const frontImageRef = useRef<Image>(null);
    const backImageRef = useRef<Image>(null);

    const flipCardAndNotify = () => {
        if (!isClickable) return; // Prevents the card from being flipped when it is not clickable
        flipCard();
        if (onFlip) {
            onFlip();
        }
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: left.value },
                { translateY: up.value },
                { rotateY: `${flip.value}deg` },
                { scale: scale.value },
                { perspective: 1000 },
            ]
        };
    });

    return (
        <Pressable testID="flipCard" onPress={flipCardAndNotify} disabled={!isClickable}>
            <Animated.View style={[cardImageStyle.cardImage, animatedStyle, style]}>
                <Image
                    testID={isFlipped ? "backImage" : "frontImage"}
                    ref={isFlipped ? backImageRef : frontImageRef}
                    source={isFlipped ? frontImageUrl : backImageUrl}
                    style={cardImageStyle.image}
                    onLoad={() => {
                        frontImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: isFlipped ? -1 : 1 }] } });
                        backImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: isFlipped ? -1 : 1 }] } });
                    }}
                />
            </Animated.View>
        </Pressable>
    );
};

export default FlipCard;
