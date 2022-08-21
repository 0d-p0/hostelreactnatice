import { Pressable, StyleSheet, Text, View, Switch, ToastAndroid, TextInput, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../../Util/Color'
import IconImage from '../MiniComponent/IconImage'
import RoomPhotosComp from '../MiniComponent/RoomPhotosComp'
import axios from 'axios'
import { domain } from '../../Util/Address'
import { useDispatch } from 'react-redux'
import { roomUpdate } from '../../redux/Actions/userActions'

const RoomDetailsAndUpdate = ({ route, navigation }) => {

    const dispatch = useDispatch()

    const { room } = route.params

    const [isEnabled, setIsEnabled] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);


    const [kitchen, setKitchen] = useState(room?.kitchen || false)
    const [privateBathroom, setPrivateBathroom] = useState(room?.privateBathroom || false)
    const [balcony, setBalcony] = useState(room?.balcony || false)
    const [airCondition, setairCondition] = useState(room?.airCondition || false)
    const [powerBackup, setPowerBackup] = useState(room?.powerBackup || false)

    const [totalBed, setTotalBed] = useState(room?.totalBeds)
    const [activeBed, setActiveBed] = useState(room?.availableBeds)
    const [price, setPrice] = useState(room?.price)

    const [number, setNumber] = useState(0)

    const [show, setShow] = useState({
        totalBed: false,
        availableBeds: false,
        price: false
    })


    const showToast = (message) => {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
        );
    };




    const deleteRoom = async () => {

        try {
            await axios.post(domain + 'api/v1/deleteroom/' + room._id, { withCredentials: true }).then(res => {
                // console.log(res)
                showToast('room deleted')
                setModalVisible(false)
                navigation.navigate('Profile')
                dispatch(roomUpdate())
            }).catch(err => {
                console.error(err)
            })

        } catch (error) {
            console.error(error)
        }
    }

    const updateRoom = async () => {
        if (totalBed < activeBed) {
            return alert("please add less Available room or Equal to total Room")
        }
        try {
            await axios.post(domain + 'api/v1/updateRoom/' + room._id, {
                price: price,
                availableBeds: activeBed,
                totalBeds: totalBed,
            }, { withCredentials: true }).then(res => {
                showToast('room update success')
                dispatch(roomUpdate())
            }).catch(err => {
                console.error(err)
            })

        } catch (error) {
            console.error(error)
        }
    }


    const customizeRoom = async () => {
        try {
            await axios.post(domain + 'api/v1/customizeroom/' + room._id, {
                privateBathroom, kitchen, airCondition, powerBackup, balcony
            }, { withCredentials: true }).then(res => {
                showToast('room update success')
            }).catch(err => {
                console.error(err)
            })

        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        if (number != 0) {
            customizeRoom()
            dispatch(roomUpdate())
        }

        setNumber(number + 1)
    }, [kitchen, privateBathroom, airCondition, balcony, powerBackup])

    return (
        <View style={{ margin: 10 }}>

            <RoomPhotosComp room={room} />


            <Text style={{ color: Color.grey, fontSize: 14, fontWeight: '700', marginBottom: 5 }}> update your room </Text>


            <View style={{ ...styles.card, }}>

                <View>
                    <View>
                        <Pressable
                            onPress={() => setShow({ totalBed: true })}
                            style={{ marginVertical: 10 }}
                        >
                            {!show.totalBed && <Text
                                style={{ backgroundColor: "#3B88F5", ...styles.roomcomp }}
                            >Total Beds
                                <IconImage path={require('../../src/hostel/icon/black/arrowDown.png')} />
                                {totalBed}
                            </Text>}

                            {show.totalBed && <TextInput
                                value={totalBed}
                                onChangeText={setTotalBed}
                                style={{ backgroundColor: "#3B88F5", ...styles.roomcomp }}
                                keyboardType='number-pad'
                                maxLength={1}
                                autoFocus={true}
                                onEndEditing={() => setShow({ price: false })}
                            />}

                        </Pressable>
                    </View>

                    <View>
                        <Pressable
                            onPress={() => setShow({ availableBeds: true })}
                            style={{ marginVertical: 10 }}
                        >
                            {!show.availableBeds && <Text style={{ backgroundColor: "#14CFFF", ...styles.roomcomp }}>
                                Availabe
                                <IconImage path={require('../../src/hostel/icon/black/arrowDown.png')} />
                                {activeBed}
                            </Text>}
                            {show.availableBeds && <TextInput
                                value={activeBed}
                                onChangeText={setActiveBed}
                                style={{ backgroundColor: "#14CFFF", ...styles.roomcomp }}
                                keyboardType='number-pad'
                                maxLength={1}
                                autoFocus={true}
                                onEndEditing={() => setShow({ price: false })}
                            />}


                        </Pressable>
                    </View>


                </View>

                <View>
                    <View>
                        <Pressable
                            onPress={() => setShow({ price: true })}
                            style={{ marginVertical: 10 }}
                        >
                            {!show.price && <Text
                                style={{ backgroundColor: "#74C647", ...styles.roomcomp }}
                            >
                                Price {price}
                            </Text>}

                            {show.price && <TextInput
                                value={price}
                                onChangeText={setPrice}
                                style={{ backgroundColor: "#74C647", ...styles.roomcomp }}
                                keyboardType='number-pad'
                                autoFocus={true}
                                maxLength={4}
                                onEndEditing={() => setShow({ price: false })}
                            />}



                        </Pressable>
                    </View>

                    <View>
                        <Pressable
                            onPress={() => setModalVisible(true)
                            }
                            style={{ marginVertical: 10 }}
                        >
                            <Text style={{ backgroundColor: "#9255E3", ...styles.roomcomp }}>Delete Room
                            </Text>

                        </Pressable>
                    </View>


                </View>

                <View style={{ top: 20 }}>
                    <IconImage
                        path={require('../../src/hostel/icon/chart.png')}
                        width={60}
                        height={60}
                    />
                </View>


            </View>

            <View
                style={{ alignItems: "flex-end", margin: 10 }}
            >
                <Pressable
                    onPress={updateRoom}
                    style={{ backgroundColor: Color.black, borderRadius: 15 }}
                >
                    <Text style={styles.roomcomp}>UPDATE</Text>
                </Pressable>
            </View>

            <Text style={{ color: Color.grey, fontSize: 14, fontWeight: '700', marginBottom: 5 }}>
                personalize your room
            </Text>

            <View style={{ ...styles.card, borderColor: Color.black, flexWrap: 'wrap', padding: 5 }}>

                <View style={{ flexDirection: 'row' }}>
                    <Text> Kitchen</Text>
                    <Switch
                        trackColor={{ false: "#D9D9D9", true: "#0075FF" }}
                        thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={setKitchen}
                        value={kitchen}
                    />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text> private bath</Text>
                    <Switch
                        trackColor={{ false: "#D9D9D9", true: "#0075FF" }}
                        thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={setPrivateBathroom}
                        value={privateBathroom}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text> balcony</Text>
                    <Switch
                        trackColor={{ false: "#D9D9D9", true: "#0075FF" }}
                        thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={setBalcony}
                        value={balcony}
                    />
                </View>

                {/* <View style={{ flexDirection: 'row' }}>
                    <Text > furnished</Text>
                    <Switch
                        trackColor={{ false: "#D9D9D9", true: "#0075FF" }}
                        thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View> */}

                <View style={{ flexDirection: 'row' }}>
                    <Text> Ac room</Text>
                    <Switch
                        trackColor={{ false: "#D9D9D9", true: "#0075FF" }}
                        thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={setairCondition}
                        value={airCondition}
                    />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text> powerbackup</Text>
                    <Switch
                        trackColor={{ false: "#D9D9D9", true: "#0075FF" }}
                        thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={setPowerBackup}
                        value={powerBackup}
                    />
                </View>

            </View>

            <View style={{ marginTop: 50, flexDirection: 'row', left: "20%" }}>
                <IconImage
                    path={require('../../src/hostel/icon/black/shieldTick.png')}
                />
                <Text style={{ color: Color.black, fontWeight: 'bold', fontSize: 10 }}>
                    {" "}
                    Term&condition</Text>
            </View>



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
                            <Pressable
                                style={[styles.button, styles.buttonDelete]}
                                onPress={deleteRoom}
                            >
                                <Text style={styles.textStyle}>delete</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonCancel]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>


            </View>

        </View>
    )
}

export default RoomDetailsAndUpdate

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: "white",
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: Color.green,
        shadowColor: Color.black,
        elevation: 10


    },
    roomcomp: {
        fontSize: 15, fontWeight: 'bold', color: "white", padding: 8, borderRadius: 10,
        textAlign: 'center',
        maxWidth: 120
    },


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
        width: 200
    },
    buttonDelete: {
        backgroundColor: "red",
    },
    buttonCancel: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})