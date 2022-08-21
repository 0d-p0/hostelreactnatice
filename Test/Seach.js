import { StyleSheet, Text, View, Button, Pressable, Dimensions } from 'react-native'
import React, { Children, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { valueChange } from '../redux/Actions/userActions';

import axios from 'axios';
import { domain } from '../Util/Address';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Seach = ({navigation}) => {
  const [select, setSelect] = useState('')

  const { isAuthenticated, loading, user, error } = useSelector((state) => state.user);
  const next = async (value) => {
    if (value == "roomOwner") {
      await axios.post(domain+"api/v1/updateuserdetails/"+user._id,
        {
          userType: "landowner"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }, { withCredentials: true }).then(res => {
          console.log(res.data)
        }).catch(err =>
          console.error(err.message))
    }

    if (value == "student") {
          navigation.navigate("studentDetails")
    }

  }
  return (
    <View style={styles.container}>

      <Text style={{ fontSize: 30, color: "green", marginBottom: 60 }}>
        Who you are
      </Text>
      <Pressable onPress={() => setSelect("roomOwner")}>
        <Text style={select != "roomOwner" ? styles.text : styles.textSelect}>
          Room Owner
        </Text>
      </Pressable>

      <Pressable onPress={() => setSelect("student")}>
        <Text style={select != "student" ? styles.text : styles.textSelect}> Student</Text>
      </Pressable>

      {select ? <Pressable onPress={() => next(select)}>
        <Text style={{ ...styles.button }}>
          Next
        </Text>
      </Pressable> : null}



    </View>
  );
}

export default Seach

const styles = StyleSheet.create({
  container: {
    top: windowHeight / 4.5,
    alignItems: 'center',

  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: 'blue',
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    color: 'black',
    width: windowWidth - 20,
    textAlign: 'center'
  },
  textSelect: {
    borderColor: "green",
    backgroundColor: "black",
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    width: windowWidth - 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: "#4285F4",
    color: "white",
    margin: 10,
    padding: 8,
    fontSize: 20,
    fontWeight: '900',
    borderRadius: 11,
    width: 150,
    textAlign: "center"
  }
});
