import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ListItem, Button} from '@rneui/themed';
import { colors } from '../../theme';

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

interface CrossQuestionListProps {
    crossQuestions: CrossQuestion[];
    crossQuestionExpandedState: string | null;
    setCrossQuestionExpandedState: React.Dispatch<React.SetStateAction<string | null>>;
}

const CrossQuestionList: React.FC<CrossQuestionListProps> = ({ crossQuestions, crossQuestionExpandedState, setCrossQuestionExpandedState }) => {
    return (
        <FlatList
            data={crossQuestions}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 60 }}
            renderItem={({ item, index }) => {
                const indexStr = index.toString();
                const isExpanded = crossQuestionExpandedState === indexStr;
                return (
                    <>
                        <ListItem.Accordion
                            containerStyle={{ backgroundColor: colors.palette.violetClair, borderBottomWidth: 0.6, borderBottomColor: colors.palette.violet }}
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
                            <ListItem containerStyle={{ backgroundColor: colors.palette.violetBg}}>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.irisTitle}>
                                        {item.cardpseudoone}, {item.cardpseudotwo}, {item.cardpseudothree}, {item.cardpseudofour}, {item.cardpseudofive}
                                    </ListItem.Title>
                                    <ListItem.Subtitle style={styles.answerContainer}>
                                        {item.answer}
                                    </ListItem.Subtitle>
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

export default CrossQuestionList;

export const styles = StyleSheet.create({
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