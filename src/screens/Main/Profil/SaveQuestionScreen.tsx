
import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    ScrollView
} from 'react-native';
import { colors } from '../../../theme';
import { useQuestionStore } from '../../../utils/hooks/useQuestionStore';
import { StackScreenProps } from '@react-navigation/stack';
import { useUserYesQuestion } from '../../../utils/hooks/useUserYesQuestion';
import { getAuth } from 'firebase/auth';
import { ListItem, Tab, TabView } from '@rneui/themed';

interface Question {
    question: string;
    choosecardpseudo: string;
    domain: string;
    answer: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;
const auth = getAuth();

const SaveQuestionScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const currentUser = auth.currentUser;
    const userID = currentUser ? currentUser.uid : null;
    const { questions } = useUserYesQuestion(userID);
    // Use expandedState for each ListItem.Accordion
    const [expandedState, setExpandedState] = React.useState<string | null>(null);
    const [index, setIndex] = React.useState(0);

    console.log('Questions :', questions)

    // Function to render each item in FlatList
    const renderItem = ({ item, index }: { item: Question, index: number }) => {

        // Convert the index to string
        const indexStr = index.toString();

        // Determine whether the current item is expanded
        const isExpanded = expandedState === indexStr;

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
                        setExpandedState(isExpanded ? null : indexStr);
                    }}
                >
                    <ListItem containerStyle={{backgroundColor:colors.palette.violetBg}}>
                        <ListItem.Content>
                            <ListItem.Title style={styles.irisTitle}>{item.choosecardpseudo}</ListItem.Title>
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
                 containerStyle={{height: '100%', width: '100%'}}
                 animationType="spring">
                    <TabView.Item style={{ backgroundColor: colors.palette.violetClair, width: '100%' }}>
                    <FlatList
                    data={questions}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}

                />
                    </TabView.Item>
                    <TabView.Item style={{ backgroundColor: colors.palette.violetClair, width: '100%' }}>
                    <FlatList
                    data={questions}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}

                />
                    </TabView.Item>
                </TabView>
            
            {/* <View style={styles.yesNo}>
                <FlatList
                    data={questions}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}

                />
            </View> */}




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
    }
})