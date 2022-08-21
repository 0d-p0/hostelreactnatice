import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const getFirstRooms = () => {

    const [tempRooms, setRooms] = useState()

    const getRooms = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@rooms_key')
            // if (jsonValue != null) {
            setRooms(JSON.parse(jsonValue))
            // setLoading(false)


        } catch (e) {
            // error reading value
            console.error(e)
            // setLoading(false)

        }


    }
    useEffect(() => {
        getRooms()
    }, [])

    return {tempRooms}

}

export default getFirstRooms