import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ListItem, Button } from '@rneui/themed';
import { colors } from '../../theme';

interface Question {
    question: string;
    choosecardpseudo: string;
    domain: string;
    answer: string;
}

interface YesQuestionListProps {
    questions: Question[];
    expandedState: string | null;
    setExpandedState: React.Dispatch<React.SetStateAction<string | null>>;
}

const YesQuestionList: React.FC<YesQuestionListProps> = ({ questions, expandedState, setExpandedState }) => {
    return (
        <FlatList
            data={questions}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 60 }}
            renderItem={({ item, index }) => {
                const indexStr = index.toString();
                const isExpanded = expandedState === indexStr;
                return (
                    <>
                        <ListItem.Accordion
                           
                            containerStyle={{ backgroundColor: colors.palette.violetClair, borderBottomWidth: 0.6, borderBottomColor: colors.palette.violet }}
                            content={
                                <ListItem.Content >
                                    <ListItem.Subtitle style={styles.cardSubitle}>{item.domain}</ListItem.Subtitle>
                                    <ListItem.Title style={styles.cardTitle}>{item.question}</ListItem.Title>
                                </ListItem.Content>
                            }
                            isExpanded={isExpanded}
                            onPress={() => {
                                setExpandedState(isExpanded ? null : indexStr);
                            }}
                        >
                            <ListItem containerStyle={{ backgroundColor: colors.palette.violetBg }}>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.irisTitle}>{item.choosecardpseudo}</ListItem.Title>
                                    <ListItem.Subtitle style={styles.answerContainer}>{item.answer}</ListItem.Subtitle>
                                    <Button
                                        title="Supprimer"
                                        buttonStyle={{ backgroundColor: colors.palette.orange, borderRadius: 10 }}
                                        containerStyle={{
                                           alignSelf: 'flex-end',
                                        }}
                                        titleStyle={{ color: 'white', marginHorizontal: 10 }}
                                    />
                                </ListItem.Content>
                            </ListItem>
                        </ListItem.Accordion>
                    </>
                );
            }}
        />
    );
};

export default YesQuestionList;

const styles = StyleSheet.create({
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
    },
    answerContainer: {
        fontFamily: "mulishRegular",
        textAlign: 'justify',
        fontSize: 16,
        color: colors.palette.violet,
        paddingVertical: 10,
        marginBottom: 30,
    }
})
