import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadUser, getuserhouse } from '../redux/Actions/userActions'
import axios from "axios"


import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { domain } from '../Util/Address'



// GoogleSignin.configure({
//   webClientId:"159535382482-fndhtqinnfemg84p0t9pfjinb5s3886v.apps.googleusercontent.com",
//   offlineAccess:true
// })

GoogleSignin.configure({
  androidClientId: '159535382482-ef00mqrks5a0sgdo8666clk9tq49cs8p.apps.googleusercontent.com',
});


const Home = () => {
  const dispatch = useDispatch()

  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  const [tuser, setUSer] = useState("ronti")

  const videoPlayer = React.useRef();




  const logIn2 = async () => {
    console.log("first")
    await GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn().then((userInfo) => {
          // console.log(userInfo)
          axios.post(domain + "api/v1/androidlogin", {
            name: userInfo.user.name,
            email: userInfo.user.email,
            avatar: userInfo.user.photo
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          }, { withCredentials: true }).then(res => console.log("login sucess", res.data)
          ).then(() => dispatch(loadUser())).catch(err => console.error("error =", err))

       
        }).catch((e) => {
          console.log("ERROR IS: " + JSON.stringify(e));
        })
      }
    }).catch((e) => {
      console.log("ERROR IS: " + JSON.stringify(e));
    })
    console.log("second")

    console.log("third")
  }


  const senddata = async () => {
    dispatch(loadUser())
    console.log(user)
  }

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <View
      style={{ alignItems: 'center', backgroundColor: "#fffaf6", height: '100%' }}
    >

    

      <Image
            style ={{width: "100%", height:"80%"}}
            source={require('../src/assets/gifs/unscreen.gif')}
            resizeMode="contain"
          />


      
      <GoogleSigninButton
        onPress={logIn2}
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
      />

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})