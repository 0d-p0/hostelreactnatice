import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {useRoute} from '@react-navigation/native';



import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Fotter = ({navigation}) => {

  const route = useRoute();
  console.log(route.name);



  const homeFill = <Icon name="home" size={40} color="black"/>;
  const home = <Icon name="home-outline" size={40} color="black"   onPress={()=>navigation.push('user')}  />;

  const plusCircle =  <Icon name='plus' size={40} color="black" onPress={()=>navigation.push('newhouse')} />

  const profile =  <FontAwesome name='user-o' size={40} color="black" onPress={()=>navigation.push('profile')} />
  const profileFill =  <FontAwesome name='user' size={40} color="black" />


  // <Icon name="add" size={60} color="#fff" />;

  const loginWithFacebook = () => {

  }


  return (

    // KJhjkhj
    <View style={styles.container}>
      
      {(route.name == "user") ? homeFill : home}


      <View>
      {plusCircle}

      </View>

      {(route.name == "profile") ? profileFill : profile}

    </View>
  )
}

export default Fotter

const styles = StyleSheet.create({
  container: {
    margin:10,
    backgroundColor: "white",
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-around',
        
  },

  textstyle: {
    fontSize: 20,
    color: "white",
    fontWeight: "900"
  }
})

// const myButton = (
//   <Icon.Button
//     name="facebook"
//     backgroundColor="#3b5998"
//     onPress={loginWithFacebook}
//   >
//     Login with Facebook
//   </Icon.Button>
// );