import { Dimensions, View, ScrollView, ImageBackground, Pressable, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import Slider from '../Hooks/Slider';
import DotIconComp from './DotIconComp';

import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { domain } from '../../Util/Address';
import getAuthUser from '../Hooks/getAuthUser';
import { useDispatch, useSelector } from 'react-redux';
import { roomUpdate } from '../../redux/Actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HeartFillIcon = <Ionicons name='heart' size={30} color="red" />
const HeartIcon = <Ionicons name='heart-outline' size={30} color="black" />

const width = Dimensions.get('window').width

const RoomPhotosComp = ({ room }) => {

    const dispatch = useDispatch()

    const [like, setLike] = useState(false)

    const { onScroll2, index2 } = Slider()

    const { user } = getAuthUser()

    useEffect(() => {
        userlikecheck()
    }, [user]);

    const handelLike = async (id) => {
        setLike(!like)
        await axios.get(domain + "api/v1/addwhishlist/" + id, { withCredentials: true }).then(res => {
            AsyncStorage.setItem('@storage_Key', JSON.stringify(res.data.user)).then(() => dispatch(roomUpdate())
            )
            // dispatch(valueChange())
            if (!like)
                ToastAndroid.show("added to wish list", ToastAndroid.SHORT);
        }).catch(err => { console.log(err) })

    }

    const userlikecheck = () => {
        const result = user?.wishList.includes(room._id)
        if (result) {
            setLike(true)
        }

    }
    return (
        <View style={{ marginTop: 10 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled onScroll={onScroll2}
                scrollEventThrottle={200}
                directionalLockEnabled="fast">

                {room && room.photos.map((props, index) => (
                    <View
                        key={index}
                        style={{
                            width: width - 20,
                            height: 273,
                            borderRadius: 10
                        }}>
                        <ImageBackground
                            source={{
                                uri: props?.url
                            }}
                            resizeMode='cover'
                            imageStyle={{
                                width: "auto",
                                height: 273,
                                borderRadius: 10
                            }}
                        >




                        </ImageBackground>
                    </View>
                ))}
            </ScrollView>

       {(user?.userType=='student') &&    <View style={{ alignItems: 'flex-end', padding: 2 }}>
                <Pressable
                    onPress={() => handelLike(room._id)}
                    style={{ top: -270, backgroundColor: "white", borderRadius: 50, padding: 2 }}>
                    {like ? HeartFillIcon : HeartIcon}
                </Pressable>
            </View>}


            <View style={{ top: -30, alignItems: 'center' }}>
                <DotIconComp
                    room={room} index2={index2}
                />
            </View>



        </View>
    )
}

export default RoomPhotosComp

