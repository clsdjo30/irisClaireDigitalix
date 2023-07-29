
import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
} from 'react-native';
import { colors } from '../../../theme';
import { StackScreenProps } from '@react-navigation/stack';
import { useUserYesQuestion } from '../../../hooks/useUserYesQuestion';
import { useUserCrossQuestion } from '../../../hooks/useUserCrossQuestion';
import { getAuth } from 'firebase/auth';
import { ListItem, Tab, TabView } from '@rneui/themed';

interface Question {
    question: string;
    choosecardpseudo: string;
    domain: string;
    answer: string;
}

interface CrossQuestion {
    question: string;
    cardpseudoone: string;
    cardpseudotwo: string;
    cardpseudothree: string;
    cardpseudofour: string;
    cardpseudofive: string;
    domain: string;
    answer: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const auth = getAuth();

const SaveQuestionScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    // Use expandedState for each ListItem.Accordion
    // Use expandedState for each ListItem.Accordion
    const [yesNoExpandedState, setYesNoExpandedState] = React.useState<string | null>(null);
    const [crossQuestionExpandedState, setCrossQuestionExpandedState] = React.useState<string | null>(null);

    const [index, setIndex] = React.useState(0);
    // Get the current user ID
    const currentUser = auth.currentUser;
    const userID = currentUser ? currentUser.uid : null;

    // Get the Yes questions from the database
    const { questions } = useUserYesQuestion(userID);
    // console.log('Questions :', questions)
    // Get the Cross questions from the database
    const { crossQuestions } = useUserCrossQuestion(userID);
    console.log('Cross Questions :', crossQuestions);


    // Function to render each item of the Yes Question in FlatList
    const renderYesQuestion = ({ item, index }: { item: Question, index: number }) => {

        // Convert the index to string
        const indexStr = index.toString();

        // Determine whether the current item is expanded
        const isExpanded = yesNoExpandedState === indexStr;

        return (
            <>
                <ListItem.Accordion
                    containerStyle={{ backgroundColor: colors.palette.violetClair }}
                    content={
                        <ListItem.Content>
                            <ListItem.Subtitle style={styles.cardSubitle}>{item.domain}</ListItem.Subtitle>
                            <ListItem.Title style={styles.cardTitle}>{item.question}</ListItem.Title>
                        </ListItem.Content>
                    }
                    isExpanded={isExpanded}
                    onPress={() => {
                        // Toggle between expanded and collapsed state
                        setYesNoExpandedState(isExpanded ? null : indexStr);
                    }}
                >
                    <ListItem containerStyle={{ backgroundColor: colors.palette.violetBg }}>
                        <ListItem.Content>
                            <ListItem.Title style={styles.irisTitle}>{item.choosecardpseudo}</ListItem.Title>
                            <ListItem.Subtitle style={styles.cardTitle}>{item.answer}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>



                </ListItem.Accordion>
            </>
        );
    }

    // Function to render each item of the Cross Question in FlatList
    const renderCrossQuestion = ({ item, index }: { item: CrossQuestion, index: number }) => {

        // Convert the index to string
        const indexStr = index.toString();

        // Determine whether the current item is expanded
        const isExpanded = crossQuestionExpandedState === indexStr;

        return (
            <>
                <ListItem.Accordion
                    containerStyle={{ backgroundColor: colors.palette.violetClair }}
                    content={
                        <ListItem.Content>
                            <ListItem.Subtitle style={styles.cardSubitle}>{item.domain}</ListItem.Subtitle>
                            <ListItem.Title style={styles.cardTitle}>{item.question}</ListItem.Title>
                        </ListItem.Content>
                    }
                    isExpanded={isExpanded}
                    onPress={() => {
                        // Toggle between expanded and collapsed state
                        setCrossQuestionExpandedState(isExpanded ? null : indexStr);
                    }}
                >
                    <ListItem containerStyle={{ backgroundColor: colors.palette.violetBg }}>
                        <ListItem.Content>
                            <ListItem.Title style={styles.irisTitle}>
                                {item.cardpseudoone}, {item.cardpseudotwo}, {item.cardpseudothree}, {item.cardpseudofour}, {item.cardpseudofive}
                            </ListItem.Title>
                            <ListItem.Subtitle style={styles.cardTitle}>{item.answer}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>



                </ListItem.Accordion>
            </>
        );
    }
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
                        <FlatList
                            data={questions}
                            renderItem={renderYesQuestion}
                            keyExtractor={(item, index) => index.toString()}

                        />
                    </TabView.Item>
                    <TabView.Item style={{ backgroundColor: colors.palette.violetClair, width: '100%' }}>
                        <FlatList
                            data={crossQuestions}
                            renderItem={renderCrossQuestion}
                            keyExtractor={(item, index) => index.toString()}

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
    // List Item Style
    cardTitle: {
        fontFamily: "mulishRegular",
        fontSize: 14,
        color: colors.palette.violet,
    },
    cardSubitle: {
        fontFamily: "mulishRegular",
        fontSize: 14,
        color: colors.palette.golden,
        textTransform: 'uppercase'
    },
    irisTitle: {
        fontFamily: "mulishBold",
        fontSize: 14,
        color: colors.palette.violet,
        textTransform: 'capitalize',
        marginBottom: 10
    }
})