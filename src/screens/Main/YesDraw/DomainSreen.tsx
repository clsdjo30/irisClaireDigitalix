
import React, { useRef } from 'react'
import {
    StyleSheet,
    Image,
    View,
    Pressable,
    Text,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Form, FormItem } from 'react-native-form-component';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../theme';
import { useQuestionStore } from '../../../utils/hooks/useQuestionStore';
import { StackScreenProps } from '@react-navigation/stack';

// import icons
const love = require('../../../../assets/images/testVector/love.png');
const money = require('../../../../assets/images/testVector/finance.png');
const work = require('../../../../assets/images/testVector/career.png');
const general = require('../../../../assets/images/testVector/question_plus.png');
const rightArrow = require('../../../../assets/icons/caretRight.png');

interface YesDrawScreenProps {
    navigation: any;
}

interface YesDrawScreenState {
    value: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const SCREEN_SCALE = Dimensions.get('window').scale;
const SCREEN_FONT_SCALE = SCREEN_SCALE * 0.5;


const DomainScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
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
            <View style={styles.domainsContainer}>
                <View>
                    <Text style={styles.contentTitle}>Choisissez votre domaine</Text>
                </View>
                <Pressable style={styles.domainCard} onPress={loveChoice}>
                    <Image source={love} style={styles.icon} />
                    <View style={styles.direction}>
                        <Text style={styles.domainText}>Amour</Text>
                        <Image source={rightArrow} style={styles.iconImage}></Image>
                    </View>
                </Pressable>
                <Pressable style={styles.domainCard} onPress={workChoice}>
                        <Image source={work} style={styles.icon} />
                    <View style={styles.direction}>
                        <Text style={styles.domainText}>Travail</Text>
                        <Image source={rightArrow} style={styles.iconImage}></Image>
                    </View>
                </Pressable>
                <Pressable style={styles.domainCard} onPress={moneyChoice}>
                        <Image source={money} style={styles.icon} />
                    <View style={styles.direction}>
                        <Text style={styles.domainText}>Argent</Text>
                        <Image source={rightArrow} style={styles.iconImage}></Image>
                        </View>
                </Pressable>
                <Pressable style={styles.domainCard} onPress={generalChoice}>
                        <Image source={general} style={styles.icon} />
                    <View style={styles.direction}>
                        <Text style={styles.domainText}>Général</Text>
                        <Image source={rightArrow} style={styles.iconImage}></Image>
                        </View>
                </Pressable>
            </View>
        </View>
    )
}

export default DomainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: colors.palette.purple600,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: '50%',
        height: '80%',
    },
    input: {
        fontFamily: 'mulishRegular',
        color: colors.palette.blue,
        fontSize: 14,
    },
    // Domain Container
    domainsContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    domainCard: {
        width: "90%",
        height: "16%",
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderWidth: 1,
        borderColor: colors.palette.ivory,
        borderRadius: 10,
        backgroundColor: 'rgba(198,198,231, 0.2)',
    },
    domainText: {
        fontFamily: "mulishBold",
        fontSize: 26,
        color: colors.palette.pink500,
    },
    iconImage: {
        width: 30,
        height: 30,
        alignSelf: "flex-end",
        marginLeft: 20,
    },
    contentTitle: {
        fontFamily: "mulishBold",
        fontSize: 22,
        color: colors.palette.ivory,
        marginBottom: 20
    },
    direction: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 55
    },
})