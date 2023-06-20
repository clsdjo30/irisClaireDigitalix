import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    Dimensions,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import STEPPER from '../../utils/stepper';
import { colors } from '../../theme';
import NavigationButotn from '../../components/NavigationButton';
import Backdrop from '../../components/animation/Backdrop';
import Indicator from '../../components/animation/Indicator';
import Square from '../../components/animation/Square';

const { width, height } = Dimensions.get('screen');


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
            <Indicator scrollx={scrollx} />
            <View style={styles.blockButton}>
                <NavigationButotn
                    title="S'inscrire"
                    onPress={() => navigation.navigate('FirstName')}
                />
                <NavigationButotn
                    title="Se Connecter"
                    onPress={() => navigation.navigate('Login')}
                />
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
})