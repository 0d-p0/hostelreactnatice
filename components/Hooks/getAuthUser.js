import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const getAuthUser = () => {

    const { c } = useSelector((state) => state.value)

    const [user, setUser] = useState()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@storage_Key')
                // if (jsonValue != null) {
                    setUser(JSON.parse(jsonValue))
                    setLoading(false)
                

            } catch (e) {
                // error reading value
                console.error(e)
                setLoading(false)

            }


        }

        getData()

        console.log(user?.name)
    }, [c])



    return { user, loading, setLoading,setUser }
}

export default getAuthUser