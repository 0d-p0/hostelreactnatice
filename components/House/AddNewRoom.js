import { StyleSheet, Text, View, TextInput, Pressable, Image, ScrollView, Alert, Button } from 'react-native'
import React, { useState } from 'react'

import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { set } from 'immer/dist/internal';
import { loadUser, valueChange } from '../../redux/Actions/userActions';
import { domain } from '../../Util/Address';




const AddNewRoom = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [totalBed, setTotalBed] = useState('')
    const [activeBed, setActiveBed] = useState('')
    const [price, setPrice] = useState('')
    const [pic, setPic] = useState([])
    const [status, setStatus] = useState("")
    const [isloading, setLoading] = useState(false)

    const { user } = useSelector((state) => state.user)

const [count,setCount]=useState(1)

    const options = {
        selectionLimit: 2
    };

    const pickImage = async () => {
        await launchImageLibrary(options).then(
            res => {
                if (res.assets.length > 5) {
                    setPic([])
                    Alert.alert("please select less photo ",
                        "we only support upto 5",
                        [
                            {
                                text: "Cancel",

                                style: "cancel"
                            },
                            { text: "OK", onPress: () => pickImage() }
                        ])

                }

                if (res.assets.length <= 5) {
                    setPic(res.assets)
                    setStatus('images set sucess')
                    console.log(res.assets[0].type)

                }
            }

        ).catch(
            err => console.log(err)
        )

    }

    const uploadRoomphotos = async () => {
        if (totalBed < activeBed) {
            return alert("please add less Available room or Equal to total Room")
        }

        let data = new FormData();
        setLoading(true)
        console.log("upload start")
        setStatus("photos uploading...")
        pic.forEach((item, i) => {
            data.append('room', {
                uri: item.uri,
                name: item.fileName,
                type: item.type
            })
        })
        console.log("run at this poin 1")
        await axios.post(domain + "api/v1/uploadroomImages", data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",

                },
            }, { withCredentials: true }).then(res => {
                console.log("image respose = >", res.data)
                setStatus('image upload sucess')
                uploadHouse(res.data)
                setLoading(false)
                // useDispatch(valueChange())
            }).catch(err => {
                console.log(err)
                setLoading(false)
                // setStatus("error try again")

            }
            )
    }

    const uploadHouse = async (pic) => {



        await axios.post(domain + "api/v1/createroom/" + user.houses[0],
            {
                name: name,
                price: price,
                photos: pic,
                availableBeds: activeBed,
                totalBeds: totalBed,

            },
            {
                headers: {
                    "Content-Type": "application/json",
                },


            }, { withCredentials: true }).then(res => {
                res && alert(" house updated")
                console.log(res.data)
                setName('')
                setPic([])
                setTotalBed('')
                setActiveBed('')
                setPrice('')
                setLoading(false)
                dispatch(loadUser())
            }).catch(err => {
                if (err) {
                    alert('an error occur please try again later')
                    console.log(err.message)
                    setLoading(false)
                }
                // console.log(err)
            })
    }


    /// fake data

    function fakename() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        // console.log(text)
        return text;
    }

    function fakeprice() {
        var text = "";
        var possible = "123456789";

        for (var i = 0; i < 4; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        // console.log(text)
        return text;
    }

    function fakebed() {
        var text = "";
        var possible = "123456";

        for (var i = 0; i < 1; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        // console.log(text)
        return text;
    }

    const fakeuploadHouse = async () => {

        await axios.post(domain + "api/v1/createroom/" + user.houses[0],
            {
                name: fakename(),
                price: fakeprice(),
                photos: [{"public_id": "vtkb5c1toicoueckpz2u", "url": "https://res.cloudinary.com/dsubepip6/image/upload/v1655465977/vtkb5c1toicoueckpz2u.jpg"}, {"public_id": "zyuxjt55vwc324ystitg", "url": "https://res.cloudinary.com/dsubepip6/image/upload/v1655465977/zyuxjt55vwc324ystitg.jpg"}],
                availableBeds: fakebed(),
                totalBeds: fakebed(),

            },
            {
                headers: {
                    "Content-Type": "application/json",
                },


            }, { withCredentials: true }).then(res => {
                res && alert(" house updated")
                console.log("count ===",count)
                if(res.status ==201){
                   fakeuploadHouse()
                   setCount(count+1)
                }  
               
                setName('')
                setPic([])
                setTotalBed('')
                setActiveBed('')
                setPrice('')
                setLoading(false)
                dispatch(loadUser())
            }).catch(err => {
                if (err) {
                    alert('an error occur please try again later')
                    console.log(err.message)
                    setLoading(false)
                }
                // console.log(err)
            })
    }

    return (
        <View style={styles.container}>

            <Button
                title='generate'
                onPress={fakeuploadHouse}
            />


            <Text style={styles.title}>Room Name</Text>
            <TextInput style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder='enter room name'
            />

            <Text style={styles.title}>Total Beds </Text>
            <TextInput style={styles.input}
                value={totalBed}
                onChangeText={setTotalBed}
                placeholder='enter beds number'
                keyboardType='number-pad'
                maxLength={1}

            />

            <Text style={styles.title}>Available Beds </Text>

            <TextInput style={styles.input}
                value={activeBed}
                onChangeText={setActiveBed}
                placeholder='enter beds number'
                keyboardType='number-pad'
                maxLength={1}

            />

            <Text style={styles.title}>Per Bed Price </Text>

            <TextInput style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder='enter per price'
                keyboardType='number-pad'
                maxLength={4}
            />

            <Text style={styles.title}>Room Photos {'         ' + status} </Text>


            <View style={styles.imageBox} >

                <View style={styles.addImage}>
                    <Icon name='add-circle' size={30} color="green" onPress={pickImage} />
                </View>

                <ScrollView horizontal={true}>

                    {pic && pic.map((props) =>
                    (

                        <Image
                            key={props.fileName}
                            style={styles.image}
                            source={{
                                uri: props.uri,
                            }}
                        />
                    ))}

                </ScrollView>

            </View>

            <Button
                title='upload Room'
                onPress={uploadRoomphotos}
                disabled={(pic.length > 0 && name.trim().length != 0 && totalBed.trim().length != 0 && price.trim().length != 0)
                    && !isloading ? false : true}
            />


            <Image
                style={{ width: 400, height: 200 }}
                source={{
                    uri: 'http://192.168.0.9:4000/uploads/rn_image_picker_lib_temp_fb9b8793-338a-4e13-813b-99628b52bd48.jpg'
                }}
                onProgress={'kk'}
            />

        </View>
    )
}

export default AddNewRoom

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
    },

    title: {
        fontWeight: 'bold',
        marginBottom: -8,
        marginLeft: 20
    }
})