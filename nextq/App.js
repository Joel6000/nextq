import 'react-native-gesture-handler';
import { Auth } from './src/components/context.js';
import React, { useMemo, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { BottomNavigator } from './src/Navigator/BottomNavigator.js';
import { SignInStackNavigator } from './src/Navigator/StackNavigator.js';

// Toastify if import unable to start expo web browser
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  
  const [loggedIn, setLoggedIn] = useState()
  const [loading, setLoading] = useState(false)
  const [userMobile, setuserMobile]= useState("")
  const [userName, setuserName]= useState("")
  const [userID, setuserID]= useState("")
  const [jwt, setjwt] = useState()
  
  // To get jwt token & store userdata. Act as the same as localstorage in ReactJS
  useEffect(() => {
    const retrieveJWT = async () => {
      try {
        // The keyword await makes JavaScript wait until that promise settles and returns its result.
        const jwt = await AsyncStorage.getItem('jwt');
        if (jwt == null) {
          setLoggedIn(false) // if result == null, return loggedIn state to false which indicates user is not loggedIn.
          setjwt()
        }
        else {
          setLoggedIn(true)
          setjwt(jwt)
          const mobile = await AsyncStorage.getItem('mobile');
          const name = await AsyncStorage.getItem('name');
          const id = await AsyncStorage.getItem('userID');
          if (mobile == null && name == null && id == null) {  
            setuserMobile("") 
            setuserName("")
            setuserID("")
          }
          else {
            setuserMobile(mobile)
            setuserName(name)
            setuserID(id)
          }
        }
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
    }
    retrieveJWT()
  })

  // Pass states to other js files using useMemo and useContext
  const setAllState = useMemo(()=> ({
    loggedIn,
    setLoggedFalse: () => {
      setLoggedIn(false)
    },
    setLoggedTrue: () => {
      setLoggedIn(true)
    },
    loading,
    setLoadingFalse: () => {
      setLoading(false)
    },
    setLoadingTrue: () => {
      setLoading(true)
    },
    jwt,
    userMobile,
    userName,
    userID,
  }));

  return (
    <Auth.Provider value={setAllState}>
      <RootSiblingParent>
        <NavigationContainer>
          {loggedIn 
          ?
          <BottomNavigator/>
          :
          <SignInStackNavigator/>
          }
        </NavigationContainer>
      </RootSiblingParent>
    </Auth.Provider>
  );
}