import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, TextInput, Dimensions, Pressable} from 'react-native';
import { Icon } from '@rneui/base'
import { StackScreenProps } from '@react-navigation/stack';
import { useUserStore } from '../../utils/hooks/useUserStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../theme';
import NavigationButton from '../../components/NavigationButton';
const width = Dimensions.get('window').width; 


const BirthdayScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {

    const [user, setUser] = useUserStore();
    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState<'date'>('date');
    const [show, setShow] = React.useState(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setUser({ ...user, birthday: currentDate.toLocaleDateString() })
    };

    const showMode = (currentMode: "date" | ((prevState: "date") => "date")) => {
        setShow(true);
        if (typeof currentMode === 'string') {
            setMode(currentMode);
        } else {
            setMode(currentMode(mode));
        }
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (

        <SafeAreaView style={styles.container}>

            <Text style={styles.contentTitle}>Quelle est votre date de naissance ?</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                <View >
                    <Pressable onPress={showDatepicker} style={styles.control}>
                        <Icon
                            name="birthday-cake"
                            type='font-awesome'
                            size={20}
                            color={colors.palette.golden}
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            onFocus={showDatepicker}
                            placeholder="Date de naissance"
                            placeholderTextColor={colors.palette.purple200}
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

                    </Pressable>
                    
                    <View style={styles.button}>
                    <NavigationButton
                        color={colors.palette.violetBg}
                        backgroundColor={colors.palette.orange}
                        width={width / 1.3}
                        title="S'inscrire"
                        onPress={() => navigation.navigate('Sign Up')}
                    />
                        
                    </View>
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
        marginTop: 60,
    },
    buttonText: {
        textAlign: "center",
        padding: 3,
        fontFamily: "oswaldMedium",
        fontSize: 14,
        color: colors.palette.violetBg,
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
        backgroundColor: colors.palette.violetBg,
        borderRadius: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderLeftColor: colors.palette.golden,
        borderBottomColor: colors.palette.golden,
    },
    icon: {
        marginRight: 20,
        color: colors.palette.orange,
    },
    contentTitle: {
        fontFamily: "mulishRegular",
        fontSize: 18,
        color: colors.palette.violetBg,
        marginBottom: 20
    },
});

export default BirthdayScreen;