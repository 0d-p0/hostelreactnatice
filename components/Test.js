import {
    SafeAreaView,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button
  } from 'react-native';
import React, { useState } from 'react'

import axios from 'axios';

import { launchImageLibrary } from 'react-native-image-picker';

const Test = () => {

    const [pic, setPic] = useState()

    const pickImage = () => {
      launchImageLibrary().then(
        res => {
          // console.log(res)
          setPic(res.assets[0])
        }
  
      ).catch(
        err => console.log(err)
      )
    }
    console.log(JSON.stringify(pic))
  
    const upload = async () => {
      let data = new FormData();
  console.log("upload start")
      data.append('profile-file',{
        uri:pic.uri,
        name:pic.fileName,
        type:pic.type
      })
  
  
      await axios.post("http://192.168.0.9:4000/profile-upload-single", data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
  
          },
  
        }, { withCredentials: true }).then(res => console.log("image respose = >", res)).catch(err => console.log(err))
    }

  return (
    <SafeAreaView >

    <View>
      <Text>
        pick a image
      </Text>

      <Button
        title='pick image'
        onPress={pickImage}
      />
    </View>

    <Image
      style={{ width: 200, height: 200 }}
      source={{
        uri: pic?.uri
      }}
    />


    <Button
      title='upload'
      onPress={upload}
    />
  </SafeAreaView>         
  )
}

export default Test