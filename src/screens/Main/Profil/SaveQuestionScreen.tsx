
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
import { useQuestionStore } from '../../../utils/hooks/useQuestionStore';
import { StackScreenProps } from '@react-navigation/stack';

// import icons

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;


const SAveQuestionScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [value, setValue] = useQuestionStore();


    return (
        <View style={styles.container}>

            <View style={styles.header} />
            <View style={styles.domainsContainer}>
                <View>
                    <Text style={styles.contentTitle}>Choisissez votre Domaine</Text>
                </View>
               
            </View>
        </View>
    )
}

export default SAveQuestionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH ,
        height: SCREEN_HEIGHT,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        width: SCREEN_WIDTH -5,
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
    contentTitle: {
        fontFamily: "mulishBold",
        fontSize: 22,
        color: colors.palette.ivory,
        marginBottom: 50
    },
})