import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@expo/vector-icons";

import React, { useState } from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Pressable,

} from "react-native"


const Detail = ({ route }) => {
    const todoRef = firebase.firestore().collection('todos');
    const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
    const navigation = useNavigation();

    // delete a todo from firestore db
    const deleteTodo = (todos) => {
        todoRef
            .doc(todos.id)
            .delete()
            .then(() => {
            })
            .catch(error => {
                // show an error alert
                alert(error);
            })
        navigation.navigate("Home")
        // show a successful alert
        alert("Deleted successfully");
    }

    const updateTodo = () => {
        if (textHeading && textHeading.length > 0) {
            todoRef
                .doc(route.params.item.id)
                .update({
                    heading: textHeading,
                }).then(() => {

                }).catch((error) => {
                    alert(error.message)
                })
        }
        navigation.navigate("Home")
        alert("updated")
    }


    const { item } = route.params;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textfield}
                onChangeText={onChangeHeadingText}
                defaultValue={item.heading}
                placeholder="Update"
                multiline={true}
            />
            <View style={styles.buttonUpdatee}>
                <Pressable
                    style={styles.buttonUpdate}
                    onPress={() => { updateTodo() }}>
                    <Text>UPDATE NOTE</Text>
                </Pressable>
                <FontAwesome name="trash-o"
                    color="red"
                    onPress={() => deleteTodo(item)}
                    style={styles.todoIcon} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    textfield: {
        flex: 5,
        marginBottom: 10,
        padding: 10,
        fontSize: 20,
        color: "#000000",
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        textAlignVertical: 'top',
        elevation: 5,
    },
    buttonUpdate: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#0de065',
        width: '70%',
        marginLeft: 10
    },
    buttonUpdatee: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    todoIcon: {
        fontSize: 40,
        justifyContent: 'flex-end',
        marginRight: 20,
    },
});

export default Detail





















