import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
} from 'react-native';
import { colors } from '../../../theme';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../utils/constants';
import  faq  from '../../../data/faq';
import Accordion from '../../../components/Profil/Accordion';

const FaqScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <View style={styles.headingContainer}>
                <Text style={styles.contentTitle}>FAQ</Text>
            </View>
            {/* Utilisez ScrollView ici */}
            <ScrollView style={styles.explainContainer}>
                {faq.map((item, index) => (
                    <Accordion key={index} question={item.question} answer={item.answer} />
                ))}
            </ScrollView>
        </View >
    )
}

export default FaqScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.41,
        borderBottomLeftRadius: SCREEN_WIDTH * 0.1,
        borderBottomRightRadius: SCREEN_WIDTH * 0.1,
        backgroundColor: colors.palette.violet
    },
    //heading Container
    headingContainer: {
        position: 'absolute',
        top: 40,
        width: SCREEN_WIDTH - 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    // Domain Container
    explainContainer: {
        width: SCREEN_WIDTH * 1.1,
        padding: 20,
        marginTop: SCREEN_HEIGHT * 0.2,
    },
    contentTitle: {
        fontFamily: "mulishBold",
        fontSize: 22,
        color: colors.palette.ivory,
        marginBottom: 50
    },
    accordeonTitle: {
    },
})