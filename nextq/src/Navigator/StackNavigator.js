import React from "react";
import Home from '../pages/Homepage.js';
import onCamera from "../pages/Camera.js";
import History from "../pages/History.js";
import Welcome from "../pages/Welcome.js";
import Shoppage from '../pages/Shoppage.js';
import Signup from "../pages/SignUpForm.js";
import Signin from "../pages/SignInForm.js";
import Checkin from '../pages/Checkinpage.js';
import Profilepage from "../pages/Profilepage.js";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, AntDesign, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:'lightgrey'
      }
    }}>
      <Stack.Screen name="Home" component={Home} headerStyle={{backgroundColor:'grey'}} options={{ title: <Ionicons name="home" size={18} color="black"> Home </Ionicons> }} />
      <Stack.Screen name="Sign In" component={Signin} options={{ title: <FontAwesome name="sign-in" size={18} color="black"> Sign In </FontAwesome> }} />
      <Stack.Screen name="Sign Up" component={Signup} options={{ title: <AntDesign name="adduser" size={18} color="black"> Sign Up </AntDesign> }} />
    </Stack.Navigator>
  );
}

const ShopStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:'lightgrey'
      }
    }}>
      <Stack.Screen name="Shops" component={Shoppage} options={{ title: <Entypo name="shop" size={18} color="black"> Shops </Entypo> }}/>
    </Stack.Navigator>
  )
}

const CheckInStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:'lightgrey'
      }
    }}>
      <Stack.Screen name="Scan" component={Checkin} options={{ title: <Ionicons name="scan" size={18} color="black"> Scan </Ionicons> }} />
      <Stack.Screen name="Camera" component={onCamera} options={{ title: <Entypo name="camera" size={18} color="black"> Camera </Entypo> }} />   
      <Stack.Screen name="Sign In" component={Signin} options={{ title: <FontAwesome name="sign-in" size={18} color="black"> Sign In </FontAwesome> }} />   
    </Stack.Navigator>
  );
}

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:'lightgrey'
      }
    }}>
      <Stack.Screen name="Profile" component={Profilepage} options={{ title: <FontAwesome name="user-o" size={18} color="black"> Profile </FontAwesome> }} />
      <Stack.Screen name="Sign Up" component={Signup} options={{ title: <AntDesign name="adduser" size={18} color="black"> Sign Up </AntDesign> }} />
      <Stack.Screen name="Sign In" component={Signin} options={{ title: <FontAwesome name="sign-in" size={18} color="black"> Sign In </FontAwesome> }} />
    </Stack.Navigator>
  );
}

const HistoryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:'lightgrey'
      }
    }}>
      <Stack.Screen name="History" component={History} options={{ title: <MaterialCommunityIcons name="history" size={18} color="black"> History </MaterialCommunityIcons> }} />
    </Stack.Navigator>
  )
}

const SignInStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:'lightgrey'
      }
    }}>
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Sign In" component={Signin} options={{ headerShown: false, title: <FontAwesome name="sign-in" size={18} color="black"> Sign In </FontAwesome> }} />
      <Stack.Screen name="Sign Up" component={Signup} options={{ headerShown: false, title: <AntDesign name="adduser" size={18} color="black"> Sign Up </AntDesign> }} />
    </Stack.Navigator>
  );
}

export { HomeStackNavigator, ShopStackNavigator, CheckInStackNavigator, ProfileStackNavigator, HistoryStackNavigator, SignInStackNavigator };