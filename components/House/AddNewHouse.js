import { StyleSheet, Text, View, TextInput, ScrollView, Button, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';

import axios from 'axios';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { getLocation, loadUser, valueChange } from '../../redux/Actions/userActions';
import { domain } from '../../Util/Address';



const locationIcon = <FontAwesome name='search-location' size={30} color="green" />
const plusCircle = <Icon name='add-circle' size={30} color="green" />



const AddNewHouse = () => {

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)
    const { loading, location, status } = useSelector((state) => state.location);

    const [houseName, setHouseName] = useState('')
    const [whatsAppNumber, setwhatsAppNumber] = useState('')

    const [location2, setLocation] = useState(location)
    const [imageUploading, setImageUploading] = useState('')

    const [pic, setPic] = useState()

    const [picName, setPicName] = useState()




    const pickImage = async () => {
        launchImageLibrary().then(
            (res) => {
                if (res.didCancel) {
                    setPic("plz add some pic")
                }

                if (res.errorCode) {
                    setPic(res.errorMessage)
                }

                if (res.assets) {
                    setPic(res.assets[0])
                    console.log(res.assets[0])
                    // uploadImage(res.assets[0])
                }
            }

        ).catch(
            err => setImageUploading('try again')
        )
    }

    const uploadImage = async () => {
        let data = new FormData();
        setImageUploading("imageUploading..")
        console.log("upload start")
        data.append('profile-file', {
            uri: pic.uri,
            name: pic.fileName,
            type: pic.type
        })
        await axios.post(domain + "api/v1/uploadimage", data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }, { withCredentials: true }).then(res => {
                res && setImageUploading('Uploading Sucess')
                console.log(res.data)
                setPicName(res.data)
                uploadHouse(res.data)
                dispatch(loadUser())

            }).catch(err => {
                if (err) {
                    setImageUploading('error try again')
                    console.log(err)
                }
                // console.log(err)
            })
    }

    const uploadHouse = async (pn) => {

        await axios.post(domain + "api/v1/registerhouse/" + user._id,
            {
                name: houseName,
                lat: location[0],
                lang: location[1],
                pictures: pn
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },


            }, { withCredentials: true }).then(res => {
                res && alert(" house updated")

                console.log(res.data)
                setHouseName('')
                setPic("")
                setImageUploading("")
            }).catch(err => {
                if (err) { alert('an error occur please try again later') }
                // console.log(err)
            })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {/*....--------------- Name add ui----------........... */}
                <TextInput
                    style={styles.input}
                    onChangeText={setHouseName}
                    value={houseName}
                    placeholder="Enter Your House Name"

                />

                <TextInput
                    style={styles.input}
                    onChangeText={setwhatsAppNumber}
                    value={whatsAppNumber}
                    placeholder="Enter Your whatsApp Number "
                    keyboardType='numeric'

                />
                {/*....--------------- Location add ui----------........... */}
                <Pressable style={{ display: 'flex', flexDirection: 'row', flex: 1 }} onPress={() => dispatch(getLocation())} >
                    <TextInput
                        style={{ ...styles.input, flex: 0.9 }}
                        placeholder={loading == null ? "press add your location" :
                            loading ? "loading" : ` ${location[0]}','${location[1]}`}
                        editable={false}
                    />
                    <View style={{ marginTop: 15, marginLeft: 10 }}>
                        {locationIcon}

                    </View>
                </Pressable>

                {/*....--------------- image add ui----------........... */}
                <Text style={{ marginLeft: 12, fontSize: 15 }}> Add An House Photo</Text>
                <Pressable style={styles.imageBox} onPress={pickImage}>

                    <View style={styles.addImage}>
                        {plusCircle}
                    </View>
                    <Image
                        style={styles.image}
                        source={{
                            uri: pic?.uri,
                        }}
                    />
                    <Text style={{ marginTop: 30 }}> {imageUploading} </Text>
                </Pressable>


            </ScrollView>
            <View>
                <Button
                    title='upload house'
                    onPress={uploadImage}
                    disabled={!(houseName.trim().length === 0) && location && pic ? false : true}
                />
            </View>


            <Image
                style={{ width: 200, height: 200 }}
                source={{
                    uri: "http://192.168.0.9:4000/uploads/" + picName
                }}
            />

        </View>
    )
}

export default AddNewHouse




const styles = StyleSheet.create({
    container: {
        margin: 12
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    addImage: {
        borderColor: 'green',
        borderRadius: 10,
        width: 60,
        height: 60,
        padding: 13,
        margin: 15,
        borderStyle: 'dashed',
        borderWidth: 2,
        textAlign: 'center'
    },
    imageBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    image: {
        margin: 15,
        width: 60,
        height: 60
    }
})