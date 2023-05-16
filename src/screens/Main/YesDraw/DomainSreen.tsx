
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

    console.log(value)
    function goToAskQuestionCard() {
        navigation.navigate('AskQuestion');
    }

    function loveChoice() {
        setValue({...value, domain:'amour'});
        goToAskQuestionCard();
    }

    function workChoice() {
        setValue({...value, domain:'travail'});
        goToAskQuestionCard();
    }

    function moneyChoice() {
        setValue({...value, domain:'argent'});
        goToAskQuestionCard();
    }

    function generalChoice() {
        setValue({...value, domain:'general'});
        goToAskQuestionCard();
    }


    return (
        <LinearGradient
            // Card Linear Gradient
            colors={[colors.palette.purple600, colors.palette.purple500]}
            style={styles.container}>
            <View style={styles.domainsContainer}>
                <View>
                    <Text style={styles.contentTitle}>Choisissez votre domaine</Text>
                </View>
                <Pressable style={styles.domainCard} onPress={loveChoice}>
                    <Icon name="heart" size={28} color={colors.palette.ivory}/>
                    <Text>Amour</Text>
                </Pressable>
                <Pressable style={styles.domainCard} onPress={workChoice}>
                    <Icon name="building" size={28} color={colors.palette.ivory}/>
                    <Text>Travail</Text>
                </Pressable>
                <Pressable style={styles.domainCard} onPress={moneyChoice}>
                    <Icon name="euro" size={28} color={colors.palette.ivory}/>
                    <Text>Argent</Text>
                </Pressable>
                <Pressable style={styles.domainCard} onPress={generalChoice}>
                    <Icon name="question" size={28} color={colors.palette.ivory}/>
                    <Text>Général   </Text>
                </Pressable>
            </View>
        </LinearGradient >
    )
}

export default DomainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: colors.palette.outterSpace,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 20,
        color: colors.palette.lightgold,
    },
    input: {
        fontFamily: 'mulishRegular',
        color: colors.palette.blue,
        fontSize: 14,
    },
    // Domain Container
    domainsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        width: SCREEN_WIDTH -20,
        height: SCREEN_HEIGHT /2,
    },
    domainCard: {
        width: "40%",
        height: "40%",
        margin: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.palette.ivory,
        borderRadius: 10,
        backgroundColor: colors.palette.purple100,
    },
    contentTitle: {
        fontFamily: "mulishRegular",
        fontSize: 18,
        color: colors.palette.ivory,
        marginBottom: 20
      }
})