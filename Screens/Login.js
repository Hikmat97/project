import React from 'react';
import { useNavigation } from '@react-navigation/native';





import { auth } from '../firebase';
import { useState, useEffect } from 'react';


import { Ionicons } from '@expo/vector-icons';
import Skip from './Skip';
import {
  View,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
 
} from 'react-native';

import 'firebase/auth';







const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  const navigation = useNavigation();



  // checks the user is log in or not
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home");
      }
    })
   
 
    return unsubscribe
  }, []);


 



  const handleLogin = () => {
    if (email.length == 0 || password.length == 0) {
      alert("Please enter valid credetials")
    }
    else {
      setIsLoading(true);
      auth
        .signInWithEmailAndPassword(email, password)
     
        .then(userCred => {
          const user = userCred.user;
          console.log('Logged in with', user.uid);
          navigation.replace("Home");
        
          console.log("Async stored email" , email)
        })
      
        .catch(error => {
          if(error.code === 'auth/network-request-failed'){
            alert("Please check your internet connection and try again.")
          }
          if(error.code === 'auth/wrong-password'){
            alert("Invalid Password!")
          }
          if(error.code === 'auth/invalid-email'){
            alert("Invalid email address provided.")
          }
          if(error.code === 'auth/user-not-found'){
            alert(`Invalid Email Address (User not found!)`);
          
          }

          else{
            alert(error.message);
          }
          setIsLoading(false);
        })
    };
  }


  const handleRegister = () => {
    navigation.navigate("SignUp")
  };

  // text
  const [text, setText] = useState('');
  const originalText = 'Welcome, This Account can help you to recover your notes! 🤗';
  const typingSpeed = 30; // Adjust the typing speed (in milliseconds)
  const repeatDelay = 20000; // Adjust the delay before repeating (in milliseconds)

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    let timer;

    const startTyping = () => {
      if (currentIndex < originalText.length) {
        currentText += originalText[currentIndex];
        setText(currentText);
        currentIndex++;
        timer = setTimeout(startTyping, typingSpeed);
      } else {
        timer = setTimeout(startErasing, repeatDelay);
      }
    };

    const startErasing = () => {
      if (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        setText(currentText);
        timer = setTimeout(startErasing, typingSpeed);
      } else {
        currentIndex = 0;
        timer = setTimeout(startTyping, typingSpeed);
      }
    };

    timer = setTimeout(startTyping, typingSpeed);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  //eye icon
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.containerr}>
      <View style={styles.nicetextView}>
        <Text style={styles.nicetext}>{text}</Text>
      </View>
      <ImageBackground
        source={require('../assets/o.png')}
        style={styles.container}
      >
        <Ionicons name="person-circle" size={74} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <View style={styles.passView}>
          <TextInput
            style={styles.pasInput}
            placeholder="Password"
            // secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
            autoCorrect={false}
            enablesReturnKeyAutomatically
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogin(email, password)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        <View style={styles.bott}>
          <TouchableOpacity style={styles.right} onPress={handleRegister}>
            <Text style={styles.m}>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.left} onPress={() => navigation.navigate("Forget Password")}>
            <Text style={styles.m}>Reset password
            </Text>
          </TouchableOpacity>
        </View>

        <Skip />

      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 3.5,
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
  containerr: {
    flex: 1,
    height: '100%',
    backgroundColor: "#219",

  },
  input: {
    fontSize: 17,
    height: 50,
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 2,
  },
  button: {
    width: '100%',
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
  nicetext: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    padding: 30,
    color: "#ccc",

  },
  passView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 10,
    height: 50,
  },
  iconContainer: {
    paddingHorizontal: 10
  },
  pasInput: {
    flex: 1,
    fontSize: 17,
  },
  bott: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 20,
    width: "100%",
    padding: 10,
  },
  left: {
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
  m: {
    textDecorationLine: "underline",
    color: '#2195F3'
  }
});

export default Login;


