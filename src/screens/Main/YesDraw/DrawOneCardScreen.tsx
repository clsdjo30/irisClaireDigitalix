import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Image,
    View,
    Pressable,
    Text,
    Dimensions,
    Modal,
    Alert,
} from 'react-native';
import CARD_DECK from '../../../utils/cards';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../theme';
import { useQuestionStore } from '../../../utils/hooks/useQuestionStore';
import { StackScreenProps } from '@react-navigation/stack';
import FlipCard from 'react-native-flip-card';



// Dimensions de l'écran
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 1;
const CARD_WIDTH = 60;
const CARD_HEIGHT = 120;

const DrawOneCardScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [value, setValue] = useQuestionStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [credit, setCredit] = useState(2);
    const [clickable, setClickable] = useState(true);
    const [isCardFlipped, setIsCardFlipped] = useState(false);
   
    
  

    function sendQuestion() {
        // TODO implementer la logique de validation avec credit
        if (credit > 0
            && value.question != null
            && value.choosecardname != null
            && value.choosecardnumber != null
            && value.choosecardpseuso != null
        ) {
            setCredit(credit - 1)
            navigation.navigate('YesDrawResult')
        }
        else {
            goBuyCredit()
        }
        
    }
   

    function goBuyCredit() {
        navigation.navigate('Profil')
        //reinitialise la navigation de YesStack
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
    }

    console.log(value);
    return (
        <LinearGradient
            // Card Linear Gradient
            colors={[colors.palette.purple600, colors.palette.purple500]}
            style={styles.container}>

            <View style={styles.deckContainer}>
                <Text style={styles.contentTitle}>Concentrez-vous sur votre question et tirez votre carte</Text>
                {CARD_DECK.map((item, index) => {
                    return (
                        <View key={index} style={styles.cardContainer}>
                            <FlipCard
                                friction={20}
                                perspective={1000}
                                flipHorizontal={true}
                                flipVertical={false}
                                flip={false}
                                clickable={clickable}
                                useNativeDriver={true}
                                onFlipStart={() => {
                                    setValue({
                                        ...value,
                                        choosecardnumber: item.id,
                                        choosecardname: item.name,
                                        choosecardpseuso: item.pseudo
                                    }),
                                        setClickable(false),
                                        setIsCardFlipped(true)
                                }}
                                onFlipEnd={() =>
                                    setTimeout(() => {
                                        setModalVisible(true)
                                    }, 1000)}
                               
                            >
                                <View style={[styles.cardImage, (isCardFlipped ===true) && {zIndex: 0}]}>
                                    <Image source={item.backImageUrl} style={styles.cardImage} />
                                </View>
                                <View >
                                    <Image source={item.frontImageUrl} 
                                    style={ [styles.cardImage, (isCardFlipped === true) &&  styles.cardDraw, ]}  />
                                </View>
                            </FlipCard>
                        </View>
                    )
                })}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {/* TODO implementer la logique de validation avec credit  */}
                            {credit > 0
                                ?
                                <>
                                    <Text style={styles.modalText}>Utilez 1 credit pour voir votre reponse</Text>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={sendQuestion}>
                                        <Text style={styles.textStyle}>Voir votre résultat</Text>
                                    </Pressable>
                                </>
                                :
                                <>
                                    <Text style={styles.modalText}>Vous n'avez plus de credit disponible </Text>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={goBuyCredit}>
                                        <Text style={styles.textStyle}>Acheter des credits</Text>
                                    </Pressable>
                                </>
                            }
                        </View>
                    </View>
                </Modal>
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
        fontSize: 18,
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
    flipCardContainer:{
        display: "none"
    },
    cardImage: {
        width: 60, 
        height: 120, 
        resizeMode: 'cover', 
        borderRadius: 10
    },
    cardDraw: {
        transform: [
            { scale: 1.3 },
            
           
        ],
        zIndex: 999,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})