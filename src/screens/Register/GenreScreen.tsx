import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, Dimensions } from 'react-native';
import { Icon } from '@rneui/base'
import { StackScreenProps } from '@react-navigation/stack';
import { Form, Picker } from 'react-native-form-component';
import { useUserStore } from '../../utils/hooks/useUserStore';
import { colors } from '../../theme'

const width = Dimensions.get('window').width;



const GenreScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [user, setUser] = useUserStore()


    //console.log(user)
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.controls}>
                <View style={styles.genderTitle}>
                    <Text style={styles.contentTitle}>Vous êtes : </Text>
                </View>
                <Form
                    onButtonPress={() => navigation.navigate('Birthday', { user: user })}
                    buttonStyle={styles.button}
                    buttonText="Suivant"
                    buttonTextStyle={styles.buttonText}
                style={{width: width * 0.85, alignItems: 'center'}}
            
                >
                    <Picker
                        items={[
                            { label: 'Une Femme', value: "Femme" },
                            { label: 'Un Homme', value: "Homme" },
                            { label: 'Autres', value: "Autres" },
                        ]}
                        placeholder='Choisissez votre genre'
                        selectedValueStyle={styles.inputText}
                        pickerIcon={<Icon
                            name='venus-mars'
                            type='font-awesome'
                            color={colors.palette.pink200}
                            size={28}
                            style={styles.icon}
                        />}
                        iconWrapperStyle={{ backgroundColor: colors.palette.ivory }}
                        selectedValue={user.genre}
                        onSelection={(item: any) => setUser({ ...user, genre: item.value })}
                        buttonStyle={styles.control}
                    />
                </Form>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.palette.purple600,
    },
    icon: {
        color: '#FFD700',
        backgroundColor: colors.palette.ivory
    },
    error: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#D54826FF',
        borderRadius: 10,
        width: "95%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    textError: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        position: 'relative',
        width: width * 0.85,
        height: 30,
        backgroundColor: colors.palette.orange,
        marginTop: 30,
        borderRadius: 16,
        paddingVertical: 5,
    },
    policy: {
        width: 300,
        flexDirection: 'row',
        alignItems: "center",
        marginLeft: -20
    },
    genderTitle: {
        width: width * 0.8,
        flexDirection: 'row',
    },
    genderSub: {
        color: '#9d79bc',
        fontSize: 11,

    },
    genderBox: {
        width: 350,
        flexDirection: 'row',
        gap: -50,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 50,
    },
    bottomDivider: {
        marginTop: 1,
        borderColor: colors.palette.pink200,
        borderWidth: 1,
        marginBottom: 20,
    },
    controls: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
    },
    control: {
        width: width * 0.85,
        height: 60,
        borderBottomWidth: 1,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.palette.ivory,
        borderLeftWidth: 1,
        borderLeftColor: colors.palette.darkgold,
        borderBottomColor: colors.palette.darkgold,
    },
    buttonText: {
        fontFamily: "mulishBold",
        fontSize: 14,
        color: colors.palette.violetBg
    },
    input: {
        fontFamily: 'mulishRegular',
        color: colors.palette.blue,
        fontSize: 17,
    },
    inputText: {
        
        fontFamily: 'mulishRegular',
        color: colors.palette.purple200,
        fontSize: 14,
        marginLeft: 14,
    },
    contentTitle: {
        fontFamily: "mulishRegular",
        fontSize: 18,
        color: colors.palette.violetBg,
        marginBottom: 20
    },
});

export default GenreScreen;