# frontend_nextq

# Published @ https://expo.io/@joel600/projects/nextq
# QR codes include in src/Images/QR codes folder feel free to test it out!

# To check toastify feature on mobile. (Currently is enable where if testing out with web browser project cant be loaded)
# Just follow the instruction below to enable/ remove toastify feature to test on mobile or web browser vice versa.

# Packge detail at:
# https://github.com/magicismight/react-native-root-toast

# Remove # comment at

@ App.js 

// import { RootSiblingParent } from 'react-native-root-siblings';
            
    <Auth.Provider value={setLoggedState}>
    --------------------------------
    #  {/* <RootSiblingParent> */}
    --------------------------------
        <NavigationContainer>
          <BottomNavigator/>
        </NavigationContainer>
    --------------------------------
    #  {/* </RootSiblingParent> */}
    --------------------------------
    </Auth.Provider>


@ Profilepage.js

// import { RootSiblingParent } from 'react-native-root-siblings';

    @ const handeLogout

        const handleLogout = () => {
            AsyncStorage.removeItem('jwt')
            setFalse()
        -------------------------------------------------    
        #    // Toast.show('Successfully sign out!', {
            //   duration: Toast.durations.LONG,
            //   position: 90,
            //   textColor: 'black',
            //   backgroundColor: 'green',
            //   shadow: true,
            //   animation: true,
            //   hideOnPress: true,
            //   delay: 0,
        #   // });
        -------------------------------------------------
        }

@ SignInForm.js

// import { RootSiblingParent } from 'react-native-root-siblings';

    @ const handleSignIn
        .then(result => {
            console.log(result)
            console.log("Success")
            const jwt = result.data.auth_token
            console.log(jwt)
            AsyncStorage.setItem('jwt', result.data.auth_token)
            setTrue()
            navigation.navigate('Profile')
        -----------------------------------------------
        #    // Toast.show('Successfully sign in!', {
            //     duration: Toast.durations.LONG,
            //     position: 90,
            //     textColor: 'black',
            //     backgroundColor: 'green',
            //     shadow: true,
            //     animation: true,
            //     hideOnPress: true,
            //     delay: 0,
        #   // });
        -----------------------------------------------
        })
        .catch(error => {
            console.log("Error:" ,error)
        -----------------------------------------------
        #    // Toast.show(`${error}`, {
            //     duration: Toast.durations.LONG,
            //     position: 90,
            //     textColor: 'black',
            //     backgroundColor: 'red',
            //     shadow: true,
            //     animation: true,
            //     hideOnPress: true,
            //     delay: 0,
        #    // });
        -----------------------------------------------
        })
    };

@ SignUpForm.js

    @ const handleSignUp
        .then(result => {
            console.log(result)
            console.log("Success")
            navigation.navigate("Sign In")
        ----------------------------------------------------
        #   // Toast.show('Successfully sign up!', {
            //     duration: Toast.durations.LONG,
            //     position: 90,
            //     textColor: 'black',
            //     backgroundColor: 'green',
            //     shadow: true,
            //     animation: true,
            //     hideOnPress: true,
            //     delay: 0,
        #    // });
        -----------------------------------------------------
        })
        .catch(error => {
            console.log("Error:" ,error)
        -----------------------------------------------------
        #    // Toast.show(`${error}`, {
            //     duration: Toast.durations.LONG,
            //     position: 90,
            //     textColor: 'black',
            //     backgroundColor: 'red',
            //     shadow: true,
            //     animation: true,
            //     hideOnPress: true,
            //     delay: 0,
        #    // });
        -----------------------------------------------------
        })
    };