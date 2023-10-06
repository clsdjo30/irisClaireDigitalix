import React from 'react'
import {
    StyleSheet,
    Image,
    View,
    Pressable,
    Text,
    Dimensions
} from 'react-native';
import { colors } from '../../../theme';
import { useCrossQuestionStore } from '../../../store/useCrossQuestionStore';
import { StackScreenProps } from '@react-navigation/stack';

// import icons
const ICONS: Record<string, any> = {
    amour: require('../../../../assets/icons/domainIcon/heart_icon.png'),
    argent: require('../../../../assets/icons/domainIcon/gold_chest.png'),
    travail: require('../../../../assets/icons/domainIcon/briefcase.png'),
    general: require('../../../../assets/icons/domainIcon/general_icon.png'),
};

//Define domains
const DOMAINS = [
    { id: 'amour', name: 'Amour' },
    { id: 'travail', name: 'Travail' },
    { id: 'argent', name: 'Argent' },
    { id: 'general', name: 'Général' },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;

const CrossDrawDomainScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    
    const [value, setValue] = useCrossQuestionStore();
    function goToAskQuestionCard(domain: string) {
        setValue({ ...value, domain });
        navigation.navigate('AskCrossQuestion');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <View style={styles.domainsContainer}>
                <View>
                    <Text style={styles.contentTitle}>Choisissez votre Domaine</Text>
                </View>
                {DOMAINS.map((domain) => (
                    <Pressable key={domain.id} style={styles.domainCard} onPress={() => goToAskQuestionCard(domain.id)}>
                        <View style={styles.iconBlock}>
                            <Image source={ICONS[domain.id]} style={styles.icon} />
                        </View>
                        <View style={styles.domainTextBlockBlock}>
                            <Text style={styles.domainText}>{domain.name}</Text>
                        </View>
                    </Pressable>
                ))}
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
        top: 70,
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    domainCard: {
        width: "35%",
        height: "28%",
        alignContent: 'center',
        justifyContent: 'center',
        margin: 10,
        borderWidth: 0.5,
        borderColor: colors.palette.orange,
        borderRadius: 10,
        backgroundColor: colors.palette.violetClair,
        elevation: 5,

    },
    icon: {
        width: SCREEN_WIDTH * 0.35,
        height: SCREEN_WIDTH * 0.35,
    },
    iconBlock: {
        width: '100%',
        alignItems: 'center',
    },
    domainTextBlockBlock: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
    },
    domainText: {
        fontFamily: "mulishBold",
        fontSize: 20,
        color: colors.palette.golden,
    },
    contentTitle: {
        fontFamily: "mulishBold",
        fontSize: 22,
        color: colors.palette.ivory,
        marginBottom: 50
    },
})