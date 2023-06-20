import React from 'react'
import { View, Animated, Dimensions } from 'react-native'
import { colors } from '../../theme'
import STEPPER from '../../utils/stepper'

const { width } = Dimensions.get('screen')


interface IndicatorProps {
    scrollx: Animated.Value
}

const Indicator: React.FC<IndicatorProps> = ({ scrollx }) => {
    return (
        <View style={{ position: 'absolute', bottom: 150, flexDirection: 'row' }}>
            {STEPPER.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const scale = scrollx.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.4, 0.8],
                    extrapolate: 'clamp'
                })
                const opacity = scrollx.interpolate({
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

export default Indicator