import { StyleSheet, Text, View, Switch, Pressable, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import IconImage from '../MiniComponent/IconImage';
import Color from '../../Util/Color';
import axios from 'axios';
import { domain } from '../../Util/Address';



const HomeRules = ({ house }) => {



    const [doYouLiveHere, setDoYouLiveHere] = useState(house?.doYouLiveHere || false)
    const [oppositeGender, setOppositeGender] = useState(house?.oppositeGender || false)
    const [depositMoney, setDepositMoney] = useState(house?.depositMoney || false)
    const [drinking, setDrinking] = useState(house?.drinking || false)
    const [hasLockInPeriod, setHasLockInPeriod] = useState(house?.hasLockInPeriod || false)

    const [number, setNumber] = useState(0)

    const updateHouseRules = async () => {
        await axios.post(`${domain}api/v1/updatehomerules/${house?._id}`, { doYouLiveHere, oppositeGender, depositMoney, drinking, hasLockInPeriod }).then((res) => {
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
    }, [doYouLiveHere, oppositeGender, depositMoney, drinking, hasLockInPeriod])



    const Help = ({ text, icon, isEnabled, setIsEnabled }) => {
        return (

            <View style={{ flexDirection: 'row', top: -30 }}>

                <View style={{ marginTop: 10 }}>
                    <IconImage
                        path={icon}
                        height={25}
                        width={25}
                    />
                </View>


                <Text style={{ padding: 10, borderWidth: 1, borderRadius: 5, fontWeight: "800", color: Color.grey, width: 150, margin: 10 }}>
                    {text}
                </Text>
                <Switch
                    trackColor={{ false: "#D9D9D9", true: "#0075FF" }}
                    thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setIsEnabled}
                    value={isEnabled}
                />

            </View>
        )
    }

    const yesNo =(value)=>{
        return value?"(yes)":'(no)'
    }

    return (
        <ScrollView>

            <View style={{ margin: 20 }}>
                <Help text={"Do you live here"} icon={require("../../src/hostel/icon/choice.png")} isEnabled={doYouLiveHere} setIsEnabled={() => setDoYouLiveHere(!doYouLiveHere)} />
                <Help text={"opposite gender"} icon={require("../../src/hostel/icon/choice.png")} isEnabled={oppositeGender} setIsEnabled={() => setOppositeGender(!oppositeGender)} />
                <Help text={"Deposit Money"} icon={require("../../src/hostel/icon/choice.png")} isEnabled={depositMoney} setIsEnabled={() => setDepositMoney(!depositMoney)} />
                <Help text={"Drink,Smoking"} icon={require("../../src/hostel/icon/choice.png")} isEnabled={drinking} setIsEnabled={() => setDrinking(!drinking)} />
                <Help text={"Lock in Period"} icon={require("../../src/hostel/icon/choice.png")} isEnabled={hasLockInPeriod} setIsEnabled={() => setHasLockInPeriod(!hasLockInPeriod)} />



                <View style={{ flexDirection: 'row', left: 50, top: -10 }}>

                    <IconImage
                        path={require("../../src/hostel/icon/phone.png")}
                        height={35}
                        width={35}

                    />

                    <Pressable
                        style={{ marginLeft: 10 }}
                    >
                        <Text style={{ color: Color.grey, backgroundColor: "#D9D9D9", paddingHorizontal: 10, borderRadius: 15, paddingVertical: 4 }}>
                            Update Phone Number
                        </Text>
                    </Pressable>
                </View>

            </View>

            <View
                style={{ height: 800 }}
            ></View>
        </ScrollView>
    )
}

export default HomeRules

const styles = StyleSheet.create({})