import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import 'firebase/auth'
import ThemeContext from '../DarkMode/ThemeContext.js';


import React, { useState, useEffect , useContext} from 'react';

import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Keyboard
}
    from 'react-native';

const AddNote = () => {
    const [addData, setAddData] = useState('');
    const todoRef = firebase.firestore().collection('todos');

    const navigation = useNavigation();

    const timestamp = new Date();
    // const timestamp = firebase.firestore.FieldValue.serverTimestamp();


 //Dark mode
 const [darkMode , setDarkMode] = useState(false);
 const Theme = useContext(ThemeContext);


    // add a todo
    const addTodo = () => {
        const uid = firebase.auth().currentUser.uid;
        // check if we have a todo.
        if (addData && addData.length > 0) {
            // get the timestamp
            const data = {
                heading: addData,
                createdAt: timestamp,
                uid: uid
            };
            todoRef
                .add(data)
                .then(() => {
                    // release todo state
                    setAddData('');
                    // release keyboard
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    // show an alert in case of error
                    alert(error);
                })
            navigation.navigate("Home")
            // alert("Note added")
        }
    }

    return (
        <View style={[styles.container, {backgroundColor: Theme.backgroundColor} ]}>
            <TextInput
                style={[styles.input, {color : Theme.color}]}
                placeholder='Add new Note'
                placeholderTextColor={Theme.color}
                onChangeText={(heading) => setAddData(heading)}
                value={addData}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                multiline={true}
            />
            <View style={styles.formContainerr}>
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 1,
        margin: 10,
        marginHorizontal: 10,
        flex: 1,
    },
    input: {
        borderRadius: 15,
        fontSize: 20,
        overflow: 'hidden',
        paddingLeft: 16,
        marginRight: 5,
        marginTop: 5,
        textAlignVertical: 'top',
        height: '90%',
        width: '100%',
        marginBottom: 2,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 120,
        alignItems: "center",
        justifyContent: 'center',
        elevation: 7
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    buttonTextt: {
        color: 'white',
        fontSize: 50
    },
    todoIcon: {
        marginTop: 5,
        fontSize: 20,
        marginLeft: 14,
    },
    formContainerr: {
        flexDirection: 'row',
        height: 40,
        alignItems: "center",
        justifyContent: 'flex-end',
        marginTop: 5,
        marginRight: 5,
    },
    buttonn: {
        height: 75,
        borderRadius: 100,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
});

export default AddNote;
