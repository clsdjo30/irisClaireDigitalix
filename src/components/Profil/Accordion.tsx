import react, { useState } from 'react';
import {StyleSheet } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import { colors } from '../../theme';

type AccordionProps = {
    question: string;
    answer: string;
};

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <ListItem.Accordion
            containerStyle={{ width: '100%', marginTop: 0 }}
            content={
                <>
                    <ListItem.Content>
                        <ListItem.Title style={styles.questionText}>{question}</ListItem.Title>
                    </ListItem.Content>
                </>
            }
            icon={<Icon name={'chevron-down'} type="material-community" color={colors.palette.orange} />}
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded);
            }}
        >
            <ListItem
                onPress={() => setExpanded(expanded)}
                containerStyle={{ width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}
            >
                <ListItem.Content>
                    <ListItem.Title style={styles.answerText}>{answer}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </ListItem.Accordion>
    );
};

export default Accordion;

const styles = StyleSheet.create({
  rdeonTitle: {
    },
    questionText: {
        fontFamily: "mulishRegular",
        fontSize: 16,
        color: colors.palette.orange,
        textAlign: 'justify',
        paddingTop: 3
    },
    answerText: {
        fontFamily: "mulishLight",
        fontSize: 16,
        color: colors.palette.violet,
        textAlign: 'justify',
        paddingTop: 3
    }
})