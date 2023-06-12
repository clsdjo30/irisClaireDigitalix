
import React from 'react'
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Dimensions
} from 'react-native';
import { colors } from '../../../theme';
import { useQuestionStore } from '../../../utils/hooks/useQuestionStore';
import { StackScreenProps } from '@react-navigation/stack';
import { useUserYesQuestion } from '../../../utils/hooks/useUserYesQuestion';
import { getAuth } from 'firebase/auth';

// import icons

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const auth = getAuth();

const SaveQuestionScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [value, setValue] = useQuestionStore();
   useUserYesQuestion();

   const userYesQuestion = value?.question;
   console.log(userYesQuestion);

    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <View style={styles.headingContainer}>
                <Text style={styles.contentTitle}>Vos questions sauvegardées</Text>
                <Text style={styles.contentExplain}>Retrouvez ici toutes les reponses aux question que vous avez posé à l'Iris Claire</Text>
            </View>
            <View style={styles.explainContainer}>
                
               
            </View>
        </View>
    )
}

export default SaveQuestionScreen;

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
    //heading Container
    headingContainer: {
        position: 'absolute',
        top: 40,
        width: SCREEN_WIDTH - 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentExplain: {
        width: SCREEN_WIDTH - 70,
        position: 'absolute',
        top: 40,
        fontFamily: "mulishRegular",
        fontSize: 16,
        color: colors.palette.violetClair,
        textAlign: 'center'
    },
    // Domain Container
    explainContainer: {
        position: 'absolute',
        top: SCREEN_HEIGHT / 2 - 40,
        width: SCREEN_WIDTH - 20,
        height: SCREEN_HEIGHT * 0.8,
        backgroundColor: colors.palette.violetClair,
    },
    contentTitle: {
        fontFamily: "mulishBold",
        fontSize: 22,
        color: colors.palette.ivory,
        marginBottom: 50
    },
})