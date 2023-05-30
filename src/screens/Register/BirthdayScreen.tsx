import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, TextInput, TouchableOpacity, } from 'react-native';
import { Icon } from '@rneui/base'
import { StackScreenProps } from '@react-navigation/stack';
import { useUserStore } from '../../utils/hooks/useUserStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../theme'


const BirthdayScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {

    const [user, setUser] = useUserStore();
    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setUser({ ...user, birthday: currentDate.toLocaleDateString() })
    };

    const showMode = (currentMode: React.SetStateAction<string>) => {
        
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (

        <SafeAreaView style={styles.container}>

            <Text style={styles.contentTitle}>Quelle est votre date de naissance ?</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                <View >
                    <TouchableOpacity onPress={showDatepicker} style={styles.control}>
                        <Icon 
                        name="birthday-cake" 
                        type='font-awesome'
                        size={28} 
                        color= {colors.palette.lightgold}
                        style={styles.icon} 
                        />
                        <TextInput
                            style={styles.input}
                            onFocus={showDatepicker}
                            placeholder="Date de naissance"
                            placeholderTextColor={'#8ca0d7'}
                            value={user.birthday}
                            editable={false}
                        />
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />)}

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')}>
                        <Text style={styles.buttonText}>Suivant</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};





const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.palette.purple600,
    },
    button: {
        position: 'relative',
        top: 50,
        width: 300,
        backgroundColor: "#CBA135",
        marginTop: 10,
        borderRadius: 16,
    },
    buttonText: {
        textAlign: "center",
        padding: 3,
        fontFamily: "oswaldMedium",
        fontSize: 14,
        color: colors.palette.ivory,
    },
    input: {
        color: '#8ca0d7',
        fontSize: 14,
        paddingLeft: 20,
    },
    control: {
        width: 300,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor: colors.palette.ivory,
        borderRadius: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderLeftColor: colors.palette.darkgold,
        borderBottomColor: colors.palette.darkgold,
    },
    icon: {
        marginRight: 20,
        color: '#FFD700',
    },
    contentTitle: {
        fontFamily: "mulishRegular",
        fontSize: 18,
        color: colors.text,
        marginBottom: 20
    },
});

export default BirthdayScreen;