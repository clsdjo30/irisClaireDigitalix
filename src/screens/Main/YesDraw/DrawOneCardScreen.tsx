
import React, { useRef } from 'react'
import {
    StyleSheet,
    Image,
    View,
    Pressable,
    Text,
    Dimensions,

} from 'react-native';
import CARD_DECK from '../../../utils/cards';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../theme';
import { useQuestionStore } from '../../../utils/hooks/useQuestionStore';
import { StackScreenProps } from '@react-navigation/stack';



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;

const DrawOneCardScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [value, setValue] = useQuestionStore();

    console.log(value)

    return (
        <LinearGradient
            // Card Linear Gradient
            colors={[colors.palette.purple600, colors.palette.purple500]}
            style={styles.container}>
           
            <View style={styles.deckContainer}>
                <Text style={styles.contentTitle}>Concentrez-vous sur votre question et tirez votre carte</Text>
                {CARD_DECK.map((item, index) => {
                    return (
                        <Pressable
                            key={index}
                            onPress={() => { setValue({ ...value, choosecardname: item.name, choosecardpseuso: item.pseudo }) }}
                            style={styles.cardContainer}
                        >

                            <Image source={item.backImageUrl} style={styles.cardSize} />
                        </Pressable>
                    )
                })}
            </View>



        </LinearGradient >
    )
}

export default DrawOneCardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: colors.palette.outterSpace,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Domain Container
    deckContainer: {
        width: "95%",
        height: "95%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',


    },
    contentTitle: {
        fontFamily: "mulishRegular",
        fontSize: 14 * SCREEN_FONT_SCALE,
        color: colors.palette.ivory,
        marginBottom: 10,
        textAlign: 'center',
    },
    cardContainer: {
        width: 60,
        height: 120,
        margin: 5,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: colors.palette.purple100,
        alignItems: 'center',

    },
    cardSize: {
        width: 60,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
    }
})