import { StyleSheet, Text, View, Pressable, Image, Dimensions, Button } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState } from 'react'
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';

import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { valueChange } from '../redux/Actions/userActions';
import { domain } from '../Util/Address';
import MainHeader from './Header/MainHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window')


const HomeFill = <Icon name="home-circle-outline" size={20} color={"#777777"} />

const Profile = ({ navigation }) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)

    const [openTypes, setOpenTypes] = useState(false);
    const [types, setTypes] = useState(null);
    const [typesValues, settypesValues] = useState([
        {
            label: 'student', value: "student"
        },

        {
            label: 'Room Owner', value: 'landowner'
        },
    ]);


    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            const data = await axios.get(domain + "api/v1/logoutandroid")
            console.log("plp", data.data)
            dispatch(valueChange())
            await AsyncStorage.removeItem('@storage_Key2')
            // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    }




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

    const upload = async () => {
        let data = new FormData();
        console.log("upload start")
        data.append('profile-file', {
            uri: pic.uri,
            name: pic.fileName,
            type: pic.type
        })


        await axios.post("http://192.168.0.9:4000/profile-upload-single", data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",

                },

            }, { withCredentials: true }).then(res => console.log("image respose = >", res)).catch(err => console.log(err))
    }

    const updateProile = async () => {
        if (types == "student" && user?.college?.name == null) {
            setTypes('')
            return navigation.navigate('studentDetails')
        }

        if (user.userType == types) {
            setTypes('')
            return alert(`u alredy a ${user.userType}`)
        }


        try {
            await axios.post(domain + "api/v1/updateprofile/" + user._id,
                {
                    userType: types
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }, { withCredentials: true }).then(res => {
                    console.log(res.data)
                    dispatch(valueChange())
                    setTypes(null)
                }).catch(err =>
                    console.error(err.message))
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View >
            <MainHeader name={""} home={() => navigation.navigate('Home')} logout={signOut} show={false} />



            <View style={styles.container}>

                {/*................... Log Out / Sign out .................*/}

                <Pressable style={{ ...styles.card }} onPress={signOut}>

                    <Text style={{ ...styles.profileName, textAlign: 'center', fontWeight: '700', color: "red" }}> Sign out</Text>
                </Pressable>


                {/*................... user details .................*/}

                <View style={{
                    ...styles.card, display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View style={{flex:0.8}}>
                        <Text style={{ ...styles.profileName, top: 10 }}>{user.name} </Text>
                        <Text style={{ ...styles.profileName, fontSize: 15, top: 15, color: 'grey' }}>Type: {user.userType} </Text>
                        <Text style={{ ...styles.profileName, fontSize: 15, top: 15, color: 'grey' ,marginBottom:10}} >{user?.college?.name}</Text>
                    </View>

                    <Image
                        style={styles.profileImage}
                        source={{
                            uri: user.avatar
                        }}
                    />

                </View>

                {/*................... Your houses.................*/}
                {user.userType == "landowner" &&
                    <Pressable
                        onPress={() => navigation.navigate('UserHouse', {
                            user
                        })}
                        style={{
                            ...styles.card, display: 'flex', flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                        <Text style={{ ...styles.profileName, fontWeight: '600', color: "#333333" }}>  Y{HomeFill}ur house </Text>

                        <Text style={styles.profileName}> &gt;  </Text>
                    </Pressable>}


                <View style={styles.card}>
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
                        open={openTypes}
                        value={types}
                        items={typesValues}
                        setOpen={setOpenTypes}
                        setValue={setTypes}
                        setItems={settypesValues}
                        mode='BADGE'
                        placeholder='change your user role'
                        theme='DARK'
                        onPress={(open) => console.log('was the picker open?', open)}

                    />

                    <Button title='submit'
                        disabled={!types ? true : false}
                        onPress={updateProile}
                    />

                </View>


            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 10
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 100
    },

    profileName: {
        fontWeight: "900",
        fontSize: 20,
        fontWeight: 'bold',
        color: "black"
    },
    logoutbutton: {
        backgroundColor: 'yellow',
        padding: 20,
        borderRadius: 20
    },
    card: {
        margin: 10,
        width: screenWidth - 20,
        height: "auto",
        backgroundColor: "#ffff",
        borderRadius: 10,
        shadowColor: "blue",
        elevation: 5,
        padding: 10,
    }

})



{/* <View style={{ margin: 20, backgroundColor: '#FFFA', padding: 20, borderRadius: 10 }}>
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
    open={openTypes}
    value={year}
    items={typesValues}
    setOpen={setOpenTypes}
    setValue={setTypes}
    setItems={settypesValues}
    mode='BADGE'
    placeholder='change your user role'
    theme='DARK'
    onPress={(open) => console.log('was the picker open?', open)}

/>

<Button title='submit'
    disabled={!year ? true : false}
    onPress={updateProile}
/>

</View> */}