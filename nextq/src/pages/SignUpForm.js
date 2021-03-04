import axios from 'axios';
import { Auth } from '../components/context.js';
import React, { useState, useContext } from 'react';
import { AntDesign, FontAwesome, Feather } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Toastify if import unable to start expo web browser
import Toast from 'react-native-root-toast';

export default function Signup({navigation}) {
    
    // Pass states from setAllState @ App.js using Context & Memo.
    const { loading, setLoadingFalse, setLoadingTrue } = useContext(Auth);
    
    // NEED TO REDO TO SUIT OUR APP
    const [name,setname]=useState("")
    const [password,setpassword]=useState("")
    const [email,setemail]=useState("")
    const [mobile,setmobile]=useState("")

    // Display or Hide Password Input
    // To change state of password secure mode true / false @ <TextInput> secureTextEntry
    const [passwordView, setpasswordView]= useState(true) 

    // Sign Up function
    const handleSignUp = () => { 
        setLoadingTrue()   
        axios({
            method: 'POST',
            url: 'https://nextq.herokuapp.com/api/v1/users',
            data: {
                name: name,
                email: email,
                password: password,
                mobile: mobile
            }
        })
        .then(result => {
            console.log(result)
            console.log("Successfully signed up!")
            setLoadingFalse()
            navigation.navigate("Sign In")
            Toast.show('Successfully sign up!', {
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
                    <AntDesign name="adduser" size={24} color="black"> Sign Up </AntDesign>
                    <View style={styles.form}>
                        <FontAwesome name="user-o" size={18} color="black">
                            Name 
                        </FontAwesome>
                        <View style={styles.textinput}>
                            <View style={styles.textinputicon}>
                                <FontAwesome name="user-o" size={18} color="black"/>
                            </View>
                            <TextInput clearButtonMode='while-editing' textContentType="name" name="name" id="name" placeholder="Username" value={name} style={styles.textinputflex} onChangeText={text => setname(text)}/>
                        </View>
                        <AntDesign name="lock" size={18} color="black">
                            Password
                        </AntDesign>
                        <View style={styles.textinput}>
                            <View style={styles.textinputicon}>
                                <AntDesign name="lock" size={18} color="black"/>
                            </View>
                            <TextInput secureTextEntry={passwordView} clearButtonMode='while-editing' textContentType="password" name="password" id="password" placeholder="Password" value={password} style={styles.textinputflex} onChangeText={text => setpassword(text)}/>
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
                        <Feather name="mail" size={18} color="black" >
                            Email
                        </Feather>
                        <View style={styles.textinput}>
                            <View style={styles.textinputicon}>
                                <Feather name="mail" size={18} color="black" />
                            </View>
                            <TextInput clearButtonMode='while-editing' textContentType="emailAddress" name="email" id="email" placeholder="Email" value={email} style={styles.textinputflex} onChangeText={text => setemail(text)}/>
                        </View>
                        <FontAwesome name="mobile" size={18} color="black" >
                            Mobile
                        </FontAwesome>
                        <View style={styles.textinput}>
                            <View style={styles.textinputicon}>
                                <FontAwesome name="mobile" size={18} color="black"/>
                            </View>
                            <TextInput returnKeyType="send" clearButtonMode='while-editing' textContentType="telephoneNumber" name="mobile" id="mobile" placeholder="Mobile" value={mobile} style={styles.textinputflex} onChangeText={text => setmobile(text)} onSubmitEditing={handleSignUp}/>
                        </View>
                    </View>
                    { 
                    loading 
                    ?
                    <ActivityIndicator animating={true} size='small' color='black' style={styles.button}/>
                    :
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <AntDesign name="adduser" size={24} color="black"/>
                        <Text style={styles.buttontext}> Sign Up </Text>
                    </TouchableOpacity>
                    }
                    <View style={styles.signin} >
                        <Text> Exisiting user? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
                            <Text style={styles.textsignin}> Sign In </Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        flex:0.6,
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
    signin: {
        flex:0.1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    textsignin: {
        color:'blue',
        fontSize:16
    }
})