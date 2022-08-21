import { Pressable, StyleSheet, Text, View, Image, Dimensions, TextInput, Modal, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../../Util/Color'
import IconImage from '../MiniComponent/IconImage'
import axios from "axios"

import { useDispatch, useSelector } from 'react-redux';
import { getLocation, loadUser, valueChange } from '../../redux/Actions/userActions';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import image2 from 'react-native-compressor/lib/commonjs/Image';


import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { domain } from '../../Util/Address'


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

GoogleSignin.configure({
    androidClientId: '159535382482-81hshc99no7kln99n402c11i0eji7afb.apps.googleusercontent.com',
    webClientId: '159535382482-fndhtqinnfemg84p0t9pfjinb5s3886v.apps.googleusercontent.com',
    offlineAccess: true,
});

const Student = ({ navigation }) => {

    const dispatch = useDispatch()



    const { user } = useSelector((state) => state.user)
    const { loading, location, status } = useSelector((state) => state.location);

    const [userType, setUserType] = useState("student")
    const [show, setShow] = useState(false)

    const [modalVisible, setModalVisible] = useState(false);

    const [collegeModal, setCollegeModal] = useState(false);

    const [isNewUser, setIsNewUser] = useState(true)

    const [houseName, setHouseName] = useState('')
    const [hlocation, setLocation] = useState()

    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState()

    const [college, setCollege] = useState()
    const collegeName = 
    [
        ["Global Institute of Science & Technology",
            "22.0525525,88.0720501"],
        [
            "Haldia Institute of Technology",  "22.0502366,88.0706757"
        ],
        [
            "Haldia Law college", "22.0514795,88.0726777"
        ],
        [
            "Haldia Institute of Health Sciences (HIHS)", "22.0500352,88.0719363"
        ],
        [
            "Haldia Institute Of Pharmacy", "22.0499091,88.0679666"
        ],
        [
            "Haldia Government College","22.0519304,88.0530909"
        ],
        [
            "Central Institute of Plastics Engineering and Technology",
            "22.0585243,88.071051"
        ],
        [
            "Dr. Meghnad Saha Institute of Technology",
            "22.0589167,88.0727757"
        ]

    ]
    const [imageUploading, setImageUploading] = useState('')

    const [pic, setPic] = useState()
    const [commpressedUri, setCommpressedUri] = useState();

    const [housePic, sethousePic] = useState(false)

    const [loadingStatus, setLoadingStatus] = useState(false)


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
                    // uploadImage(res.assets[0])
                    image2.compress(res.assets[0].uri, {
                        compressionMethod: 'auto',
                    })
                        .then(async (compressedFileUri) => {
                            setCommpressedUri(compressedFileUri);

                        })
                        .catch((e) => {
                            console.log(e, 'error');
                        });
                }
            }

        ).catch(
            err => setImageUploading('try again')
        )
    }

    const uploadImage = async (id) => {
        let data = new FormData();
        setImageUploading("imageUploading..")
        data.append('profile-file', {
            uri: commpressedUri,
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
                uploadHouse(res.data, id)
                // dispatch(loadUser())

            }).catch(err => {
                if (err) {
                    setImageUploading('error try again')
                    console.log(err)
                }
                // console.log(err)
            })
    }


    const uploadHouse = async (photo, id) => {

        await axios.post(domain + "api/v1/registerhouse/" + id,
            {
                name: houseName,
                lat: location[0],
                lang: location[1],
                pictures: photo,
                phoneNumber: phoneNumber,
                genderType: gender
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },


            }, { withCredentials: true }).then(res => {
                res && alert(" house updated")

                setHouseName('')
                setPic("")
                setImageUploading("")
            }).catch(err => {
                if (err) { alert('an error occur please try again later') }
                // console.log(err)
            })
    }
    const logIn = async () => {
        setLoadingStatus(true)
        await GoogleSignin.hasPlayServices().then((hasPlayService) => {
            if (hasPlayService) {
                GoogleSignin.signIn().then((userInfo) => {
                    axios.post(domain + "api/v1/androidlogin", {
                        token: userInfo.idToken
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }, { withCredentials: true }).then(res => {



                        if (userType == "student") {
                            lestGoStudent(res.data.user._id)
                            return
                        }

                        if (userType == "roomOwner") {
                            if (res.data.user.houses.length >= 1) {
                                // uploadImage(res.data.user._id)
                                letsGoRoomOwner(res.data.user._id)
                                alert('u alredy have a room we only support one house per user')
                                return
                            } else {

                                uploadImage(res.data.user._id)
                                letsGoRoomOwner(res.data.user._id)
                                return
                            }


                        }
                    }
                    ).catch(err => {
                        console.error("error =", err)
                        setLoadingStatus(false)

                    })

                }).catch((e) => {
                    setLoadingStatus(false)

                    console.log("ERROR IS: " + JSON.stringify(e));
                })
            }
        }).catch((e) => {
            setLoadingStatus(false)

            console.log("ERROR IS: " + JSON.stringify(e));
        })
    }

    const lestGoStudent = async (id) => {

        await axios.post(domain + "api/v1/updateuserdetails/" + id,
            {
                userType: "student",
                coordinate: college?.[1],
                clgname: college?.[0],
                gender

            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }, { withCredentials: true }).then(res => {
                setLoadingStatus(false)
                AsyncStorage.setItem('@storage_Key', JSON.stringify(res.data.user))
                dispatch(valueChange())
                // dispatch(loadUser())
                // navigation.navigate("Home")

            }).catch(err => {
                console.error(err.message)
                setLoadingStatus(false)

            })
    }


    const letsGoRoomOwner = async (id) => {

        await axios.post(domain + "api/v1/updateuserdetails/" + id,
            {
                userType: "roomOwner"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }, { withCredentials: true }).then(res => {
                setLoadingStatus(false)
                AsyncStorage.setItem('@storage_Key', JSON.stringify(res.data.user))
                dispatch(valueChange())

                // navigation.navigate("MainHome")



            }).catch(err => {
                setLoadingStatus(false)
                console.error(err.message)
            })

    }

    const signInRoomOwner = async () => {
        if (!(houseName.trim().length !== 0)) {
            return alert("before go please add house name")
        }

        if (!location) {
            return alert("before go please add location")
        }

        if (!phoneNumber) {
            return alert("before go please add phone number")
        }

        if ((phoneNumber.length != 10)) {
            return alert("before go please check your phone number")
        }

        if (!gender) {
            return alert("before go please provide gender type")
        }


        if (!pic) {
            return alert("before go please add a house picture")
        }

        if (loadingStatus) {
            return alert("before wait we allredy process your previous task")
        }

        await logIn()

    }

    const signInStudent = async () => {

        if (!gender) {
            return alert("before go please provide your gender")
        }

        if (!college) {
            return alert("before go please provide your gender")
        }

        if (loadingStatus) {
            return alert("before wait we allredy process your previous task")
        }
        await logIn()
    }

    const existingUserLogIn = async () => {
        setLoadingStatus(true)
        await GoogleSignin.hasPlayServices().then((hasPlayService) => {
            if (hasPlayService) {
                GoogleSignin.signIn().then((userInfo) => {
                    axios.post(domain + "api/v1/androidlogin", {
                        token: userInfo.idToken
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }, { withCredentials: true }).then(res => {

                        if (res.data.user.userType == 'none') {
                            alert('please register first')
                            setIsNewUser(true)
                            setLoadingStatus(false)
                            return
                        } else {
                            AsyncStorage.setItem('@storage_Key', JSON.stringify(res.data.user)).then(() =>
                                dispatch(valueChange())
                            ).then(() => setLoadingStatus(false)
                            )

                            return
                        }



                    }
                    ).catch(err => {
                        console.error("error =", err)
                        setLoadingStatus(false)

                    })

                }).catch((e) => {
                    setLoadingStatus(false)

                    console.log("ERROR IS: " + JSON.stringify(e));
                })
            }
        }).catch((e) => {
            setLoadingStatus(false)

            console.log("ERROR IS: " + JSON.stringify(e));
        })
    }

    const SelectCollegeComp = ({ name, props }) => {
        return (
            <Pressable
                onPress={() => { setCollege(props), setCollegeModal(false) }}
                style={{ flexDirection: 'row', margin: 20, justifyContent: 'flex-start', width: 200, }}>

                <IconImage
                    path={require('../../src/hostel/icon/college2.png')}
                    width={20}
                    height={20}
                />

                <Text style={{ color: Color.black, fontSize: 20, fontWeight: 'bold', marginVertical: 5, top: -10 }}> {name}</Text>

            </Pressable>
        )
    }



    return (
        <View style={{ padding: 10, backgroundColor: '#ffffff', height: height }}>

            {loadingStatus && <View style={{ alignItems: 'center', top: height / 2 }}>
                <ActivityIndicator size="small" color="#0000ff" />

            </View>}




            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Pressable
                    onPress={() => setUserType("student")}

                    style={{
                        borderBottomWidth: (userType == "student") ? 2 : 0,
                        marginRight: 10
                    }}
                >
                    <Text>Student </Text>
                </Pressable>

                <Pressable
                    onPress={() => setUserType("roomOwner")}
                    style={{
                        borderBottomWidth: (userType == "roomOwner") ? 2 : 0,
                        marginRight: 10
                    }}
                >
                    <Text>RoomOwner </Text>

                </Pressable>
            </View>

            <Image
                style={{ width: width - 20, height: (width / (2 / 1)), marginTop: (userType == "student") ? 130 : 80 }}
                source={require("../../src/hostel/vector/homepage.jpg")}
                resizeMode='contain'
            />





            <View>

                {/* render room student boarding screen*/}

                {(userType == "student") &&
                    <View style={{ marginTop: 40 }}>
                        <Pressable
                            onPress={() => setModalVisible(true)}
                            style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                            <IconImage
                                path={require('../../src/hostel/icon/gender.png')}
                                width={25}
                                height={25}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder={gender ? `you chose ${gender}` : "chose your gender"}
                                editable={false}
                            />

                        </Pressable>

                        <Pressable
                            onPress={() => setCollegeModal(true)}
                            style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                            <IconImage
                                path={require('../../src/hostel/icon/college.png')}
                                width={25}
                                height={25}
                            />

                            <TextInput
                                style={{ ...styles.input, }}
                                placeholder={college ? college[0] : "chose your college"}
                                editable={false}
                                multiline={true}

                            />

                        </Pressable>


                        <View style={{ alignItems: "center", marginTop: 30 }}>
                            <Pressable

                                onPress={signInStudent}
                                style={{ flexDirection: 'row' }}>

                                <IconImage
                                    path={require('../../src/hostel/icon/google.png')}

                                    width={30} height={30}
                                />

                                <Text style={styles.signInText}>
                                    Sign In
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={existingUserLogIn}
                            >
                                <Text style={styles.existingUser}>
                                    Existing User
                                </Text>
                            </Pressable>
                        </View>

                    </View>}


                {/* render room owner boarding screen*/}
                {(userType == "roomOwner") && <View style={{ marginTop: 20 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                        <IconImage
                            path={require('../../src/hostel/icon/house.png')}
                            width={25}
                            height={25}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Enter House Name"
                            value={houseName}
                            onChangeText={setHouseName}
                        />

                    </View>

                    <Pressable
                        onPress={() => dispatch(getLocation())}
                        style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                        <IconImage
                            path={require('../../src/hostel/icon/location.png')}
                            width={25}
                            height={25}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder={loading == null ? "press add your location" :
                                loading ? "loading" : (status == "Permission Denied") ? "please add house location" :
                                    "location add successfully"

                            }
                            editable={false}
                        />

                    </Pressable>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                        <IconImage
                            path={require('../../src/hostel/icon/phone.png')}
                            width={25}
                            height={25}
                        />

                        <TextInput
                            style={styles.input}
                            onChangeText={setPhoneNumber}
                            value={phoneNumber}
                            placeholder="Enter Your Phone Number "
                            keyboardType='numeric'
                        />

                    </View>
                    <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                        style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                        <IconImage
                            path={require('../../src/hostel/icon/gender.png')}
                            width={25}
                            height={25}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder={gender ? `For ${gender}` : "chose gender type"}
                            editable={false}
                        />

                    </Pressable>

                    <Pressable
                        style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}
                        onPress={() => pic ? sethousePic(!housePic) : pickImage()}
                    >

                        <IconImage
                            path={require('../../src/hostel/icon/image.png')}
                            width={25}
                            height={25}
                        />

                        <View style={{ ...styles.input, flexDirection: 'row', justifyContent: 'center' }}>

                            <Text style={{ textAlign: 'center', marginTop: 6 }}>
                                {!pic ? " click to add house Image" : "image add sucess"}
                            </Text>

                            <Image
                                style={styles.image}
                                source={{
                                    uri: pic?.uri,
                                }}
                            />
                        </View>



                    </Pressable>


                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Pressable
                            onPress={signInRoomOwner}
                            style={{ flexDirection: 'row' }}>
                            <IconImage
                                path={require('../../src/hostel/icon/google.png')}

                                width={30} height={30}
                            />


                            <Text style={styles.signInText}>
                                Sign In
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={existingUserLogIn}
                        >
                            <Text style={styles.existingUser}>
                                Existing User
                            </Text>
                        </Pressable>
                    </View>

                </View>}
            </View>


            {/* show choose gender model */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ ...styles.genderHeader }}>
                                {(userType == "student") ? "Select Your Gender" : " For Whom!"} </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable
                                    onPress={() => { setGender('Girl'), setModalVisible(false) }}
                                >
                                    <Text style={styles.genderText}>
                                        Girl</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => { setGender('Boy'), setModalVisible(false) }}
                                >
                                    <Text style={styles.genderText}>
                                        Boy</Text>
                                </Pressable>
                            </View>


                        </View>
                    </View>
                </Modal>


            </View>


            {/* show selected image model */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={housePic}
                    onRequestClose={() => {
                        setModalVisible(!housePic);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    style={{ height: 300, width: 300, margin: 10 }}
                                    source={{
                                        uri: pic?.uri
                                    }}
                                />

                                <View style={{ flexDirection: 'row' }}>
                                    <Pressable
                                        onPress={() => sethousePic(false)}
                                    >
                                        <Text style={{ ...styles.genderText, backgroundColor: '#3B88F5' }}> confirm </Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={pickImage}

                                    >
                                        <Text style={{ ...styles.genderText, backgroundColor: Color.red }}> change </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>


            </View>

            {/* show chose college model */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={collegeModal}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <Text style={{ ...styles.genderHeader, paddingVertical: 10 }}>
                                COLLEGE
                            </Text>
                            <View style={{ borderWidth: 2, borderColor: Color.grey, width: 300 }} />

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                            >

                                {collegeName?.map((props, index) => (
                                    <View key={index} >
                                        <SelectCollegeComp name={props[0]} props={props} />
                                    </View>

                                ))}

                            </ScrollView>



                        </View>
                    </View>
                </Modal>


            </View>


        </View>
    )
}

export default Student

const styles = StyleSheet.create({
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

    signInText: {
        top: -10,
        fontSize: 20, fontWeight: 'bold', color: "white",
        backgroundColor: "#0075FF",
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 5,
        marginLeft: 10,
        paddingVertical: 5,
        width: 180
    },


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22

    },
    modalView: {
        // margin: 20,
        // backgroundColor: "white",
        // borderRadius: 20,

        // alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
        // width: 300,
        // height: 400

        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5

    },

    genderHeader: {
        color: Color.black,
        fontWeight: 'bold',
        fontSize: 18

    },
    genderText: {
        fontWeight: '800',
        color: "#FFFFFF",
        backgroundColor: '#5A5A5A',
        padding: 10,
        borderRadius: 13,
        margin: 10,
        fontSize: 18,
        textAlign: 'center'
    },


    image: {

        width: 30,
        height: 30,
        borderRadius: 50,
        marginTop: 4,
        marginLeft: 5
    },

    existingUser: {
        color: "#9F9F9F",
        fontWeight: '900',
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: Color.black,
        right: 25
    }
})

