import { auth } from '../firebase';

import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  TextInput,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home")
      }
    })
    return unsubscribe
  }, [])


  const handleRegister = () => {
    if (email.length == 0 || password.length == 0) {
      alert("Please Enter valid credential.!")
    }
    else {
      setIsLoading(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Register with', user.email);
        })
        .catch(error => {
          if(error.code === 'auth/email-already-in-use'){
            alert("This Email is already registered.")
          }
          if(error.code === 'auth/invalid-email'){
            alert("Invalid email address provided.")
          }
          if(error.code === 'auth/network-request-failed'){
            alert("Please check your internet connection and try again.")
          }
          if(error.code === 'auth/weak-password'){
            alert("The Password should be at least 6 characters long.")
          }
          else{
            alert(error.code)
          }
        })
        .finally(() => {
          setIsLoading(false); // Set loading state back to false
        });
    }
  }

  return (
    <View style={styles.containerr}>
      <View style={styles.nicetextView}>
        <Text style={styles.nicetext}>Sign Up.</Text>
      </View>
      <ImageBackground
        source={require('../assets/o.png')}
        style={styles.container}
      >
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>SignUp</Text>
          )}

        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerr: {
    flex: 1,
    height: '100%',
    backgroundColor: "#219"
  },
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 56,
    // borderRadius: 56, 
    overflow: 'hidden',
    borderTopEndRadius: 210,
    // borderTopStartRadius:77,
    borderTopColor: '#a32',
    borderTopWidth: 2,
    borderBottomColor: '#a32',
    borderBottomWidth: 0.5,
  },
  nicetextView: {
    flex: 1,
    backgroundColor: "#219",
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomStartRadius:250,
  },
  nicetext: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    padding: 30,
    color: "#ccc"
  },
  input: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10
  },
  button: {
    width: '100%',
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    elevation: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
});

export default SignUp;
