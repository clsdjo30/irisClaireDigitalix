import React from 'react';
import { FlatList, StyleSheet, Modal, View, Text } from 'react-native';
import { ListItem, Button } from '@rneui/themed';
import { colors } from '../../theme';


interface Question {
    question: string;
    choosecardpseudo: string;
    domain: string;
    answer: string;
    id: string;
}

interface YesQuestionListProps {
    questions: Question[];
    expandedState: string | null;
    setExpandedState: React.Dispatch<React.SetStateAction<string | null>>;
    onPress: (id: string) => void;
}

const YesQuestionList: React.FC<YesQuestionListProps> = ({ questions, expandedState, setExpandedState, onPress }) => {
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [questionIdToDelete, setQuestionIdToDelete] = React.useState<string | null>(null);

    const handleConfirmDeletion = () => {
        if (questionIdToDelete) {
            onPress(questionIdToDelete);
        }
        setModalVisible(false);
    };

    return (
        <>
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
                                containerStyle={{
                                    backgroundColor: colors.palette.violetClair,
                                    borderBottomWidth: 0.6,
                                    borderBottomColor: colors.palette.violet
                                }}
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
                                        <Button
                                            title="Supprimer"
                                            onPress={() => {
                                                setQuestionIdToDelete(item.id);
                                                setModalVisible(true);
                                            }}
                                            buttonStyle={{ backgroundColor: colors.palette.orange, borderRadius: 10 }}
                                            containerStyle={{ alignSelf: 'flex-end' }}
                                            titleStyle={{ color: 'white', marginHorizontal: 10 }}
                                        />
                                    </ListItem.Content>
                                </ListItem>
                            </ListItem.Accordion>
                        </>
                    );
                }}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Êtes-vous sûr de vouloir supprimer cette question?</Text>
                        <Text style={styles.modalsubTitle}>En validant vous n'aurez plus la possibilité de retrouver votre réponse</Text>
                        <View style={styles.buttonGroup}>
                        <Button
                            title="Oui, supprimer"
                                onPress={handleConfirmDeletion}
                                buttonStyle={{
                                    backgroundColor: colors.palette.orange,
                                    borderRadius: 5,
                                }}
                        />
                        <Button
                            title="Non, annuler"
                                onPress={() => setModalVisible(false)}
                                buttonStyle={{
                                    backgroundColor: colors.palette.stepViolet,
                                    borderRadius: 5,
                                }}
                            />
                            </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default YesQuestionList;

const styles = StyleSheet.create({
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20
    },
    modalText: {
        fontFamily: "mulishRegular",
        textAlign: 'center',
        fontSize: 16,
        color: colors.palette.violet,
    },
    modalsubTitle: {
        fontFamily: "mulishRegular",
        textAlign: 'center',
        fontSize: 14,
        color: colors.palette.orange,
        marginTop: 10,
        marginBottom: 20
    }
});
