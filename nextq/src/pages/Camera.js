import axios from 'axios';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
import { Auth } from '../components/context.js';
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, StatusBar} from 'react-native';

export default function onCamera({navigation}) {

  // Pass states from setAllState @ App.js using Context & Memo.
  const { jwt, userID } = useContext(Auth);
  
  // Store store name
  const savestoreName = async (storeData) => {
    try {
      // The keyword await makes JavaScript wait until that promise settles and returns its result.
      await AsyncStorage.setItem('store', storeData);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  // Store check in data
  const savecheckIN = async() => {
    try {
      // The keyword await makes JavaScript wait until that promise settles and returns its result.
      await AsyncStorage.setItem('checkin', "Checked In"); 
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  // Store queue data
  const saveQueue = async() => {
    try {
      // The keyword await makes JavaScript wait until that promise settles and returns its result.
      await AsyncStorage.setItem('queue', "In queue");
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  
  // Remove queue
  const removeQueue = async() => {
    try {
      // The keyword await makes JavaScript wait until that promise settles and returns its result.
      await AsyncStorage.removeItem('queue');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  // Check out and remove store name
  const removecheckIN_store = async() => {
    try {
      await AsyncStorage.multiRemove(['checkin', 'store']);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  
  // Camera QR code example @ https://docs.expo.io/versions/latest/sdk/camera/
  const [scanned, setScanned] = useState(false); // QR Scan @ <Camera> onBarCodeScanned 
  const [hasPermission, setHasPermission] = useState(null); // Permission to allow use of camera from device 
  const [flashtype, flashsetType] = useState(Camera.Constants.FlashMode.off); // Allow flashing @ <Camera> flashMode

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    axios.post(`https://nextq.herokuapp.com/api/v1/history/${userID}/user/${data}`,
    { "Hello" : "World"},
    {
      headers: {
        "Authorization" : "Bearer " + jwt
      }
    })
    .then(result => {
      let response = result.data
      console.log(response)
      if (Object.keys(result.data).length == 1) {
        if (response.error == "User is not checked out from previous store.") {
          // Required user to checkout before check in new store
          navigation.navigate('Scan')
          alert("User is not checked out from previous store! \n Please checkout from the previous store!")
        } else if (response.error == "Shop is full. Please wait at somewhere comfortable.") {
          // Shop is full, right now is in queue and wanna to check in 
          navigation.navigate('Scan')
          alert("Shop is full. Please wait at somewhere comfortable.")
        } else if (response.error == "You are already in the shop."){
          // if you are in the same shop currently
          navigation.navigate('Scan')
          alert("You are already in the shop currently.")
        } else {
          // Someone ahead of you, please dont jump queue
          navigation.navigate('Scan')
          alert("Not your turn yet. Please come back later.")
        }
      } 
      else if (Object.keys(result.data).length == 3) {
        if (response.type == "queue") {
          // Shop is full, no one ahead of you in queue and just joined the queue
          savestoreName(result.data.store)
          saveQueue()
          console.log("You're in the queue right now!")
          navigation.navigate('Scan')
          alert("You're in the queue right now!")
        }
      } 
      else if (Object.keys(result.data).length == 4) {
        // If someone is ahead of you, you are still under the queue
        if (response.type == "queue") {
          savestoreName(result.data.store)
          saveQueue()
          console.log(AsyncStorage.getItem('queue'))
          navigation.navigate('Scan')
          alert("Someone is ahead of you!")
        } else {
        // No one is ahead of you, directly check in
        removeQueue()
        savecheckIN()
        savestoreName(result.data.store)
        console.log(`Check in @ ${result.data.store}`)
        navigation.navigate('Scan')
        alert("Checked In")
        }
      } 
      else {
        // Check out
        removecheckIN_store()
        console.log(`Checked out!`)
        navigation.navigate('Scan')
        alert("Checked Out!")
      }
    })
    .catch(error => {
      alert("Error Invalid QR code");
      console.log("Error:" ,error)
    }) 
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content'/>
      <Camera flashMode={flashtype} 
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.camera]}>
        <View style={styles.view}>
            <View style={styles.cameratext}>
            { scanned && 
              <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                <Text style={styles.text}>Tap to Scan Again</Text>
              </TouchableOpacity> }
            </View>
            <View style={styles.cameraqr} >
              { scanned 
              ? <TouchableOpacity onPress={() => setScanned(false)}>
                  <Image
                    style={styles.qr}
                    source={require('../Images/qr4.png')}
                  />
                </TouchableOpacity>
              : <Image
                  style={styles.qr}
                  source={require('../Images/qr4.png')}
                />
              }
            </View>
            <View style={styles.cameratext}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
            </View>
        </View>
        <Entypo style={styles.entypo} name="flashlight" size={32} color="white" 
          onPress={() => {
            flashsetType(
              flashtype === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            )
          }}
        />
      </Camera>
    </View>
  );
}

const { width } = Dimensions.get('window')
const qrSize = width * 0.7

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex:1,
  },
  view: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  cameratext: {
    flex:0.2, 
    justifyContent:'center', 
  },
  button: {
    justifyContent:'center'
  },
  cameraqr:{
    flex:0.5,
    justifyContent:'center'
  },
  qr: {
    backgroundColor:'transparent',
    width: qrSize,
    height: qrSize,
  },
  text: {
    fontSize:20,
    color:'white',
  },
  entypo: {
    alignSelf:'flex-start',
  }
});