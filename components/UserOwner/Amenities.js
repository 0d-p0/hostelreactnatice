import { StyleSheet, Text, View, Switch, Pressable, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import IconImage from '../MiniComponent/IconImage'
import Color from '../../Util/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { domain } from '../../Util/Address';
import { useDispatch } from 'react-redux';
import { valueChange } from '../../redux/Actions/userActions';
import getAuthUser from '../Hooks/getAuthUser';

const Amenities = ({ props, house }) => {

    const dispatch = useDispatch()

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [totalBeds, setTotalBeds] = useState(1)
    const [availableBeds, setAvailableBeds] = useState(1)
    const [totalRooms, setTotalRooms] = useState()
    const [totalRent, setTotalRent] = useState(1)


    const [hasCCTV, setHasCCTV] = useState(house?.hasCCTV || false)
    const [hasFood, setHasFood] = useState(house?.hasFood || false)
    const [hasWifi, setHasWifi] = useState(house?.hasWifi || false)


    const [number, setNumber] = useState(0)

    const updateHouseRules = async () => {
        await axios.post(`${domain}api/v1/updatehomerules/${house?._id}`, { hasCCTV, hasFood, hasWifi }).then((res) => {
            showToastWithGravity()
        }).catch(err => console.error(err))
    }

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravityAndOffset(
            "home rules updated",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
        );
    };



    useEffect(() => {
        if (number != 0) {
            updateHouseRules()
        }

        setNumber(number + 1)
    }, [hasCCTV, hasFood, hasWifi])


    useEffect(() => {

        props.map((element) => (
            setTotalRent(element.price + totalRent)
        ))
        //  for (let index = 0; index < 10; index++) {
        //    setTotalBeds(totalBeds+1)


        //  }
    }, [])

    const signOut = async () => {
        try {


            await GoogleSignin.signOut();
            const data = await axios.get(domain + "api/v1/logoutandroid")
            console.log("plp", data.data)
            await AsyncStorage.removeItem('@storage_Key').then(() => dispatch(valueChange())
            )
            // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    }


    const BoxCard = ({ number, text, size }) => {
        return (
            <View style={{ width: 75, backgroundColor: "#B680FF", borderRadius: 12, padding: 5, height: 72 }}>
                <Text style={{ fontSize: size, fontWeight: "bold", color: '#ffffff', textAlign: 'center' }}>
                    {number}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold", color: '#ffffff', textAlign: 'center' }}>
                    {text}
                </Text>

            </View>
        )
    }

    return (
        <View>
            <View style={{ backgroundColor: "#9255E3", padding: 10, paddingBottom: 60, paddingVertical: 30, borderTopStartRadius: 30, borderTopRightRadius: 30 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                    <BoxCard number={totalBeds} text={"Total Bed"} size={35} />
                    <BoxCard number={availableBeds} text={"Available"} size={35} />
                    <BoxCard number={2} text={"Rooms"} size={35} />
                    <BoxCard number={totalRent} text={"/Month"} size={15} />

                </View>

            </View>

            <View style={{ top: -30, padding: 10, paddingBottom: 40, paddingVertical: 20, borderTopStartRadius: 30, borderTopRightRadius: 30, backgroundColor: "white", height: 700, }} >

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>


                    <View style={{ alignItems: 'center' }}>

                        <View style={{ marginBottom: 10 }}>
                            <IconImage
                                path={require('../../src/hostel/icon/cctv.png')}
                                height={95} width={95}
                            />
                        </View>

                        <Switch
                            trackColor={{ false: "#D9D9D9", true: "#0075FF" }}
                            thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={setHasCCTV}
                            value={hasCCTV}
                        />

                    </View>

                    <View style={{ alignItems: 'center' }}>

                        <View style={{ marginBottom: 10 }}>
                            <IconImage
                                path={require('../../src/hostel/icon/food.png')}
                                height={95} width={95}
                            />
                        </View>

                        <Switch
                            trackColor={{ false: "#D9D9D9", true: "#0075FF" }}
                            thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={setHasFood}
                            value={hasFood}
                        />

                    </View>

                    <View style={{ alignItems: 'center' }}>

                        <View style={{ marginBottom: 10 }}>
                            <IconImage
                                path={require('../../src/hostel/icon/wifi.png')}
                                height={95} width={95}
                            />
                        </View>

                        <Switch
                            trackColor={{ false: "#D9D9D9", true: "#0075FF" }}
                            thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={setHasWifi}
                            value={hasWifi}
                        />

                    </View>
                </View>

                <View style={{ alignItems: "center", marginTop: 30 }}>
                    <Pressable
                        onPress={signOut}
                        style={{ flexDirection: 'row' }}>
                        <IconImage
                            path={require('../../src/hostel/icon/google.png')}

                            width={30} height={30}
                        />

                        <Text style={styles.signOutText}>
                            sign out
                        </Text>
                    </Pressable>
                </View>

            </View>
        </View>
    )
}

export default Amenities

const styles = StyleSheet.create({
    signOutText: {
        fontSize: 15, fontWeight: 'bold', color: "#9F9F9F", backgroundColor: "#D9D9D9", paddingHorizontal: 10, borderRadius: 20, textAlign: 'center', marginTop: 5, marginLeft: 10
    }
})