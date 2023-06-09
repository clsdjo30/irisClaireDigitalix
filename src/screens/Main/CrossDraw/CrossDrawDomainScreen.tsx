
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
import { useQuestionStore } from '../../../utils/hooks/useQuestionStore';
import { StackScreenProps } from '@react-navigation/stack';

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


const CrossDrawDomainScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [value, setValue] = useQuestionStore();

    function goToAskQuestionCard() {
        navigation.navigate('AskCrossQuestion');
    }

    function loveChoice() {
        setValue({ ...value, domain: 'amour' });
        goToAskQuestionCard();
    }

    function workChoice() {
        setValue({ ...value, domain: 'travail' });
        goToAskQuestionCard();
    }

    function moneyChoice() {
        setValue({ ...value, domain: 'argent' });
        goToAskQuestionCard();
    }

    function generalChoice() {
        setValue({ ...value, domain: 'general' });
        goToAskQuestionCard();
    }


    return (
        <View style={styles.container}>

            <View style={styles.header} />
            <View style={styles.domainsContainer}>
                <View>
                    <Text style={styles.contentTitle}>Choisissez votre Domaine</Text>
                </View>
                <Pressable style={styles.domainCard} onPress={loveChoice}>
                    <View style={styles.iconBlock}>
                        <Image source={love} style={styles.icon} />
                    </View>
                    <View style={styles.domainTextBlockBlock}>
                        <Text style={styles.domainText}>Amour</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.domainCard} onPress={workChoice}>
                    <View style={styles.iconBlock}>
                        <Image source={work} style={styles.icon} />
                    </View>
                    <View style={styles.domainTextBlockBlock}>
                        <Text style={styles.domainText}>Travail</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.domainCard} onPress={moneyChoice}>
                    <View style={styles.iconBlock}>
                        <Image source={money} style={styles.icon} />
                    </View>
                    <View style={styles.domainTextBlockBlock}>
                        <Text style={styles.domainText}>Argent</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.domainCard} onPress={generalChoice}>
                    <View style={styles.iconBlock}>
                        <Image source={general} style={styles.icon} />
                    </View>
                    <View style={styles.domainTextBlockBlock}>
                        <Text style={styles.domainText}>Général</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default CrossDrawDomainScreen;

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
    // Domain Container
    domainsContainer: {
        position: 'absolute', //Here is the trick
        top: -50,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    domainCard: {
        width: "80%",
        height: "10%",
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.palette.ivory,
        borderRadius: 10,
        backgroundColor: colors.palette.violetClair,
    },
    icon: {
        width: SCREEN_WIDTH * 0.17,
        height: SCREEN_WIDTH * 0.17,
    },
    iconBlock: {
        width: '20%',
        marginLeft: 20,
    },
    domainTextBlockBlock: {
        width: '80%',
        marginLeft: 50,
    },
    domainText: {
        fontFamily: "mulishBold",
        fontSize: 20,
        color: colors.palette.violet,

    },
    contentTitle: {
        fontFamily: "mulishBold",
        fontSize: 22,
        color: colors.palette.ivory,
        marginBottom: 50
    },
})