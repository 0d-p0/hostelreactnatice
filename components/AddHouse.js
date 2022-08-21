import {
  StyleSheet, Text, PermissionsAndroid,
  View, Button
} from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import AddNewHouse from './House/AddNewHouse'
import Geolocation from 'react-native-geolocation-service';
import { locationRequest } from '../Util/Location';
import { useDispatch, useSelector } from 'react-redux';

import { getLocation } from '../redux/Actions/userActions';
import AddNewRoom from './House/AddNewRoom';
import MainHeader from './Header/MainHeader';

const AddHouse = ({ navigation }) => {
  const dispatch = useDispatch()
  const route = useRoute()

  const { loading, location, status } = useSelector((state) => state.location);

  const {user}=useSelector((state)=>state.user)

  console.log(user.houses.length)
  console.log("first")

  return (
    <View>

         <MainHeader name={!(user.houses.length>0)? "Add House":"Add Room"}
           home={() => navigation.navigate('Home')} show={false}
         />  

      {!(user.houses.length>0)? <AddNewHouse/>:<AddNewRoom/>}

    </View>
  )
}

export default AddHouse

const styles = StyleSheet.create({})