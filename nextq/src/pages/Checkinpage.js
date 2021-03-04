import axios from 'axios';
import { Card } from 'react-native-elements';
import { Auth } from '../components/context.js';
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { MaterialCommunityIcons, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, StatusBar, ScrollView, RefreshControl } from 'react-native';

export default function Checkin({navigation}) {

  // Pass states from setAllState @ App.js using Context & Memo.
  const { loggedIn, userID } = useContext(Auth); 

  // Save store name
  const [ storeName, setStoreName ] = useState("")

  // Checked In status
  const [ checkedIN, setcheckedIN ] = useState()

  // Queue Status
  const [ queueStatus, setqueueStatus ] = useState(null)
  
  // Retrieve Store Name 
  const retrieveStoreName = async () => {
    try {
      // The keyword await makes JavaScript wait until that promise settles and returns its result.
      const store = await AsyncStorage.getItem('store');
      if (store == null) {
        setStoreName("")
      } else {
        setStoreName(store)
      }
    } 
    catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  // Retrieve queue 
  const retrieveQueue = async () => {
    try {
      // The keyword await makes JavaScript wait until that promise settles and returns its result.
      const queue = await AsyncStorage.getItem('queue');
      if (queue == null) {
        setqueueStatus(false)
      } else {
        setqueueStatus(true)
      }
    } 
    catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  // Retrieve check in 
  const retrieveCheckIn = async () => {
    try {
      // The keyword await makes JavaScript wait until that promise settles and returns its result.
      const checkin = await AsyncStorage.getItem('checkin');
      if (checkin == null) {
        setcheckedIN(false)
      } else {
        setcheckedIN(true)
      }
    } 
    catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  
  // Retrieve functions
  retrieveQueue();
  retrieveCheckIn();
  retrieveStoreName();

  // Queue number
  const [ queue, setqueue ] = useState("")

  // Notification
  const [ notification, setnotification ] = useState("")

  useEffect(() => {    
    const getQ = async() => {
      const id = await AsyncStorage.getItem('userID');
      if (queueStatus == true) {
        axios.get(`https://nextq.herokuapp.com/api/v1/queue/${id}`)
        .then (result => {
          console.log(result.data)
          setnotification(result.data.notification)
          setqueue(result.data.queue_number)
        })
        .catch (error => {
          console.log('ERROR: ',error)
        })
      } else {
        console.log("You are not in an queue!")
      }
    }
    getQ();
  },[])

  // Refreshing extract from react native doc @ RefreshControl https://reactnative.dev/docs/refreshcontrol
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (queueStatus == true) {
      axios.get(`https://nextq.herokuapp.com/api/v1/queue/${userID}`)
      .then (result => {
        console.log(result.data)
        setnotification(result.data.notification)
        setqueue(result.data.queue_number)
      })
      .catch (error => {
        console.log('ERROR: ',error)
      })
    } else {
      console.log("You are not in an queue!")
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // Allow whenever return to this page refresh the screen. Doc @ https://reactnavigation.org/docs/navigation-events/#navigationaddlistener
  // Example @ https://reactnativeforyou.com/how-to-make-the-screen-refresh-when-navigating-back-in-react-native/
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshing(true)
      // if queueStatus is true whenever return back to checkinpage call the API to get the queue number.
      if (queueStatus == true) {
        axios.get(`https://nextq.herokuapp.com/api/v1/queue/${userID}`)
        .then (result => {
          console.log(result)
          setnotification(result.data.notification)
          setqueue(result.data.queue_number)
        })
        .catch (error => {
          console.log('ERROR: ',error)
        })
      } else {
        console.log("You are not in an queue!")
      }
      setRefreshing(false)
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safecontainer}>
      <StatusBar barStyle='dark-content'/>
      <ScrollView contentContainerStyle={styles.refresh}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.container}>
          <Card containerStyle={styles.card}>
            { loggedIn 
            ? 
            <View style={styles.cardtext}>
              { checkedIN
              ?
              <View>
                <Text style={styles.queue}>
                  <Entypo name="shop" size={30} color="black"> {storeName} </Entypo>
                  {"\n"}
                  Please remember to checkout!
                </Text>
              </View>
              :
              <View>
                { queueStatus 
                ? 
                <Text style={styles.queue}>
                  <Entypo name="shop" size={30} color="black"> {storeName} </Entypo>
                  {"\n"}
                  <FontAwesome name="user" size={30} color="black">: {queue} </FontAwesome>
                  {"\n"}
                  <Text style={styles.queue}>
                    {notification}
                  </Text>
                </Text>
                : 
                <Text style={styles.queue}>
                  Please scan to check into queue!
                </Text>
                }
              </View>
              }
            </View>
            : 
            <View style={styles.cardtext}> 
              <Text style={styles.welcometext}>
                Welcome back!
              </Text>
              <Text style={styles.descriptiontext}>
                Please sign in if you are an exisitng user to enjoy the features
              </Text>
            </View>
            } 
          </Card>
          <View style={styles.qrcode}>
            <MaterialCommunityIcons name="qrcode-scan" size={150} color="black" />
          </View>
          { loggedIn 
          ? 
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
            <Ionicons name="scan" size={25} color="white"/>
            <Text style={styles.buttontext}>
              SCAN
            </Text>
          </TouchableOpacity>
          : 
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
            <Ionicons name="scan" size={25} color="white"/>
            <Text style={styles.buttontext}>
              SCAN
            </Text>
          </TouchableOpacity> 
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safecontainer: {
    flex:1,
    backgroundColor:'#fff'
  },
  refresh: {
    flex:1,
    backgroundColor: '#fff',
  },
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent: 'center'
  },
  card :{
    flex:0.3,
    width:'80%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:25,
    borderWidth:0.25,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowRadius: 6,
    shadowOpacity: 0.2
  },
  cardtext: {
    justifyContent:'center',
    width:'100%', 
  },
  queue: {
    fontSize:20,
    textAlign:'center',
  },
  welcometext: {
    fontSize:25,
    margin:5,
    textAlign:'center'
  },
  descriptiontext: {
    fontSize:16,
    textAlign:'center'
  },
  qrcode: {
    flex:0.4,
    justifyContent:'center'
  },
  button: {
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    width: '40%',
    height: "7.5%",
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
  margin:5,
  color:'white',
  fontSize:20
  },
})