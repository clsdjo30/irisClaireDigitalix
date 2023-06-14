
import React, { useRef } from 'react'
import {
    StyleSheet,
    Image,
    View,
    Pressable,
    Text,
    Dimensions
} from 'react-native';
import { colors } from '../../../theme';
import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

// import icons
const love = require('../../../../assets/icons/domainIcon/heart_icon.png');
const money = require('../../../../assets/icons/domainIcon/gold_chest.png');
const work = require('../../../../assets/icons/domainIcon/briefcase.png');
const general = require('../../../../assets/icons/domainIcon/general_icon.png');

interface YesDrawScreenProps {
    navigation: any;
}

interface YesDrawScreenState {
    value: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;


const BuyIrisScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {



    return (
        <View style={styles.container}>

            <View style={styles.header} />
            <View style={styles.titleCredit}>
                <View style={styles.explainCredit}>
                    <Text style={styles.contentTitle}>Credits</Text>
                    <Text style={styles.textCredit}>1 Crédit = 1 Question Oui/Non</Text>
                    <Text style={styles.textCredit}>3 Crédits = 1 Tirage Complet</Text>
                </View>
            </View>
            <View style={styles.domainsContainer}>
                <LinearGradient
                    colors={[colors.palette.violetClair, colors.palette.violetBg]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0.1, 0.9]}
                    style={styles.domainCard}
                >
                    <Pressable
                        style={styles.innerContainer}
                    >
                        <View style={styles.priceBlock}>
                            <Text style={styles.priceText}>1</Text>
                            <Text style={styles.priceSubText}>Crédit</Text>
                        </View>
                        <View style={styles.domainTextBlock}>
                            <Text style={styles.price}>  1.99€</Text>
                        </View>
                    </Pressable>
                </LinearGradient>

                <LinearGradient
                    colors={[colors.palette.violetClair, colors.palette.violetBg]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0.1, 0.9]}
                    style={styles.domainCard}
                >
                    <Pressable
                        style={styles.innerContainer}
                    >
                        <View style={styles.priceBlock}>
                            <Text style={styles.priceText}>3</Text>
                            <Text style={styles.priceSubText}>Crédits</Text>
                        </View>
                        <View style={styles.domainTextBlock}>
                            <View style={styles.promoBlock}>
                                <Text style={styles.pricePromo}>6.00€</Text>
                                <View style={styles.bestOffer}>
                                    <Text style={styles.bestOfferText}>-13%</Text>
                                </View>
                            </View>
                            <Text style={styles.price}>  4.99€</Text>
                        </View>
                    </Pressable>
                </LinearGradient>

                <LinearGradient
                    colors={[colors.palette.orange, colors.palette.violetBg]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0.1, 0.9]}
                    style={styles.domainCard}
                >
                    <Pressable
                        style={styles.innerContainer}
                    >
                        <View style={styles.priceBlock}>
                            <Text style={styles.priceText}>10</Text>
                            <Text style={styles.priceSubText}>Crédits</Text>
                        </View>
                        <View style={styles.bestDeal}>
                            <Text style={styles.bestDealText}>Best Deal</Text>

                        </View>
                        <View style={styles.domainTextBlock}>
                            <Text style={styles.price}>15.99€</Text>
                        </View>
                    </Pressable>
                </LinearGradient>

                <LinearGradient
                    colors={[colors.palette.violetClair, colors.palette.violetBg]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0.1, 0.9]}
                    style={styles.domainCard}
                >
                    <Pressable
                        style={styles.innerContainer}
                    >
                        <View style={styles.priceBlock}>
                            <Text style={styles.priceText}>20</Text>
                            <Text style={styles.priceSubText}>Crédit</Text>
                        </View>
                        <View style={styles.domainTextBlock}>
                            <Text style={styles.price}>28.99€</Text>
                        </View>
                    </Pressable>
                </LinearGradient>

                <LinearGradient
                    colors={[colors.palette.violetClair, colors.palette.violetBg]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0.1, 0.9]}
                    style={styles.domainCard}
                >
                    <Pressable
                        style={styles.innerContainer}
                    >
                        <View style={styles.priceBlock}>
                            <Text style={styles.priceText}>30</Text>
                            <Text style={styles.priceSubText}>Crédit</Text>
                        </View>
                        <View style={styles.domainTextBlock}>
                            <Text style={styles.price}>39.99€</Text>
                        </View>
                    </Pressable>
                </LinearGradient>

            </View>
        </View>
    )
}

export default BuyIrisScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        width: SCREEN_WIDTH - 5,
        height: SCREEN_HEIGHT * 0.4,
        borderBottomLeftRadius: SCREEN_WIDTH * 0.1,
        borderBottomRightRadius: SCREEN_WIDTH * 0.1,
        backgroundColor: colors.palette.violet
    },
    // Explain Credit
    titleCredit: {
        width: "100%",
        height: "30%",
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: "center",
        marginTop: 100,
    },
    explainCredit: {
        width: "90%",
        height: "30%",
        flexDirection: "column",
        alignItems: "center",
    },
    contentTitle: {
        fontFamily: "oswaldBold",
        fontSize: 34,
        color: colors.palette.ivory,
        marginBottom: 10,
    },
    textCredit: {
        fontFamily: "mulishMedium",
        fontSize: 22,
        color: colors.palette.ivory,
        paddingVertical: 5,
    },
    // Domain Container
    domainsContainer: {
        position: 'relative',
        top: -40,
        width: "100%",
        height: "80%",
        flexDirection: "column",
        alignItems: "center",
    },
    domainCard: {
        width: "90%",
        height: "15%",
        alignItems: "center",
        borderWidth: 1,
        marginBottom: 20,
        borderColor: colors.palette.ivory,
        borderRadius: 10,
        backgroundColor: colors.palette.violetClair,
    },
    innerContainer: {
        borderRadius: 15,
        flexDirection: "row",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    icon: {
        width: SCREEN_WIDTH * 0.17,
        height: SCREEN_WIDTH * 0.17,
    },
    priceBlock: {
        flexDirection: "column",
        alignItems: "center",
        width: '50%',
    },
    domainTextBlock: {
        width: '80%',

        marginLeft: 40,
    },
    price: {
        fontFamily: "mulishExtraBold",
        fontSize: 34,
        color: colors.palette.violet,
        marginTop: 20
    },
    priceText: {
        fontFamily: "mulishBold",
        fontSize: 20,
        color: colors.palette.violet,
    },
    priceSubText: {
        fontFamily: "mulishBold",
        fontSize: 20,
        color: colors.palette.violet,
    },
    // Promo Block
    promoBlock: {
        position: 'absolute',
        width: 90,
        top: 0,
        left:   20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bestOffer: {
        width: 50,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.palette.orange,

    },
    pricePromo: {
        fontFamily: 'mulishLight',
        fontSize: 10,
        textDecorationLine: 'line-through'
    },
    bestOfferText: {
        fontFamily: 'mulishMedium',
        fontSize: 10,
        color: colors.palette.violetBg
    },
    bestDeal: {
        position: 'absolute',
        top: -12,
        left: 120,
        backgroundColor: colors.palette.golden,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10,
    },
    bestDealText: {
        fontFamily: 'mulishMedium',
        fontSize: 14,
        color: colors.palette.violetBg
    },


})