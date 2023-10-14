import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'; 


import { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';



function ForgetPassword({route}) {
   const [email, setEmail] = useState('');
  // const uid = firebase.auth().currentUser.uid;



  //forget password
  const handleResetPassword = () => {

    if (email.length == 0) {
      alert("Please enter valid E-mail address");
    }
    else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          // Password reset email sent successfully
          console.log('Password reset email sent');
          navigation.navigate("Login")
        })
        .catch((error) => {
          // An error occurred while sending the password reset email
          console.error(error);
        });
      Alert.alert("Password reset email will be sent within a minut!")
    };
  }



const navigation = useNavigation();

  
 





  return (
    <View style={styles.containerr}>


{/* <TouchableOpacity style={styles.button} onPress={handleSignout}>
          <Text style={styles.buttonText}>Signout</Text>
        </TouchableOpacity> */}





      <View style={styles.nicetextView}>
        <Text style={styles.nicetext}>
  
          Enter you Email and reset your Password.</Text>
      </View>
      <ImageBackground
        source={require('../assets/o.png')}
        style={styles.container}
      >
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TouchableOpacity style={styles.left} onPress={handleResetPassword}>
          <Text style={styles.m}>Reset password
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default ForgetPassword;

const styles = StyleSheet.create({
  left: {
    alignItems: 'center',
    justifyContent: "center",
    width: '60%',
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    elevation: 10,
  },
  input: {
    fontSize: 17,
    height: 50,
    width: '90%',
    marginBottom: 15,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
  },
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

})