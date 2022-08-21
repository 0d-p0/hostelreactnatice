import { StyleSheet, Text, View, Image, Dimensions, ScrollView, ImageBackground, Pressable, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { domain } from '../../Util/Address'
import HomeStyle from '../MiniComponent/HomeStyle'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')


const UserHouse = ({ route, navigation }) => {


    const { user } = route.params

    const [house, setHouse] = useState()
    const [room, setRoom] = useState()

    const [show, setShow] = useState(false)

    const [roomId, setRoomID] = useState()
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        axios.get(domain + "api/v1/userhouse/" + user._id).then(res => {
            setHouse(res.data?.house?.[0])
            setRoom(res.data?.house?.[0].rooms)
        }).catch(err => console.log(err.message))
    }, [modalVisible])


    const deleteRoom = async () => {
        await axios.post(domain + "api/v1/deleteroom/" + roomId).then((res => {
            console.log(res.data)
            setModalVisible(!modalVisible)

        })).catch(err => console.log(err))

    }

    return (
        <View>

            {house ? <View>

                <ScrollView>

                    {/*................... house image................ */}
                    {!show && <ImageBackground
                        style={styles.houseImage}
                        source={{
                            uri: house?.pictures?.[0].url
                        }}
                    >
                        <Text style={styles.name}> {house?.name} </Text>

                    </ImageBackground>}
                    {/*...................show/hide rooms button................ */}

                    <Pressable
                        onPress={() => setShow(!show)}
                        style={{ ...styles.allRoomButton }}>
                        {!show ? <Text style={styles.allRoomText}> Show all room</Text>
                            : <Text style={styles.allRoomText}> Hide all room</Text>}
                    </Pressable>
                    {/*................... all room................ */}

                    {!(room?.length <= 0) ? show && room && room.map((props) => (
                        <HomeStyle key={props._id} props={props} user={user}
                         update={() => navigation.navigate('UpdateHouse',{
                            room:props
                         })}

                            deleteRoom={() => {
                                setModalVisible(true)
                                setRoomID(props._id)
                            }}
                        />
                    )) : <Text style={{ ...styles.allRoomButton, color: '#111111', fontWeight: '600' }}>You dont have any room</Text>}


                </ScrollView>


                {/*...... modal to for delete and update................ */}

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
            </View> : <Text style={{ ...styles.allRoomButton, color: '#111111', fontWeight: '600' }}>You dont have any room</Text>}


        </View>
    )
}

export default UserHouse

const styles = StyleSheet.create({
    houseImage: {
        width: screenWidth - 20,
        height: screenHeight / 2,
        margin: 10,
        borderRadius: 20

    },
    name: {
        fontSize: 20,
        margin: 10,
        padding: 5,
        fontFamily: 'NotoSansRegular',
        color: '#191917',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#f7f7f7',
        borderRadius: 8
    },

    allRoomButton: {
        margin: 10,
        width: screenWidth - 20,
        height: "auto",
        backgroundColor: "#ffff",
        borderRadius: 10,
        shadowColor: "blue",
        elevation: 5,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    allRoomText: {
        color: "black",
        fontWeight: '600',
        fontSize: 20
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