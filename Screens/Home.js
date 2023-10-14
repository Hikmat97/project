import { firebase } from '../config.js';
import { auth } from '../firebase';

import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@expo/vector-icons";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity
} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import { Ionicons } from '@expo/vector-icons';

import { Switch } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import ThemeContext from '../DarkMode/ThemeContext.js';


const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection('todos');
  const uid = firebase.auth().currentUser.uid;

 
  const navigation = useNavigation();
  //longpresss
  const [selectedItems, setSelectedItems] = useState([]);
  const handleItemLongPress = (item) => {
    const isSelected = selectedItems.includes(item.id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== item.id));
    } else {
      setSelectedItems([...selectedItems, item.id]);
    }
  };
  

  //Dark mode
  const [darkMode , setDarkMode] = useState(false);
  const Theme = useContext(ThemeContext);


  useEffect(() => {
    const unsubscribe = todoRef
      .where('uid', '==', uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const todos = [];
        querySnapshot.forEach(doc => {
          const { heading, createdAt } = doc.data();
          const createdAtString = new Date(createdAt?.seconds * 1000).toLocaleString();
          todos.push({
            id: doc.id,
            heading,
            createdAt: createdAtString,
          });
        });
        setTodos(todos);
      });
    // get the values from state
    [todos]
    return unsubscribe;
  }, [uid]);

  //signout

  const handleSignout = () => {
    auth
      .signOut()
      
      .then(() => {
        navigation.replace("Login");
      
      })
      .catch(error => alert(error.message));
  };


  // if there is no email or anonymous lig in 
  const email = auth.currentUser?.email;
  const displayText = email ? email : 'Anonymous';


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
  }

  return (
    <View style={{ flex: 1, backgroundColor: Theme.backgroundColor }}>
      
      <View style={styles.formContainer}>
     
        <Text style={[styles.profile , {color : Theme.color}]}>
        {/* <Ionicons name="person-circle" size={24}  /> */}
          {displayText}
          </Text>
          <Switch
           value = {darkMode} 
           onValueChange={(value) => 
            {setDarkMode(value);
              EventRegister.emit('ChangeTheme', value);

            
            }}
           >

          </Switch>
        <TouchableOpacity style={styles.button} onPress={handleSignout}>
          <Text style={styles.buttonText}>Signout</Text>
         
        </TouchableOpacity>
      </View>
      <View style={[styles.horizontalLine , {borderBottomColor : Theme.color}]}></View>
      {todos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText , {color : Theme.color}]}>Please add your notes!</Text>
        </View>
      ) : (
        <FlatList
          style={{}}
          data={todos}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View>
              <Pressable
                style={styles.container}
                onPress={() => navigation.navigate('Detail', { item })}
                onLongPress={() => handleItemLongPress(item)}
              >
                {selectedItems.includes(item.id) && (
                  <FontAwesome name="trash-o"
                    color="red"
                    onPress={() => deleteTodo(item)}
                    style={styles.todoIcon} />
                )}
                <Text style={styles.text}>{` ${index + 1}`}</Text>
                <View style={styles.innerContainer}>
                  <Text numberOfLines={1} style={styles.itemHeading}>
                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                  </Text>
                  <Text style={styles.itemCreatedAt}>{item.createdAt}</Text>
                </View>
              </Pressable>
            </View>
          )}
        />
      )}
      <TouchableOpacity style={styles.buttonn} onPress={() => navigation.navigate('AddNote')}>
        <Text style={styles.buttonTextt}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 10,
    margin: 7,
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 6,
    height: 80,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
   
  },
  innerContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginLeft: 35,
    
  },
  itemHeading: {
    fontSize: 20,
    marginRight: 32,
  },
  formContainer: {
    flexDirection: 'row',
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
   
    alignItems:"center"
  },
  input: {
    height: 48,
    fontSize: 20,
    overflow: 'hidden',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
    marginTop: 5,
    fontWeight: 'bold',
  },
  button: {
    height: 35,
    borderRadius: 20,
    width: 90,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#8B0000',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  buttonTextt: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonn: {
    height: 70,
    borderRadius: 100,
    backgroundColor: '#444',
    width: 70,
    alignItems: "center",
    justifyContent: 'center',
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    elevation: 15,
  },
  itemCreatedAt: {
    left: 0,
    fontSize: 12,
    color: 'gray',
    marginRight: 8,
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: "60%",
    fontSize: 24,
  },
  horizontalLine: {
  
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  deleteButton: {
    height: 35,
    borderRadius: 20,
    width: 40,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#8B0000',
    elevation: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
  todoIcon: {
    fontSize: 25,
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  profile:{
    height: 48,
    fontSize: 17,
    flex: 1,
    marginRight: 3,
    fontWeight: 'bold',
    overflow: 'hidden',
  
  }
});

export default Home







// import React from 'react';
// import { View, Text, Button } from 'react-native';

// const Home = ({ navigation }) => {
//   return (
//     <View>
//       <Text>Welcome to the Home Screen!</Text>
//       {/* Your Home Screen content here */}
//       <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
//     </View>
//   );
// };

// export default Home;




