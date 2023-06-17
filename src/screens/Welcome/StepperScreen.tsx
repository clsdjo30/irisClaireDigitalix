import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Animated,
    Image,
    Dimensions,
    Pressable
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import STEPPER from '../../utils/stepper';
import { colors } from '../../theme';

const { width, height } = Dimensions.get('screen');
const bgs = ['#423C7F', '#857FC3', '#564DA3', '#423C7F'];

const Backdrop = ({ scrollx }) => {
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

const Square = ({ scrollx }) => {
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

const Indicator = ({ srollx }) => {
    return (
        <View style={{ position: 'absolute', bottom: 150, flexDirection: 'row' }}>
            {STEPPER.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const scale = srollx.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.4, 0.8],
                    extrapolate: 'clamp'
                })
                const opacity = srollx.interpolate({
                    inputRange,
                    outputRange: [0.4, 0.8, 0.4],
                    extrapolate: 'clamp'
                })
                return (
                    <Animated.View
                        key={`indicator-${i}`}
                        style={{

                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            backgroundColor: colors.palette.violetBg,
                            opacity,
                            margin: 10,
                            transform: [
                                {
                                    scale
                                }
                            ]
                        }}
                    />
                )
            })}
        </View>
    )
}

const StepperScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const scrollx = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <Backdrop scrollx={scrollx} />
            <Square scrollx={scrollx} />
            <Animated.FlatList
                data={STEPPER}
                keyExtractor={(item) => item.key}
                horizontal
                contentContainerStyle={{ paddingBottom: 100 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={32}
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollx } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width, alignItems: 'center' }}>
                            <View style={{ flex: .8, justifyContent: 'center' }}>
                                <Image
                                    source={item.image}
                                    style={{
                                        width: width / 1.5,
                                        height: width / 1.5,
                                        resizeMode: "contain",
                                        borderRadius: 16,
                                        marginBottom:90,
                                    }}
                                />
                            </View>
                            <View style={{ flex: 0.4, marginHorizontal: 16 }}>
                                <Text
                                    style={{
                                        fontFamily: "mulishBold",
                                        fontSize: 22,
                                        marginBottom: 10,
                                        color: colors.palette.violetClair
                                    }}
                                >
                                    {item.title}
                                </Text>
                                <Text style={{
                                    fontFamily: "mulishLight",
                                    fontSize: 15,
                                    color: colors.palette.violetClair
                                }}>
                                    {item.description}
                                </Text>

                            </View>
                        </View>
                    )
                }
                }
            />
            <Indicator srollx={scrollx} />
            <View style={styles.blockButton}>
                <Pressable style={styles.button} onPress={() => navigation.navigate('FirstName')}>
                    <Text style={styles.buttonText}>
                        S'inscrire
                    </Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>
                        Se Connecter
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default StepperScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    blockButton: {
        position: 'absolute',
        bottom: 30,
    },
    button: {
        width: 300,
        backgroundColor: colors.palette.orange,
        marginBottom: 10,
        borderRadius: 16,
        alignItems: "center",
        paddingVertical: 5,
    },
    buttonText: {
        fontFamily: "mulishBold",
        fontSize: 14,
        color: colors.palette.violetClair,
    },
})