import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { getDistance } from 'geolib';
import axios from 'axios';
import { domain } from '../../Util/Address';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, valueChange } from '../../redux/Actions/userActions';

const StudentDetails = ({ navigation }) => {
  const { isAuthenticated, loading, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([

    {
      label: 'Global Institute of Science & Technology', value: [
        "Global Institute of Science & Technology",
        "22.0525525,88.0720501"
      ]
    },
    {
      label: 'Haldia Institute of Technology', value: [
        "Haldia Institute of Technology",
        "22.0502366,88.0706757"
      ]
    },
    {
      label: 'Haldia Law college', value: [
        "Haldia Law college",
        "22.0514795,88.0726777"
      ]
    },

    {
      label: 'Haldia Institute of Health Sciences (HIHS)', value: [
        "Haldia Institute of Health Sciences (HIHS)",
        "22.0500352,88.0719363"
      ]
    },

    {
      label: 'Haldia Institute Of Pharmacy', value: [
        "Haldia Institute Of Pharmacy",
        "22.0499091,88.0679666"
      ]
    },

    {
      label: 'Haldia Government College', value: [
        "Haldia Government College",
        "22.0519304,88.0530909"
      ]
    },

    {
      label: 'Central Institute of Plastics Engineering and Technology', value: [
        "Central Institute of Plastics Engineering and Technology",
        "22.0585243,88.071051"
      ]
    },

    {
      label: 'Dr. Meghnad Saha Institute of Technology', value: [
        "Dr. Meghnad Saha Institute of Technology",
        "22.0589167,88.0727757"
      ]
    },
  ]);

  let date = new Date().getFullYear();

  const [openYear, setOpenYear] = useState(false);
  const [year, setYear] = useState(null);
  const [yearValues, setYearValues] = useState([
    {
      label: '1st Year', value: `1st Year,${date}`
    },

    {
      label: '2nd Year', value: `2nd Year,${date}`
    },

    {
      label: '3rd Year', value: `3rd Year,${date}`
    },

    {
      label: '4th Year', value: `4th Year,${date}`
    },

    {
      label: '5th Year', value: `5th Year,${date}`
    },

  ]);


  const [branch, setBranch] = useState('')




  const lestGo = async () => {

    await axios.post(domain + "api/v1/updateuserdetails/" + user._id,
      {
        userType: "student",
        branch: branch,
        year: year,
        coordinate: value?.[1],
        clgname: value?.[0]
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }, { withCredentials: true }).then(res => {
        console.log(res.data)
        dispatch(loadUser())
        navigation.navigate("Home")

      }).catch(err =>
        console.error(err.message))
  }


  return (
    <View style={{ margin: 20 }}>
      <Text style={styles.StudentDetailsStyle}>Student Details</Text>

      <View style={styles.card}>


        <Text style={styles.textStyle}>
          Branch  {branch}  </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder='your branch'
          value={branch}
          onChangeText={setBranch}
          autoFocus={true}
        />
        <DropDownPicker
          style={{
            backgroundColor: "black"
          }}


          textStyle={{
            fontWeight: "bold",
          }}

          labelStyle={{
            fontWeight: "bold",
            color: 'red'
          }}

          placeholderStyle={{
            color: "grey",
            fontWeight: "bold"
          }}

          containerStyle={{
            marginBottom: 10
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          mode='BADGE'
          placeholder='Select Your College'
          listMode='MODAL'
          theme='DARK'
        />



        <DropDownPicker
          style={{
            backgroundColor: "black"
          }}


          textStyle={{
            fontWeight: "bold",
          }}

          labelStyle={{
            fontWeight: "bold",
            color: 'red'
          }}

          placeholderStyle={{
            color: "grey",
            fontWeight: "bold"
          }}

          containerStyle={{
            marginBottom: 10
          }}
          open={openYear}
          value={year}
          items={yearValues}
          setOpen={setOpenYear}
          setValue={setYear}
          setItems={setYearValues}
          mode='BADGE'
          placeholder='Select Your Year'
          theme='DARK'
          
        />






      </View>

      {!(branch.trim().length < 1) && value && year && !openYear ? <Pressable
        onPress={lestGo}
        style={styles.button}>
        <Text style={{ ...styles.textStyle, fontSize: 20, padding: 10 }}> let`s go -{'>'} </Text>
      </Pressable> : null}

    </View>
  )
}

export default StudentDetails

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  textStyle: {
    marginBottom: -8,
    marginLeft: 4,
    fontWeight: 'bold',
    color: "black"
  },

  StudentDetailsStyle: {
    fontSize: 25,
    textAlign: 'center',
    color: "#fffefe",
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    elevation: 14,
    shadowColor: "#FFFF",
  },
  card: {
    marginTop: 30,
    backgroundColor: "#FFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 14,
    shadowColor: "blue",
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
    width: 150,
    marginLeft: 80,
    // borderWidth:2,
    borderColor: "#0ba67a",
    elevation: 14,
    shadowColor: "blue",
  },
})