import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { domain } from '../../Util/Address'
import { valueChange } from '../../redux/Actions/userActions';

const UpdateHouse = ({ route, navigation }) => {
    const { room } = route.params

    const dispatch = useDispatch()

    const [total, setTotal] = useState(room?.totalBeds.toString())
    const [Available, setAvailable] = useState(room?.availableBeds.toString())
    const [price, setPrice] = useState(room?.price.toString())

    const update = async () => {
        
        if(total<Available){
            return alert("please add less Available room or Equal to total Room")
        }

        try {

            await axios.post(domain + "api/v1/updateRoom/" + room?._id,
                {
                    price: price,
                    availableBeds: Available,
                    totalBeds: total
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },


                }, { withCredentials: true }).then(res => {
                    res && alert(" Room updated")
                    console.log(res.data)
                    dispatch(valueChange())
                    setPrice('')
                    setTotal('')
                    setAvailable('')
                    navigation.navigate('Profile')
                }).catch(err => {
                    if (err) { alert('an error occur please try again later') }
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ margin: 10 }}>

            <View>
                <Text style={styles.title}>Total room </Text>
                <TextInput style={styles.input}
                    value={total}
                    onChangeText={setTotal}
                    keyboardType="numeric"
                    maxLength={1}
                />

                <Text style={styles.title}>Available room </Text>
                <TextInput style={styles.input}
                    value={Available}
                    onChangeText={setAvailable}
                    keyboardType="numeric"
                    maxLength={1}
                />

                <Text style={styles.title}>Price </Text>
                <TextInput style={styles.input}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                    maxLength={4}
                />

                <Button
                    title='update Room'
                    color={"#138911"}
                    onPress={update}

                    disabled={total && price && Available ? false : true}
                />
            </View>

        </View>
    )
}

export default UpdateHouse

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },

    title: {
        fontWeight: 'bold',
        marginBottom: -8,
        marginLeft: 20
    }
})