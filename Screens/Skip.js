import { auth } from '../firebase';

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Spinner from 'react-native-loading-spinner-overlay';

function Skip() {
  const [isLoading, setIsLoading] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };


  //Sign in Anonymously
  const signInAnonymously = () => {
    setIsLoading(true);
    auth
      .signInAnonymously()
      .then((userCredential) => {
        // Signed in anonymously
        const user = userCredential.user;
        
        console.log("Anonymous user ID: ", user.uid);
        // Additional logic or operations after sign-in
        navigation.replace("Home");
        Alert.alert("Success", "Signed in anonymously");
      })
      .catch((error) => {
        // Handle any errors that occur during sign-in
        if(error.code === 'auth/network-request-failed'){
          alert("Please check your internet connection and try again.")
        }
        else{
          const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: ", errorCode, errorMessage);
        Alert.alert("Error", errorMessage);
        setIsLoading(false);

        }
        
      });
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.buttton, { transform: [{ scale: scaleValue }] }]}
        onPress={signInAnonymously}>
        <Text style={styles.buttonText}>Skip
          <Ionicons name="arrow-forward" size={17} color="white" />
        </Text>
      </TouchableOpacity>
      <Spinner visible={isLoading} />
    </View>
  );
}

export default Skip;

const styles = StyleSheet.create({
  buttton: {
    height: 60,
    borderRadius: 100,
    backgroundColor: '#2195',
    width: 60,
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 30,
    alignSelf: 'center',
    elevation: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
})