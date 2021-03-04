import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { Auth } from '../components/context.js';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

export default function Welcome({navigation}) {

    // Pass states from setAllState @ App.js using Context & Memo.
    const { loggedIn } = useContext(Auth);

    return (
        <SafeAreaView style={styles.safecontainer}>
            <View style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.image}>
                        <View style={styles.imagetext}>
                            <Text style={styles.textq}>Q</Text>
                            <Text style={styles.textnextq}>NextQ</Text>
                        </View>
                        <Image style={styles.homeimage} source={require('../Images/home.png')}/>
                    </View>
                    <View style={styles.powercont}>
                        <Text style={styles.textstart}> Start </Text>
                        <Text style={styles.textdescription}> Dont waste your time queuing! </Text>
                        { 
                        loggedIn 
                        ?   <TouchableOpacity style={styles.power} onPress={() => navigation.navigate("Scan")}>
                                <Ionicons name="power" size={125} color="black"/>
                            </TouchableOpacity>
                        :       <TouchableOpacity style={styles.power} onPress={() => navigation.navigate("Sign In")}>
                                <Ionicons name="power" size={125} color="black"/>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safecontainer: {
        flex:1,
        backgroundColor:'black'
    },
    container: {
        flex:1,
        justifyContent:'center',
        backgroundColor: '#fff',
    },
    image: {
        flex:0.5,
        alignItems:'center',
        justifyContent:'space-around'
    },
    imagetext: {
        flex:0.6,
        alignItems:'center',
        justifyContent:'center'
    },
    powercont: {
        flex:0.4,
        width: '100%',
        alignItems:'center',
        justifyContent:'center'
    },
    textq: {
        fontSize:65,
        color:'gold',
        margin:5,
    },
    textnextq: {
        fontSize:25,
        color:'black',
        margin:5,
    },
    homeimage:{
        width: "80%",
        height: 150,
    },
    textstart: {
        fontSize:50,
        color:'black'
    },
    textdescription: {
        fontSize:20,
        color:'black'
    },
    power: {
        backgroundColor:'transparent',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowRadius: 6,
        shadowOpacity: 0.2,
    }
})