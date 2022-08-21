import { StyleSheet, Text, View, Image, Pressable, TextInput, Modal, ScrollView, ImageBackground, Dimensions, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import HeaderComp from '../MiniComponent/HeaderComp'
import getAuthUser from '../Hooks/getAuthUser'
import Color from '../../Util/Color'
import IconImage from '../MiniComponent/IconImage'
import axios from 'axios'
import { domain } from '../../Util/Address'

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux'
import { valueChange } from '../../redux/Actions/userActions'
const { width, height } = Dimensions.get('window')

const UserProfile = ({ navigation, route }) => {

    const dispatch = useDispatch()

    const { user, loading } = getAuthUser()
    const [gender, setGender] = useState()
    const [college, setCollege] = useState()


    const [loadingStatus, setLoadingStatus] = useState(false)

    const [modalVisible, setModalVisible] = useState(false);

    const [collegeModal, setCollegeModal] = useState(false);

    const collegeName = [
        ["Global Institute of Science & Technology",
            "22.0525525,88.0720501"],
        [
            "Haldia Institute of Technology",
            "22.0502366,88.0706757"
        ],
        [
            "Haldia Law college",
            "22.0514795,88.0726777"
        ],
        [
            "Haldia Institute of Health Sciences (HIHS)",
            "22.0500352,88.0719363"
        ],
        [
            "Haldia Institute Of Pharmacy",
            "22.0499091,88.0679666"
        ],
        [
            "Haldia Government College",
            "22.0519304,88.0530909"
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


    const updateProfile = async ({ navigation }) => {

        if (!gender) {
            return alert('please select your gender')
        }

        if (!college) {
            return alert('please select your college')

        }


        user && await axios.post(domain + "api/v1/updateuserdetails/" + user._id,
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
                console.log(res.data)
                setLoadingStatus(false)
                AsyncStorage.setItem('@storage_Key', JSON.stringify(res.data.user))
                dispatch(valueChange())
                // dispatch(loadUser())
                // navigation.navigate("Home")
                ToastAndroid.showWithGravityAndOffset(
                    "profile updated",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );

            }).catch(err => {
                console.error(err.message)
                setLoadingStatus(false)

            })
    }



    const signOut = async () => {
        try {

            await GoogleSignin.signOut();
            await axios.get(domain + "api/v1/logoutandroid")

            await AsyncStorage.removeItem('@storage_Key').then(res => {
                console.log(res)
                dispatch(valueChange())
            })

            // dispatch(valueChange())
            // Remember to remove the user from your app's state as well
            ToastAndroid.showWithGravityAndOffset(
                "sign out sucessfully",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } catch (error) {
            console.error(error);
        }
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
        <View style={{ backgroundColor: 'white', height: height }}>
            <HeaderComp navigation={navigation} route={route} />

            <View style={{ flexDirection: 'row', margin: 40 }}>
                <Image
                    style={styles.profileImage}
                    source={{
                        uri: user?.avatar
                    }}
                />


                <View style={{ marginLeft: 10, top: -4 }}>
                    <Text style={{ fontSize: 20, color: Color.black, fontWeight: "700", margin: 10 }}>
                        {user?.name}</Text>


                    <Pressable
                        onPress={signOut}
                        style={{ backgroundColor: "#D9D9D9", borderRadius: 15 }}>
                        <Text style={{ color: '#000000', textAlign: 'center', fontWeight: '700', paddingVertical: 5 }}>
                            sign out
                        </Text>
                    </Pressable>

                </View>
            </View>

            <View
                style={{ backgroundColor: '#E0E0E0', height: 10 }}
            />

            <View style={{ margin: 30 }}>
                <View style={{ flexDirection: 'row', backgroundColor: "#D9D9D9", borderRadius: 25, width: 110, paddingVertical: 5, paddingLeft: 10, paddingBottom: -5 }}>
                    <IconImage
                        path={require("./../../src/hostel/icon/settings.png")}
                        width={20}
                        height={20}
                    />
                    <Text style={{
                        fontSize: 20, fontWeight: "700", color: Color.grey,
                        top: -5, marginLeft: 8
                    }}>
                        setting
                    </Text>

                </View>


                <View style={{ marginTop: 5 }}>
                    <Pressable
                        onPress={() => setModalVisible(true)}
                        style={{ flexDirection: 'row', marginTop: 20 }}>

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
                        style={{ flexDirection: 'row', marginTop: 20 }}>

                        <IconImage
                            path={require('../../src/hostel/icon/college.png')}
                            width={25}
                            height={25}
                        />

                        <TextInput
                            style={{ ...styles.input, height: 'auto' }}
                            placeholder={college ? college[0] : "chose your college"}
                            editable={false}
                            multiline={true}
                        />

                    </Pressable>


                    <View style={{ alignItems: 'center', marginTop: 5 }}>
                        <Pressable
                            disabled={loadingStatus}
                            onPress={updateProfile}
                            style={{
                                backgroundColor: '#3D5AFE', borderRadius: 14, paddingHorizontal: 10, paddingVertical: 2, marginTop: 5, left: -70, shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5
                            }}>

                            <Text style={{ color: 'white', fontWeight: '700', fontSize: 20 }}>
                                update
                            </Text>
                        </Pressable>
                    </View>

                </View>

            </View>

            <View style={{ top: -20 }}>
                <ImageBackground
                    source={require('./../../src/hostel/vector/account.jpg')}
                    imageStyle={{
                        height: 300,
                        width: width
                    }}

                    resizeMode='contain'
                >

                </ImageBackground>
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
                                "Select Your Gender"  </Text>
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

export default UserProfile

const styles = StyleSheet.create({

    profileImage: {
        width: 71,
        height: 71,
        borderRadius: 50,
        shadowColor: Color.black,
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



})