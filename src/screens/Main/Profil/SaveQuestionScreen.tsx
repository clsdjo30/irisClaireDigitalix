import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import YesQuestionList from '../../../components/Profil/YesQuestionList';
import CrossQuestionList from '../../../components/Profil/CrossQuestionList';
import { colors } from '../../../theme';
import { StackScreenProps } from '@react-navigation/stack';
import { useUserYesQuestion } from '../../../hooks/useUserYesQuestion';
import { useUserCrossQuestion } from '../../../hooks/useUserCrossQuestion';
import { getAuth } from 'firebase/auth';
import { Tab, TabView } from '@rneui/themed';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../utils/constants';


const auth = getAuth();

const SaveQuestionScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    // Use expandedState for each ListItem.Accordion
    const [yesNoExpandedState, setYesNoExpandedState] = useState<string | null>(null);
    const [crossQuestionExpandedState, setCrossQuestionExpandedState] = useState<string | null>(null);

    const [index, setIndex] = useState(0);
    // Get the current user ID
    const currentUser = auth.currentUser;
    const userID = currentUser ? currentUser.uid : null;

    // Get the Yes questions from the database
    const { questions } = useUserYesQuestion(userID);

    // Get the Cross questions from the database
    const { crossQuestions } = useUserCrossQuestion(userID);

    
    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <View style={styles.headingContainer}>
                <Text style={styles.contentTitle}>Vos questions sauvegardées</Text>
                <Text style={styles.contentExplain}>Retrouvez ici toutes les reponses aux question que vous avez posé à l'Iris Claire</Text>
            </View>
            <View style={styles.explainContainer}>
                <Tab
                    value={index}
                    onChange={setIndex}
                    dense
                >
                    <Tab.Item
                        title='Oui/Non'
                        style={styles.questionType}
                    />
                    <Tab.Item
                        title='Tirage Complet'
                        style={styles.questionType}
                    />
                </Tab>

                <TabView
                    value={index}
                    onChange={setIndex}
                    containerStyle={{ height: '100%', width: '100%' }}
                    animationType="spring">
                    <TabView.Item style={{ backgroundColor: colors.palette.violetClair, width: '100%' }}>
                        <YesQuestionList
                            questions={questions}
                            expandedState={yesNoExpandedState}
                            setExpandedState={setYesNoExpandedState}
                        />
                    </TabView.Item>
                    <TabView.Item style={{ backgroundColor: colors.palette.violetClair, width: '100%' }}>
                        <CrossQuestionList
                            crossQuestions={crossQuestions}
                            crossQuestionExpandedState={crossQuestionExpandedState}
                            setCrossQuestionExpandedState={setCrossQuestionExpandedState}
                        />
                    </TabView.Item>
                </TabView>
            </View>
        </View >
    )
}

export default SaveQuestionScreen;

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
        top: SCREEN_HEIGHT * 0.3,
        width: "100%",
        height: SCREEN_HEIGHT * 0.96,
        backgroundColor: colors.palette.violetClair,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
    },
    contentTitle: {
        fontFamily: "mulishBold",
        fontSize: 22,
        color: colors.palette.ivory,
        marginBottom: 50
    },
    // Yes No Container
    yesNo: {
        width: "100%",
        marginTop: 20,
    },
    questionType: {
        fontFamily: "mulishBold",
        fontSize: 18,
        color: colors.palette.violet,
        marginBottom: 10,
        textAlign: 'center'
    },
   
})