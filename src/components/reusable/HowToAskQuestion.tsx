import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import React, { useState } from 'react';
import { Tab, TabView, ListItem } from '@rneui/themed';
import { colors } from '../../theme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/constants';

const HowToAskQuestion: React.FC = () => {
    const [index, setIndex] = useState(0);
    return (
        <>
            <View style={styles.cadreContainer}>
                <Text style={styles.howToTitle}>Comment formuler vos questions</Text>
                <View>
                    <Text style={styles.howToSubtitle}>
                        Imaginez que vous voulez savoir quelque chose. Parfois, vous voulez juste une réponse rapide. D'autres fois, vous voudrez en savoir beaucoup plus.
                    </Text>
                </View>
                <View style={styles.tabContainer}>
                    <Tab
                        value={index}
                        onChange={setIndex}
                        dense
                    >
                        <Tab.Item
                            title='Vous cherchez des réponses courtes et claires'
                            titleStyle={styles.tabText}

                        />
                        <Tab.Item
                            title='Vous cherchez des réponses complètes et approfondies'
                            titleStyle={styles.tabText}
                        />
                    </Tab>

                    <TabView
                        value={index}
                        onChange={setIndex}
                        animationType="spring"
                        containerStyle={{  width: '100%' }}
                    >
                        <TabView.Item style={{ paddingHorizontal: 15, marginTop:15}}>
                            <View>
                                <Text style={styles.explainText}>
                                   Ce sont des questions où la réponse est souvent juste un oui ou un non.
                                </Text>
                                <Text style={styles.explainText}>
                                    Quand vous voulez juste savoir quelque chose de simple, rapidement.
                                </Text>
                                <Text style={styles.explainText}>
                                    Pour poser une question simple, vous pouvez commencer votre question par "est-ce que".
                                </Text>
                            </View>
                            
                        </TabView.Item>
                        <TabView.Item style={{ paddingHorizontal: 15, marginTop:15 }}>
                            <View>
                                <Text style={styles.explainText}>
                                    C'est quoi ? Ce sont des questions qui demandent une grande réponse, pas juste un oui ou un non.
                                </Text>
                                <Text style={styles.explainText}>
                                    On les utilise quand ? Lorsque vous souhaitez plus d’informations ou que vous souhaitez explorer un sujet plus en profondeur.
                                </Text>
                                <Text style={styles.explainText}>
                                    Commencez votre question avec des mots comme "Comment", "Pourquoi", ou "Quand".
                                </Text>
                            </View>
                        </TabView.Item>
                    </TabView>
                </View>
            </View>
        </>
    );
};

export default HowToAskQuestion;

const styles = StyleSheet.create({
    cadreContainer: {
        width: "100%",
        paddingHorizontal: SCREEN_WIDTH * 0.03,
    },
    howToTitle: {
        marginTop:30,
        fontFamily: "mulishMedium",
        fontSize: 16,
        color: colors.palette.violet,
        textAlign: 'center',
    },
    howToSubtitle: {
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal: 5,
        fontFamily: "mulishExtraLight",
        fontSize: 13,
        color: colors.palette.violet,
        textAlign: 'left',
    },
    explainText: {
        fontFamily: "mulishExtraLight",
        fontSize: 13,
        color: colors.palette.violet,
        textAlign: 'justify',
        paddingTop: 3
    },
    tabContainer: {
        
        width: "100%",
        height: SCREEN_HEIGHT * 0.96,
        backgroundColor: colors.palette.violetClair,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
    },
    tabText: {
        fontFamily: "mulishRegular",
        fontSize: 12,
        color: colors.palette.violet,
    },
});

