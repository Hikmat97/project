
import 'react-native-gesture-handler';
import { NavigationContainer , DarkTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useState } from 'react';


import Detail from './Screens/Detail';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp'
import AddNote from './Screens/AddNote'
import { StatusBar } from 'react-native';
import ForgetPassword from './Screens/ForgetPassword';
import { useEffect } from 'react';


import { EventRegister } from 'react-native-event-listeners';

import Theme from './DarkMode/Theme'
import ThemeContext from './DarkMode/ThemeContext'
import { DefaultTheme } from 'react-native-paper';

import Home from './Screens/Home';




const Stack = createNativeStackNavigator();


export default function App() {


  

 const [darkMode, setDarkMode] = useState(false);

 useEffect(()=>{
const listener = EventRegister.addEventListener('ChangeTheme', (data)=>{
  setDarkMode(data)
})
return()=>{
  EventRegister.removeAllListeners(listener);
}
 },[darkMode]);



  return (
    <ThemeContext.Provider value ={ darkMode === true ? Theme.dark : Theme.light}>
    <NavigationContainer theme={darkMode === true ? DarkTheme: DefaultTheme}>
      <StatusBar backgroundColor="#222" barStyle="light-content" />
      <Stack.Navigator >
      <Stack.Screen 
          name='Login'
          component={Login}
          options={{headerShown: false}}
        />
         <Stack.Screen 
          name='Home' 
          component={Home} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name='Detail'
          component={Detail}
        
        />
         <Stack.Screen 
          name='SignUp' 
          component={SignUp} 
        /> 
        <Stack.Screen 
          name='AddNote' 
          component={AddNote} 
        /> 
        <Stack.Screen 
          name='Forget Password' 
          component={ForgetPassword} 
        /> 
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeContext.Provider>
    
  );
}



