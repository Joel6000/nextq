import React, { useContext } from 'react';
import { Card } from 'react-native-elements';
import { Auth } from '../components/context.js';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';

// Toastify if import unable to start expo web browser
import Toast from 'react-native-root-toast';

export default function Profilepage({navigation}) {

  // Pass states from setAllState @ App.js using Context & Memo.
  const { loggedIn, setLoggedFalse, loading, setLoadingFalse, setLoadingTrue, userName, userMobile } = useContext(Auth); 

  // Remove store userData
  const removeuserData = async() => {
    try {
      await AsyncStorage.multiRemove(['jwt', 'userID', 'mobile', 'name', 'store', 'checkin' , 'queue']) ;
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  // Sign out function
  const handleSignOut = () => {
    setLoadingTrue()
    // Remove both 'jwt' and 'userID' from AsyncStorage. Act as the same as localstorage in ReactJS
    removeuserData()
    setLoadingFalse()
    console.log("Succesfully signed out!")
    setLoggedFalse()
    Toast.show('Successfully sign out!', {
      duration: Toast.durations.LONG,
      position: 45,
      textColor: 'black',
      backgroundColor: 'green',
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }

  return (
    <SafeAreaView style={styles.safecontainer}>
    <StatusBar barStyle='dark-content'/>
      { loggedIn
      ?
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.imageBox}>
              <View style={styles.profileImage}>
                <Image source={require('../Images/pepega.png')} style={styles.image} resizeMode="center"></Image>
              </View>
            </View>
        </View>
        <Card containerStyle={styles.CardBottomContainer}>
          <View style={styles.buttoncontainer}>
            <View style={styles.username}>
              <FontAwesome name="user-o" size={18} color="black"/>
              <Text style={styles.text}> {userName}</Text>
            </View>
            <View style={styles.phonenumber}>
              <FontAwesome name="mobile" size={18} color="black"/>
              <Text style={styles.text}> {userMobile} </Text>
            </View>
          </View>
          <View style={styles.signoutplacement}>
            { loading
            ?                     
            <ActivityIndicator animating={true} size='small' color='black' style={styles.button}/>
            :
            <TouchableOpacity style={styles.button} onPress={handleSignOut} >
              <FontAwesome name="sign-out" size={24} color="black" />
              <Text style={styles.buttontextinout}> Sign Out </Text>
            </TouchableOpacity>
            }
          </View>
        </Card>
      </View>
      :
      <View style={styles.container}>
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>Welcome back !</Text>
          <Text style={styles.notificationBodyText}>Please sign in to your account </Text>
          <View style={styles.buttonplacement}>
            <TouchableOpacity style={styles.button} title="Sign Up" //Need to move to new page
              onPress={() => navigation.navigate("Sign Up")}>
                <AntDesign name="adduser" size={24} color="black"/>
                <Text style={styles.buttontextinout}> Sign Up </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} title="Sign Up" //Need to move to new page
              onPress={() => navigation.navigate("Sign In")}>
                <FontAwesome name="sign-in" size={24} color="black"/>
                <Text style={styles.buttontextinout}> Sign In </Text>
            </TouchableOpacity>
          </View> 
        </View>
      </View>
      } 
    </SafeAreaView> 
  );
}

const styles=StyleSheet.create({
  safecontainer: {
    flex:1,
    backgroundColor:'black'
  },
  // loggedIn
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:  'center',
    backgroundColor: "#fff",
  },
  topContainer: {
    flex:0.4,
    justifyContent:'center',
  },
  text: {
    fontFamily: "Helvetica",
    color: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageBox: {
    flex:0.8,
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius:100,
    borderColor:"#ffffff",
    backgroundColor: "#C4C4C4",
    margin:5,
  },
  CardBottomContainer: {
    justifyContent:'center',
    width: "80%",
    flex:0.5,
    borderRadius:50,
    borderWidth:0.25,
    borderColor:'lightgrey',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowRadius: 6,
    shadowOpacity: 0.2
  },
  buttoncontainer: {
    height:"80%",
    alignItems:'center'
  },
  username: {
    flexDirection:'row',
    margin:5,
    height:50,
    width:'60%',
    borderRadius:20,
    justifyContent: "center",
    backgroundColor:'#F18606',
    alignItems: "center",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowRadius: 6,
    shadowOpacity: 0.2
  },
  text: {
    color: "white",
    fontFamily: "Helvetica",
    fontSize:18,
  },
  phonenumber: {
    flexDirection:'row',
    height:50,
    width:"60%",
    borderRadius: 20,
    margin:5,
    backgroundColor:"#F18606",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowRadius: 6,
    shadowOpacity: 0.2,
  },
  signoutplacement: {
    height:"20%",
    alignItems:'center',
    justifyContent:'center'
  },
  buttonplacement: {
    flexDirection:'row',
  },
  button: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    margin:5,
    width: 125,
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
  buttontextinout: {
    fontSize: 20,
    color:'white'
  },
  // loggedOut
  notificationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    paddingBottom: 30,
    fontFamily: "Helvetica",
    fontSize: 30
  },
  notificationBodyText: {
    paddingBottom: 30,
    fontFamily: "Helvetica",
    fontSize: 20
  },
})