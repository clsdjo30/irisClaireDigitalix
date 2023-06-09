
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
        navigation.navigate('AskQuestion');
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
                    <Image source={love} style={styles.icon} />
                    <Text style={styles.domainText}>Amour</Text>
                </Pressable>
                <Pressable style={styles.domainCard} onPress={workChoice}>
                    <Image source={work} style={styles.icon} />
                    <Text style={styles.domainText}>Travail</Text>
                </Pressable>
                <Pressable style={styles.domainCard} onPress={moneyChoice}>
                    <Image source={money} style={styles.icon} />
                    <Text style={styles.domainText}>Argent</Text>
                </Pressable>
                <Pressable style={styles.domainCard} onPress={generalChoice}>
                    <Image source={general} style={styles.icon} />
                    <Text style={styles.domainText}>Général</Text>
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
        position: 'relative',
        width: SCREEN_WIDTH -5,
        height: SCREEN_WIDTH * 1.4,
        borderBottomLeftRadius: SCREEN_WIDTH * 0.1,
        borderBottomRightRadius: SCREEN_WIDTH * 0.1,
        backgroundColor: colors.palette.violet
    },
    icon: {
        width: SCREEN_WIDTH * 0.17,
        height: SCREEN_WIDTH * 0.17,
        marginLeft: SCREEN_WIDTH * 0.1,
    },
    // Domain Container
    domainsContainer: {
        position: "relative",
        top: -SCREEN_WIDTH / 1.3,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    domainCard: {
        width: "70%",
        height: "10%",
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderWidth: 1,
        borderColor: colors.palette.ivory,
        borderRadius: 10,
        backgroundColor: colors.palette.violetClair,
    },
    domainText: {
        fontFamily: "mulishBold",
        fontSize: 20,
        color: colors.palette.violet,
        marginLeft: SCREEN_WIDTH * 0.1,
    },
    contentTitle: {
        fontFamily: "mulishBold",
        fontSize: 22,
        color: colors.palette.ivory,
        marginBottom: 50
    },
})