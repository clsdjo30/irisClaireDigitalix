import React, { useRef, useEffect, useState } from 'react'
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
import { useSimpleQuestion } from '../../../utils/hooks/useSimpleQuestion';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;

const YesDrawResultScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [value, setValue] = useQuestionStore();
    const userQuestion = value.question;
    const cardNumber = value.choosecardnumber;
    const cardName = value.choosecardname;
    const [cardImage, setCardImage] = useState(null);
   
    //   useSimpleQuestion(userQuestion, cardNumber, cardName, 500);

    // const  displayCardImage = (cardNumber: number| null) => {
    //     if (cardNumber != null) {
           
    //         return setCardImage(CARD_DECK[cardNumber].frontImageUrl);
    //     }
    //     else {
    //         return null;
    //     }
    //   }

     
// console.log(displayCardImage(value.choosecardnumber))
      console.log(value);
      console.log(value.answer);
      console.log(value.choosecardnumber);




    return (
        <LinearGradient
            // Card Linear Gradient
            colors={[colors.palette.purple600, colors.palette.purple500]}
            style={styles.container}>


            <View style={styles.deckContainer}>
                <Text style={styles.contentTitle}>Resultat de la question</Text>

                {/* {displayCardImage != null && <Image source={} style={{ width: 60, height: 120, borderRadius: 10, }}>{value.choosecard}</Image>} */}
                {/* {value.answer != null && <Text style={styles.contentTitle}>{value.answer}</Text>} */}



            </View>


        </LinearGradient >
    )
}

export default YesDrawResultScreen;

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
        zIndex: 1,
        width: 60,
        height: 120,
        margin: 5,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: colors.palette.purple100,
        alignItems: 'center',

    },
    cardDraw: {
        transform: [{ scale: 2 }],
    },
    validationButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        width: '80%',
        backgroundColor: "#CBA135",
        marginTop: 10,
        borderRadius: 16,
    },
    buttonText: {
        textAlign: "center",
        alignItems: "center",
        paddingVertical: 10,
        fontFamily: "oswaldMedium",
        fontSize: 14,
        color: colors.palette.ivory,
    },
})