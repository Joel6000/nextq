import axios from 'axios';
import { Auth } from '../components/context.js';
import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign, FontAwesome, Feather } from '@expo/vector-icons'; 
import { StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Toastify if import unable to start expo web browser
import Toast from 'react-native-root-toast';

export default function Signin({navigation}) {
    
    // Pass states from setAllState @ App.js using Context & Memo.
    const { setLoggedTrue, loading, setLoadingFalse, setLoadingTrue } = useContext(Auth);
    
    // NEED TO REDO TO SUIT OUR APP
    const [mobile, setmobile]= useState("")
    const [password, setpassword]= useState("")

    // Display or Hide Password Input ( true / false @ <TextInput> secureTextEntry )
    const [passwordView, setpasswordView]= useState(true) 

    // storeUserData function
    const storeUserData = async (valueMobile, valueName,  valueJWT, valueID) => {
        try {
            // The keyword await makes JavaScript wait until that promise settles and returns its result.
            await AsyncStorage.multiSet(
                [['mobile',valueMobile], ['name', valueName], ['jwt',valueJWT], ['userID',valueID]]
            );
        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
    }

    // Sign In function
    const handleSignIn = () => {
        setLoadingTrue()
        axios({
          method: 'POST',
          url: 'https://nextq.herokuapp.com/api/v1/auth/user',
          data: {
            mobile: mobile,
            password: password
          }
        })
        .then(result => {
            console.log(result.data)
            console.log("Successfully signed in!")
            // Async just allow to set item with string - This to convert number into string.
            const userID = JSON.stringify(result.data.user_id)
            storeUserData(result.data.mobile, result.data.name, result.data.token, userID)
            setLoadingFalse()
            setLoggedTrue()
            Toast.show('Successfully sign in!', {
                duration: Toast.durations.LONG,
                position: 90,
                textColor: 'black',
                backgroundColor: 'green',
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        })
        .catch(error => {
            console.log("Error:" ,error)
            setLoadingFalse()
            Toast.show(`${error}`, {
                duration: Toast.durations.LONG,
                position: 90,
                textColor: 'black',
                backgroundColor: 'red',
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        })
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.safecontainer}>    
                <View style={styles.container}>
                    <FontAwesome name="sign-in" size={24} color="black"> Sign In </FontAwesome> 
                    <View style={styles.form}> 
                        <FontAwesome name="mobile" size={18} color="black">
                            Mobile
                        </FontAwesome>
                        <View style={styles.textinput}>
                            <View style={styles.textinputicon}>
                                <FontAwesome name="mobile" size={18} color="black"/>
                            </View>
                            <TextInput clearButtonMode='while-editing' textContentType="telephoneNumber" name="mobile" id="mobile" placeholder="Mobile number" value={mobile} style={styles.textinputflex} onChangeText={text => setmobile(text)}/>
                        </View>
                        <AntDesign name="lock" size={18} color="black">
                            Password
                        </AntDesign>
                        <View style={styles.textinput}>
                            <View style={styles.textinputicon}>
                                <AntDesign name="lock" size={18} color="black"/>
                            </View>
                            <TextInput returnKeyType="send" secureTextEntry={passwordView} clearButtonMode='while-editing' textContentType="password" name="password" id="password" placeholder="Password" style={styles.textinputflex} onChangeText={text => setpassword(text)} onSubmitEditing={handleSignIn}/>
                            { passwordView 
                            ?
                            <TouchableOpacity style={styles.textinputicon} onPress={() => setpasswordView(false)}>
                                <Feather name="eye" size={18} color="black"/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.textinputicon} onPress={() => setpasswordView(true)}>
                                <Feather name="eye-off" size={18} color="black"/>
                            </TouchableOpacity>
                            }
                        </View>
                    </View >
                    { 
                    loading 
                    ?
                    <ActivityIndicator animating={true} size='small' color='black' style={styles.button}/>
                    :
                    <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                        <FontAwesome name="sign-in" size={24} color="black"/>
                        <Text style={styles.buttontext}> Sign In </Text>
                    </TouchableOpacity>
                    }
                    <View style={styles.signup} >
                        <Text>Dont have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
                            <Text style={styles.textsignup}> Sign Up </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    safecontainer: {
        flex:1,
        backgroundColor:'black'
    },
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent: 'center'
    },
    form: {
        flex:0.3,
        alignItems:'center',
        justifyContent:'center',
        width: "80%",
        height: "50%"
    },
    button: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width: 187,
        height: 46,
        borderRadius:50,
        shadowOffset: {
            width: 5,
            height: 5
          },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        backgroundColor: 'orange'
    },
    buttontext: {
        color:'white',
        fontSize:20
    },
    textinput:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderColor:'grey',
        borderWidth:0.5,
        borderRadius:5,
        width: "80%",
        height: 55,
        padding: 10,
    },
    textinputicon:{
        flex:0.1, 
        alignItems:'center'
    },
    textinputflex: {
        flex:1,
        height:'100%',
        marginLeft:5,
    },
    signup: {
        flex:0.1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    textsignup: {
        color:'blue',
        fontSize:16
    }
})