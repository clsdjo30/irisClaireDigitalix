// FlipCard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Image, Pressable, View, ImageSourcePropType, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors } from '../theme/color';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/constants';

type CardProps = {
    frontImageUrl: Array<ImageSourcePropType>,
    backImageUrl: Array<ImageSourcePropType>,
    onFlip?: () => void,
    style?: ViewStyle
}

const FlipCard: React.FC<CardProps> = ({ frontImageUrl, backImageUrl, onFlip, style }) => {
    // On utilise useState pour gérer l'état "flip" de la carte.
    const [isFlipped, setIsFlipped] = useState(false);
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const frontImageRef = useRef<Image>(null);
    const backImageRef = useRef<Image>(null);
    // On utilise useSharedValue de react-native-reanimated pour animer le flip de la carte.
    const flip = useSharedValue(0);
    const scale = useSharedValue(1);
    const up = useSharedValue(0);
    const left = useSharedValue(0);

    useEffect(() => {
        if (isCardFlipped) {
            frontImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: -1 }] } });
            backImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: -1 }] } });
        } else {
            frontImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: 1 }] } });
            backImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: 1 }] } });
        }
    }, [isCardFlipped]);

    // La fonction flipCard inverse l'état flip de la carte et déclenche l'animation.
    const flipCard = () => {
        if (!isFlipped) { // only allow flipping to front side
            setIsFlipped(true);
            flip.value = withTiming(180, { duration: 1200 });
            scale.value = withTiming(2, { duration: 1200 }, () => { scale.value = withTiming(1, { duration: 1200 }) });
            left.value = withTiming(-30, { duration: 1200 }, () => { left.value = withTiming(0, { duration: 1200 }) });
            up.value = withTiming(-80, { duration: 1200 }, () => { up.value = withTiming(0, { duration: 1200 }) });
            if (onFlip) { // make sure onFlip is not undefined before calling it
                onFlip();
            }
        }
    };

    // On utilise useAnimatedStyle pour créer des styles animés pour la carte.
    const animatedStyle = useAnimatedStyle(() => {
        return {
            // On anime la propriété rotateY pour créer l'effet de flip.
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
        <Pressable onPress={flipCard}>
            <Animated.View style={[styles.cardImage, animatedStyle, style]}>
                <Image
                    ref={isFlipped ? backImageRef : frontImageRef}
                    source={isFlipped ? frontImageUrl as ImageSourcePropType : backImageUrl as ImageSourcePropType}
                    style={styles.image}
                    onLoad={() => {
                        frontImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: isFlipped ? -1 : 1 }] } });
                        backImageRef.current?.setNativeProps({ style: { transform: [{ scaleX: isFlipped ? -1 : 1 }] } });
                    }}
                />
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cardImage: {
        width: SCREEN_WIDTH / 6,
        height: SCREEN_HEIGHT / 5,
        margin: 5,
        justifyContent: 'center',
        zIndex: 0,
        borderRadius: 10,
        elevation: 3,
        shadowColor: colors.palette.violetClair,
    },
    image: {
        width: SCREEN_WIDTH / 6,
        height: SCREEN_HEIGHT / 5,
        resizeMode: 'cover',
        borderRadius: 6,
    },
});

export default FlipCard;
