import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { Auth } from '../components/context.js';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native';

export default function Homepage({navigation}) {

  // Pass states from setAllState @ App.js using Context & Memo.
  const { loggedIn } = useContext(Auth); 
  
  return (
    <SafeAreaView style={styles.safecontainer}>
      <StatusBar barStyle='dark-content'/>
      <View style={styles.container}>
        <View style={styles.topcontainer}>
          <View style={styles.image}>
            <Text style={styles.textq}>Q</Text>
            <Text style={styles.textnextq}>NextQ</Text>
            <Image style={styles.homeimage} source={require('../Images/home.png')}/>
          </View>
          <View style={styles.test}>
            <Text style={styles.textstart}> Start </Text>
            <Text style={styles.textdescription}> Dont waste your time queuing! </Text>
            { 
            loggedIn 
            ? <TouchableOpacity style={styles.power} onPress={() => navigation.navigate("Scan")}>
                <Ionicons name="power" size={125} color="black"/>
              </TouchableOpacity>
            : <TouchableOpacity style={styles.power} onPress={() => navigation.navigate("Sign In")}>
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
  safecontainer:{
    flex:1,
    backgroundColor:'black'
  },
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  topcontainer: {
    flex:1,
    justifyContent:'center'
  },
  image: {
    flex:0.6,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
  },
  test: {
    flex:0.4,
    width: '100%',
    alignItems:'center',
    justifyContent:'center'
  },
  homeimage:{
    width: 350,
    height: 153
  },
  textq: {
    fontSize:65,
    color:'gold'
  },
  textnextq: {
    fontSize:25,
    color:'black'
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