import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ListItem } from '@rneui/themed';
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
            renderItem={({ item, index }) => {
                const indexStr = index.toString();
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
                                setExpandedState(isExpanded ? null : indexStr);
                            }}
                        >
                            <ListItem containerStyle={{ backgroundColor: colors.palette.violetBg }}>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.irisTitle}>{item.choosecardpseudo}</ListItem.Title>
                                    <ListItem.Subtitle style={styles.answerContainer}>{item.answer}</ListItem.Subtitle>
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
        fontSize: 14,
        color: colors.palette.violet,
        paddingVertical: 10,
        marginBottom: 50,
    }
})
