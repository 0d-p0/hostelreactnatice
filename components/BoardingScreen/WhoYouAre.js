import { StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { domain } from '../../Util/Address';
import { valueChange } from '../../redux/Actions/userActions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const WhoYouAre = ({ navigation }) => {
  const [select, setSelect] = useState('')

  const dispatch = useDispatch()

  const { isAuthenticated, loading, user, error } = useSelector((state) => state.user);
  
  const next = async (value) => {
    if (value == "roomOwner") {
      await axios.post(domain + "api/v1/updateuserdetails/" + user._id,
        {
          userType: "landowner"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }, { withCredentials: true }).then(res => {
          console.log(res.data)
          dispatch(valueChange())
        }).catch(err =>
          console.error(err.message))
    }

    if (value == "student") {
      navigation.navigate("studentDetails")
    }

  }
  return (
    <View style={styles.container}>

      <Text style={{
        fontSize: 30, color: "green", marginBottom: 30, marginTop: 40, backgroundColor: "#ffff", borderRadius: 10, padding: 10, fontWeight: '900', textAlign: 'center', marginLeft: 20, marginRight: 20, elevation: 10,
        shadowColor: "blue",
        textShadowColor: '#0ba378',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10
      }}>
        Who you are
      </Text>

      <Pressable
        style={styles.card}
        onPress={() => setSelect("roomOwner")}>


        <Image
          style={styles.imagestyle}
          source={require('../../src/assets/Image/houseowner.webp')}
        />
        <Text style={select != "roomOwner" ? styles.text : styles.textSelect}>
          Room Owner
        </Text>

      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => setSelect("student")}>

        <Image
          style={styles.imagestyle}
          source={require('../../src/assets/Image/student.jpg')}
        />
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

export default WhoYouAre

const styles = StyleSheet.create({
  container: {
    // top: windowHeight / 4.5,
    backgroundColor: "#fffff",
    height: windowHeight
  },
  imagestyle: {
    width: windowWidth - 20,
    height: windowHeight / 5,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: 'blue',
    // borderWidth: 2,
    margin: 10,
    borderRadius: 10,
    padding: 5,
    color: '#FFFF',
    width: windowWidth / 2,
    textAlign: 'center',
    backgroundColor: "#00a676",
    marginLeft: windowWidth / 4.5
  },
  textSelect: {
    borderColor: "#00a676",
    backgroundColor: "#1a252b",
    color: "#FFFF",
    fontSize: 20,
    fontWeight: '900',
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
    padding: 5,
    width: windowWidth / 2,
    marginLeft: windowWidth / 4.5,
    textAlign: 'center'
  },
  button: {
    backgroundColor: "#ffff",
    color: "#1a252b",
    margin: 10,
    padding: 8,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 11,
    width: 150,
    textAlign: "center",
    width: windowWidth / 3,
    marginLeft: windowWidth / 3,
    // borderWidth:2,
    borderColor: "#0ba67a",
    elevation: 14,
    shadowColor: "blue",
  },
  card: {
    backgroundColor: "#FFFf",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    marginBottom: 30,
    elevation: 14,
    shadowColor: "blue",
  }
});
