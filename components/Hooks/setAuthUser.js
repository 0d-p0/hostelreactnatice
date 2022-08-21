import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const setAuthUser = () => {
  const [user, setUser] = useState()
  const { c } = useSelector((state) => state.value)

  useEffect(() => {
    const storeData = async () => {
      try {
        if (user) {
          console.log("set user for offline")
          const jsonValue = JSON.stringify(user)
          await AsyncStorage.setItem('@storage_Key', jsonValue)
        }
      } catch (e) {
        // saving error
        console.log(e)
      }
    }
    storeData()

  }, [user])


  return { setUser }
}

export default setAuthUser