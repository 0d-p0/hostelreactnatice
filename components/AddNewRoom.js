import { StyleSheet, Text, View, Image, Pressable, TextInput, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import IconImage from './MiniComponent/IconImage'
import Color from '../Util/Color'
import MainHeader from './Header/MainHeader'
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { domain } from '../Util/Address'
import getAuthUser from './Hooks/getAuthUser'
import image2 from 'react-native-compressor/lib/commonjs/Image';

import { useEffect } from 'react'


const height = Dimensions.get('window').height


const AddNewRoom = ({ navigation }) => {

    const { user } = getAuthUser()


    const images = []
    const [pic, setPic] = useState([])
    const [upic, setUpic] = useState([{}, {}, {}, {}])

    const [name, setName] = useState('')
    const [totalBed, setTotalBed] = useState('')
    const [activeBed, setActiveBed] = useState('')
    const [price, setPrice] = useState()
    const [bathroom, setBathRoom] = useState()
    const [kitchen, setKitchen] = useState()
    const [roomType, setRoomType] = useState()

    const [status, setStatus] = useState("")
    const [isloading, setLoading] = useState(false)

    const [showbathroom, setShowbathroom] = useState(false)
    const [showKitchen, setShowkitchen] = useState(false)
    const [showRoomType, setShowRoomType] = useState(false)

    const pickImage = async (index) => {
        launchImageLibrary().then(
            (res) => {
                if (res.didCancel) {
                    console.log("cancel")
                }

                if (res.errorCode) {
                    console.log('error')
                }

                if (res.assets) {

                    // const newArray = [...upic]
                    // newArray.splice(index, 1, res.assets[0])
                    // setUpic(newArray)

                    if (res.assets[0]) {
                        image2.compress(res.assets[0].uri, {
                            compressionMethod: 'auto',
                        })
                            .then(async (compressedFileUri) => {

                                const data = {
                                    name: res.assets[0].fileName,
                                    type: res.assets[0].type,
                                    uri: compressedFileUri
                                }

                                const newArray = [...upic]
                                newArray.splice(index, 1, data)
                                setUpic(newArray)

                            })
                            .catch((e) => {
                                console.log(e, 'error');
                            });
                    }


                }
            }

        ).catch(
            err => console.log(err)
        )
    }


    const checkImgEmpty = (index) => {
        const isEmpty = Object.keys(upic?.[index]).length === 0;
        return isEmpty
    }


    const uploadRoomphotos = async () => {
        if (totalBed < activeBed) {
            return alert("please add less Available room or Equal to total Room")
        }

        let data = new FormData();
        setLoading(true)
        console.log("upload start")
        // setStatus("photos uploading...")
        upic.forEach((item, i) => {
            if (!checkImgEmpty(i)) {
                data.append('room', {
                    uri: item.uri,
                    name: item.name,
                    type: item.type,

                })

            }


        })
        await axios.post(domain + "api/v1/uploadroomImages", data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",

                },
            }, { withCredentials: true }).then(res => {
                console.log("image respose = >", res.data)
                // setStatus('image upload sucess')
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
                privateBathroom: bathroom,
                kitchen: kitchen,
                roomType: roomType

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
                // dispatch(loadUser())
            }).catch(err => {
                if (err) {
                    alert('an error occur please try again later')
                    console.log(err.message)
                    setLoading(false)
                }
                // console.log(err)
            })
    }


    const uploadRoom = async () => {
        if (!upic.length > 0) {
            return alert("before go please room photo")
        }

        if (!(name.trim().length !== 0)) {
            return alert("before go please add room name")
        }

        if (!totalBed) {
            return alert("before go please add total bed number")
        }
        if (!(activeBed.trim().length !== 0)) {
            return alert("before go please add available bed number")
        }
        if (!(price.trim().length !== 0)) {
            return alert("before go please add per bed price")
        }

        if (bathroom == undefined) {
            return alert("before go please add does have private bathroom or not")
        }
        if (!kitchen == undefined) {
            return alert("before go please add does have kitchen or not")
        }
        if (!roomType) {
            return alert("before go please add room type")
        }

        await uploadRoomphotos()
    }


    return (
        <View>
            <MainHeader home={() => navigation.navigate('Home')} />

            {isloading && <View style={{ alignItems: 'center', top: height / 2 }}>
                <ActivityIndicator size="small" color="#0000ff" />

            </View>}

            <ScrollView>
                <View style={{ margin: 25 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                        <IconImage
                            path={require('./../src/hostel/icon/settings.png')}
                            width={30}
                            height={30}
                        />
                        <Text style={{ fontSize: 25, color: Color.black, fontWeight: 'bold' }}> Add Room</Text>
                    </View>


                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                        <Pressable
                            onPress={() => pickImage(0)}
                            style={styles.addPhotoCard}>
                            {checkImgEmpty(0) && <Text style={styles.addphotoText}>
                                Add room photo
                            </Text>}
                            <Image
                                style={{
                                    width: 131,
                                    height: 107,
                                    borderRadius: 13,
                                }}
                                source={{
                                    uri: upic?.[0]?.uri
                                }}
                            />

                        </Pressable>

                        <Pressable
                            onPress={() => pickImage(1)} style={styles.addPhotoCard}>
                            {checkImgEmpty(1) && <Text style={styles.addphotoText}>
                                Add room photo
                            </Text>}
                            <Image
                                style={{
                                    width: 131,
                                    height: 107,
                                    borderRadius: 13,
                                }}
                                source={{
                                    uri: upic?.[1]?.uri
                                }}
                            />
                        </Pressable>

                        <Pressable
                            onPress={() => pickImage(2)}
                            style={styles.addPhotoCard}>
                            {checkImgEmpty(2) && <Text style={styles.addphotoText}>
                                Add bathroom photo
                            </Text>}
                            <Image
                                style={{
                                    width: 131,
                                    height: 107,
                                    borderRadius: 13,
                                }}
                                source={{
                                    uri: upic?.[2]?.uri
                                }}
                            />
                        </Pressable>

                        <Pressable
                            onPress={() => pickImage(3)} style={styles.addPhotoCard}>
                            {checkImgEmpty(3) && <Text style={styles.addphotoText}>
                                Add kitchen photo (if have any)
                            </Text>}
                            <Image
                                style={{
                                    width: 131,
                                    height: 107,
                                    borderRadius: 13,
                                }}
                                source={{
                                    uri: upic?.[3]?.uri
                                }}
                            />
                        </Pressable>
                    </View>

                    <View style={{ alignItems: 'center' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <IconImage
                                path={require('./../src/hostel/icon/house.png')}
                                width={25}
                                height={25}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="enter room name"
                                value={name}
                                onChangeText={setName}
                            />

                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <IconImage
                                path={require('./../src/hostel/icon/house.png')}
                                width={25}
                                height={25}

                            />
                            <TextInput
                                style={styles.input}
                                placeholder="enter total bed no."
                                maxLength={1}
                                keyboardType="numeric"
                                value={totalBed}
                                onChangeText={setTotalBed}
                            />

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <IconImage
                                path={require('./../src/hostel/icon/house.png')}
                                width={25}
                                height={25}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="enter available bed no."
                                value={activeBed}
                                onChangeText={setActiveBed}
                                maxLength={1}
                                keyboardType="numeric"
                            />

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <IconImage
                                path={require('./../src/hostel/icon/house.png')}
                                width={25}
                                height={25}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="enter per bed price"
                                value={price}
                                onChangeText={setPrice}
                                maxLength={4}
                                keyboardType="numeric"
                            />

                        </View>

                        <Pressable
                            onPress={() => setShowbathroom(true)}
                            style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <IconImage
                                path={require('./../src/hostel/icon/bath.png')}
                                width={25}
                                height={25}
                            />
                            {!showbathroom && <TextInput
                                style={styles.input}
                                placeholder={(bathroom == undefined) ? "have private bathroom" : bathroom ? "private bathroom (YES)" : "private bathroom (No)"}
                                editable={false}
                            />}

                            {showbathroom && <View

                                style={{ ...styles.input, flexDirection: "row", justifyContent: 'space-evenly' }}
                            >

                                <Pressable
                                    onPress={() => { setBathRoom(true), setShowbathroom(false) }}
                                    style={{ backgroundColor: "#424242", paddingHorizontal: 9, borderRadius: 5, margin: 4 }}
                                >
                                    <Text style={styles.yesno}>
                                        Yes
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => { setBathRoom(false), setShowbathroom(false) }}
                                    style={{ backgroundColor: "#424242", paddingHorizontal: 9, borderRadius: 5, margin: 4 }}
                                >
                                    <Text style={styles.yesno} >
                                        No
                                    </Text>
                                </Pressable>
                            </View>}

                        </Pressable>



                        <Pressable
                            onPress={() => setShowkitchen(true)}
                            style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <IconImage
                                path={require('./../src/hostel/icon/office-building.png')}
                                width={25}
                                height={25}
                            />
                            {!showKitchen && <TextInput
                                style={styles.input}
                                placeholder={(kitchen == undefined) ? "have kitchen" : kitchen ? "kitchen (YES)" : "kitchen (No)"}
                                editable={false}
                            />}

                            {showKitchen && <View

                                style={{ ...styles.input, flexDirection: "row", justifyContent: 'space-evenly' }}
                            >

                                <Pressable
                                    onPress={() => { setKitchen(true), setShowkitchen(false) }}
                                    style={{ backgroundColor: "#424242", paddingHorizontal: 9, borderRadius: 5, margin: 4 }}
                                >
                                    <Text style={styles.yesno}>
                                        Yes
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => { setKitchen(false), setShowkitchen(false) }}
                                    style={{ backgroundColor: "#424242", paddingHorizontal: 9, borderRadius: 5, margin: 4 }}
                                >
                                    <Text style={styles.yesno} >
                                        No
                                    </Text>
                                </Pressable>
                            </View>}

                        </Pressable>

                        {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                            <IconImage
                                path={require('./../src/hostel/icon/term.png')}
                                width={25}
                                height={25}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="description"
                            />

                        </View> */}


                        <Pressable
                            onPress={() => setShowRoomType(true)}
                            style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                            <IconImage
                                path={require('./../src/hostel/icon/now.png')}
                                width={25}
                                height={25}
                            />

                            {!showRoomType && <TextInput
                                style={styles.input}
                                placeholder={roomType ? `room type is ${roomType} ` : "enter room type"}
                                editable={false}
                            />}
                            {showRoomType && <View style={{ ...styles.input, height: 50 }}>
                                <ScrollView
                                    horizontal
                                >
                                    <Pressable
                                        onPress={() => { setRoomType('Normal'), setShowRoomType(false) }}
                                        style={{ backgroundColor: "#424242", paddingHorizontal: 9, borderRadius: 5, margin: 8, marginRight: 1 }}>
                                        <Text style={styles.yesno}>
                                            Normal
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => { setRoomType('1BHK'), setShowRoomType(false) }}
                                        style={{ backgroundColor: "#424242", paddingHorizontal: 9, borderRadius: 5, margin: 8, marginRight: 1 }}>
                                        <Text style={styles.yesno}>
                                            1BHK
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => { setRoomType('2BHK'), setShowRoomType(false) }}
                                        style={{ backgroundColor: "#424242", paddingHorizontal: 9, borderRadius: 5, margin: 8, marginRight: 1 }}>
                                        <Text style={styles.yesno}>
                                            2BHk
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => { setRoomType('3BHK'), setShowRoomType(false) }}
                                        style={{ backgroundColor: "#424242", paddingHorizontal: 9, borderRadius: 5, margin: 8, marginRight: 1 }}>
                                        <Text style={styles.yesno}>
                                            3BHk
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => { setRoomType('3BHK+'), setShowRoomType(false) }}
                                        style={{ backgroundColor: "#424242", paddingHorizontal: 9, borderRadius: 5, margin: 8, marginRight: 1 }}>
                                        <Text style={styles.yesno}>
                                            3BHk+
                                        </Text>
                                    </Pressable>

                                </ScrollView>
                            </View>}
                        </Pressable>

                        {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                            <IconImage
                                path={require('./../src/hostel/icon/gender.png')}
                                width={25}
                                height={25}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="unspecified"
                            />

                        </View> */}

                        <Pressable
                            onPress={uploadRoom}
                            style={{ flexDirection: 'row', marginTop: 15 }}
                        >

                            <IconImage
                                path={require('./../src/hostel/icon/upload.png')}
                                width={25}
                                height={25}
                            />

                            <Text style={styles.uploadRoomtext}> upload room </Text>
                        </Pressable>



                    </View>



                </View>


                <View
                    style={{ height: 100 }}
                />

            </ScrollView>
        </View>
    )
}

export default AddNewRoom

const styles = StyleSheet.create({
    addPhotoCard: {
        backgroundColor: "#EBEBEB",
        width: 131,
        height: 107,
        borderRadius: 13,
        shadowColor: Color.black,
        elevation: 10,
        margin: 10
    },
    input: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Color.grey,
        width: 200,
        height: 40,
        marginLeft: 5,
        top: -5,
        textAlign: 'center',
        color: Color.grey,
        fontWeight: '900'

    },
    uploadRoomtext: {
        fontSize: 15, fontWeight: 'bold', color: "#9F9F9F", backgroundColor: "#D9D9D9", paddingHorizontal: 10, borderRadius: 20, textAlign: 'center', marginTop: 5, marginLeft: 10,
        padding: 5,
        top: -8
    },
    addphotoText: {
        color: Color.black,
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        top: 40
    },
    yesno: {
        fontSize: 20,
        fontWeight: 'bold',
        top: 2,
        color: "#FFFFFF"
    }
})




// uri: item.uri,
// name: item.fileName,
// type: item.type