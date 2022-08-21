import { StyleSheet, Text, View, ImageBackground, Pressable, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import IconImage from '../MiniComponent/IconImage'
import Color from '../../Util/Color'
import UserRooms from './UserRooms'
import { useEffect } from 'react'
import axios from 'axios'
import { domain } from '../../Util/Address'
import { useState } from 'react'
import HomeRules from './HomeRules'
import UserHeadernavigation from './UserHeadernavigation'
import Amenities from './Amenities'
import getAuthUser from '../Hooks/getAuthUser'
import { useSelector } from 'react-redux'
const height = Dimensions.get('window').height

const UserRoomDetails = ({ navigation, route }) => {
    const { user, loading, setLoading } = getAuthUser()
    const [houseRoom, setHouseRoom] = useState([])

    const [option, setOption] = useState("room")

    const { ru } = useSelector((state) => state.value)

    useEffect(() => {

        setLoading(true)
        user && axios.get(domain + "api/v1/userhouse/" + user?._id, { withCredentials: true }).then(res => {
            setHouseRoom(res.data.rooms)
            setLoading(false)
            console.log(res.data.rooms)
        }).catch(err => {
            console.error(err.message)
            setLoading(false)
        })
        

    }, [user, option, ru])


    // console.log(houseRoom?.[0]?.allRooms?.[0]?.photos?.[0]?.url)

    return (
        <View style={styles.container}>
            <UserHeadernavigation navigation={navigation} />

            {loading && <View style={{ alignItems: 'center', top: height / 2 }}>
                <ActivityIndicator size='large' color="#0000ff" />
            </View>}

            {!loading && <View>

                {/* ...........render house Image.............. */}
                <View style={styles.houuseImage}>
                    <ImageBackground
                        source={{
                            uri: houseRoom?.[0]?.pictures?.[0]?.url
                        }}
                        imageStyle={styles.houuseImage}
                    >
                        <View style={{ top: 150, alignItems: "flex-end", left: -10 }}>
                            <View style={{ backgroundColor: "white", padding: 6, borderRadius: 50 }}>
                                <IconImage
                                    path={require("../../src/hostel/icon/camera.png")}
                                />
                            </View>
                        </View>
                    </ImageBackground>

                </View>
                {/* ...........render house owner profile.............. */}
                <View style={{ alignItems: "center", left: -30, top: -50, height: 90 }} >

                    {/* user profile picture */}
                    <ImageBackground
                        source={{
                            uri: houseRoom?.[0]?.userDetails?.avatar
                        }}

                        imageStyle={styles.profileImage}
                        resizeMode="contain"
                    >

                        <View style={{ top: 55, alignItems: "center", left: 60 }}>
                            <View style={{ backgroundColor: "white", padding: 6, borderRadius: 50 }}>
                                <IconImage
                                    path={require("../../src/hostel/icon/camera.png")}
                                />
                            </View>
                        </View>

                    </ImageBackground>
                    {/*..... owner name ... */}
                    <View style={{ top: 70, left: 30 }}>
                        <Text style={{ color: Color.black, fontWeight: 'bold', fontSize: 18 }} >{houseRoom?.[0]?.userDetails?.name} </Text>
                    </View>
                </View>


                {/* ...........render options.............. */}
                <View style={{ flexDirection: "row" }}>
                    <Pressable
                        onPress={() => setOption("room")}
                        style={{ flexDirection: "row", margin: 10 }}>
                        <IconImage
                            path={require('../../src/hostel/icon/house.png')}
                            width={20} height={20}
                        />
                        <Text>{"  "}</Text>
                        <View style={{ alignItems: "center" }}>
                            <Text style={(option == "room") ? styles.ownerOptionTextActive : styles.ownerOptionText}> Room </Text>
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={() => setOption("homerules")}
                        style={{ flexDirection: "row", margin: 10 }}>
                        <IconImage
                            path={require('../../src/hostel/icon/term.png')}
                            width={20} height={20}
                        />
                        <Text style={(option == "homerules") ? styles.ownerOptionTextActive : styles.ownerOptionText} > {" "}Home rules </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setOption("Amenities")}
                        style={{ flexDirection: "row", margin: 10 }}>
                        <IconImage
                            path={require('../../src/hostel/icon/chart.png')}
                            width={20} height={20}
                        />
                        <Text style={(option == "Amenities") ? styles.ownerOptionTextActive : styles.ownerOptionText}>{" "} Amenities </Text>
                    </Pressable>

                </View>

                {(option != "Amenities") && <View style={{ height: 10, marginVertical: 10, backgroundColor: "#E0E0E0" }}>

                </View>}

                {/* ...........render users/owner rooms.............. */}


                {(option == "room") && <View style={{ margin: 5, flexGrow: 1, height: (height / 2) - 40 }}>
                    <ScrollView>
                        <View style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-between", }}>
                            {houseRoom?.[0]?.allRooms.map((props, index) => (
                                <UserRooms key={index} index={index} photoUrl={props?.photos?.[0]?.url}
                                    navigation={navigation} room={props}
                                />
                            ))}
                        </View>


                        <View style={{ height: 30, marginBottom: 10 }}>

                        </View>

                    </ScrollView>
                </View>}


                {(option == "homerules") && <View style={{ margin: 10 }} >
                    <HomeRules house={houseRoom?.[0]} />
                </View>}

                {(option == "Amenities") &&

                    <View>
                        <Amenities props={houseRoom?.[0]?.allRooms} house={houseRoom?.[0]} />
                    </View>}

            </View>}



        </View>
    )
}

export default UserRoomDetails

const styles = StyleSheet.create({
    container: {
        // margin: 10
    },
    houuseImage: {
        height: 186,
        borderRadius: 10,
        margin: 5
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: 'white'
    },
    ownerOptionTextActive: {
        backgroundColor: Color.lightsky, borderRadius: 14,
        color: Color.lightGren,
        fontSize: 15, fontWeight: 'bold',
        // paddingHorizontal: 5
    },
    ownerOptionText: {
        borderRadius: 14,
        color: Color.grey,
        fontSize: 15, fontWeight: 'bold',
        // paddingHorizontal: 5
    }
})
