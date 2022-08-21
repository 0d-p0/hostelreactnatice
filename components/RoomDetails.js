import { StyleSheet, Text, View, Image, Pressable, ImageBackground, Linking, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import Color from '../Util/Color'
import IconImage from './MiniComponent/IconImage'
import HeaderComp from './MiniComponent/HeaderComp'

import RoomPhotosComp from './MiniComponent/RoomPhotosComp'

const { width, height } = Dimensions.get('window')


const RoomDetails = ({ route, navigation }) => {

    const { room } = route.params


    // for direction 
    const roomLocation = room?.rhouse?.loc?.coordinates?.[0] + "," + room?.rhouse?.loc?.coordinates?.[1]


    const RoomDetails = ({ yesNo, value }) => {
        return (
            <View style={{ flexDirection: 'row', width: (width / 2) - 32, margin:1 }}>


                <View style={{ top: 8 }}>
                    <IconImage
                        path={yesNo ? require('./../src/hostel/yes.png') : require('./../src/hostel/no.png')}
                    />
                </View>
                <Text style={{ fontSize: 14, color: Color.black, fontWeight: '700', margin: 5 }}>
                    {value}
                </Text>



            </View>
        )
    }

    return (
        <View style={styles.container}>

            {/*....... render header component ...*/}
            <HeaderComp navigation={navigation} />

            <ScrollView  >

                {/*....... render owner and room detail ...*/}
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={styles.roomownerprofileImage}
                        source={{
                            uri: room?.owner?.avatar
                        }}
                    />


                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 15, color: Color.black, fontWeight: "700" }}>
                            {room?.owner?.name}</Text>

                        <View style={{ flexDirection: 'row' }}>

                            <IconImage path={require('.././src/hostel/icon/black/building4.png')} width={15} height={15} />

                            <View>
                                <Text style={{ fontSize: 12, color: Color.grey, fontWeight: "700" }}>
                                    {""} room owner
                                </Text>
                                <Text style={{ fontSize: 12, color: Color.grey, fontWeight: "700", left: -12 }}>
                                    {room?.rhouse?.name} {room?.name}
                                </Text>
                            </View>
                        </View>




                    </View>


                </View>
                {/*....... render room photos ...*/}

                <View>
                    <RoomPhotosComp room={room} />
                </View>

                {/*....... render room detail ...*/}
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <IconImage path={require('.././src/hostel/icon/black/tick.png')} width={20} height={20} />
                    <Text style={{ color: Color.grey, fontSize: 12 }}>{""} total bed {room?.totalBeds} available bed {room?.availableBeds} {""}</Text>

                    <IconImage path={require('.././src/hostel/icon/black/location.png')} width={20} height={20} />

                    <Text style={{ color: Color.grey, fontSize: 12 }} >
                        567 meter  from college
                    </Text>


                </View>

                {/*....... render owner phone number view button ...*/}
                <View style={{ alignItems: 'flex-end' }}>
                    <Pressable style={{ backgroundColor: Color.red, padding: 5, borderRadius: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: "900", color: "white" }}>
                            view Phone Number
                        </Text>
                    </Pressable>
                </View>

                {/*....... render random recomended homes ...*/}
                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                    <Text style={{ transform: [{ rotate: '-90deg' }], fontSize: 20, padding: 5, right: -90, marginLeft: -90 }}>
                        Similar price
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ width: 126, height: 126, marginRight: 10 }}>
                            <ImageBackground
                                imageStyle={{ ...styles.recomendedRoomImage }}
                                source={{
                                    uri: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571458.jpg&fm=jpg"
                                }}
                                resizeMode="cover"
                            >

                                <View style={{ alignItems: "flex-start", top: 20, left: 10 }}>

                                    <Text style={{ color: Color.black, backgroundColor: "white", paddingHorizontal: 5, fontSize: 12, fontWeight: '600' }}>
                                        $1500
                                    </Text>
                                </View>

                            </ImageBackground>

                        </View>

                        <View style={{ width: 126, height: 133, marginRight: 10 }}>
                            <ImageBackground
                                imageStyle={{ ...styles.recomendedRoomImage }}
                                source={{
                                    uri: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571458.jpg&fm=jpg"
                                }}
                                resizeMode="cover"
                            >

                                <View style={{ alignItems: "flex-start", top: 20, left: 10 }}>

                                    <Text style={{ color: Color.black, backgroundColor: "white", paddingHorizontal: 5, fontSize: 12, fontWeight: '600' }}>
                                        $1500
                                    </Text>
                                </View>

                            </ImageBackground>

                        </View>
                        <View style={{ width: 126, height: 133, marginRight: 10 }}>
                            <ImageBackground
                                imageStyle={{ ...styles.recomendedRoomImage }}
                                source={{
                                    uri: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571458.jpg&fm=jpg"
                                }}
                                resizeMode="cover"
                            >

                                <View style={{ alignItems: "flex-start", top: 20, left: 10 }}>

                                    <Text style={{ color: Color.black, backgroundColor: "white", paddingHorizontal: 5, fontSize: 12, fontWeight: '600' }}>
                                        $1500
                                    </Text>
                                </View>

                            </ImageBackground>

                        </View>

                        <View style={{ width: 126, height: 133, marginRight: 10 }}>
                            <ImageBackground
                                imageStyle={{ ...styles.recomendedRoomImage }}
                                source={{
                                    uri: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571458.jpg&fm=jpg"
                                }}
                                resizeMode="cover"
                            >

                                <View style={{ alignItems: "flex-start", top: 20, left: 10 }}>

                                    <Text style={{ color: Color.black, backgroundColor: "white", paddingHorizontal: 5, fontSize: 12, fontWeight: '600' }}>
                                        $1500
                                    </Text>
                                </View>

                            </ImageBackground>

                        </View>


                    </ScrollView>
                </View>

                {/*....... render house rules ...*/}
                <View>


                    <Text style={{ color: Color.grey, fontWeight: '900', fontSize: 15, marginLeft: 20 }}>
                        <IconImage path={require('.././src/hostel/icon/leaf.png')} width={20} height={20} /> {" "}
                        House Rules and amenities
                    </Text>

                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 20 }}>



                        <RoomDetails yesNo={room?.kitchen} value={"Kitchen Availalbe"} />
                        <RoomDetails yesNo={room?.airCondition} value={"Air Condition"} />

                        <RoomDetails yesNo={room?.balcony} value={"Balcony Availabe"} />
                        <RoomDetails yesNo={room?.rhouse?.depositMoney} value={"Security Money"} />
                        <RoomDetails yesNo={room?.rhouse?.hasLockInPeriod} value={"Lock In Period"} />

                        <RoomDetails yesNo={room?.rhouse?.hasWifi} value={"WIFI Available"} />



                        <RoomDetails yesNo={room?.rhouse?.hasCCTV} value={"CCTV Available"} />

                        <RoomDetails yesNo={room?.privateBathroom} value={"Private Bathroom"} />
                        <RoomDetails yesNo={room?.rhouse?.drinking} value={"Drinking/Smoking"} />

                        <RoomDetails yesNo={room?.rhouse?.hasFood} value={"Food Available"} />

                        <RoomDetails yesNo={room?.rhouse?.oppositeGender} value={"Opposite Gender allow"} />

                        <RoomDetails yesNo={room?.rhouse?.doYouLiveHere} value={"Owner Lived With Family"} />






                    </View>
                </View>

                {/*....... render direction button ...*/}



                <View style={{ height: 100 }}>

                </View>
            </ScrollView>

            <View style={{
                position: 'absolute', bottom: 40, width: width

            }}>
                <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom: 10 }}>

                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "900", color: Color.black, marginLeft: 5 }} >
                            Price
                        </Text>

                        <Text style={{ fontSize: 20, fontWeight: "900", color: '#666666' }} >
                            <IconImage
                                path={require('../src/hostel/icon/black/rupee.png')}
                                height={20}
                                width={20}
                            />
                            2500/
                            <Text style={{ fontSize: 15, fontWeight: "900", color: '#B5B5B5' }} >
                                {""}month {" "}Available {room?.availableBeds}
                            </Text>


                        </Text>
                    </View>

                    <View style={{ alignItems: "center", marginTop: 5, backgroundColor: "#3B88F5", padding: 8, borderRadius: 8 }}>
                        <Pressable
                            onPress={() => Linking.openURL("https://www.google.com/maps/dir/?api=1&destination=" + roomLocation)}
                            style={{ flexDirection: 'row', alignItems: "center", }}
                        >
                            <IconImage
                                path={require(".././src/hostel/icon/direction.png")}
                                width={25} height={25}
                            />
                            <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold' }}>
                                {"  "}direction
                            </Text>
                        </Pressable>
                    </View>

                </View>
            </View>


        </View>
    )
}

export default RoomDetails

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white'
    },
    cardContainer: {
        margin: 2,
        // width: windowWidth - 20,
        height: "auto",
        backgroundColor: "#ffff",
        borderRadius: 10,
        shadowColor: Color.black,
        elevation: 5,
        padding: 3,


    },
    roomownerprofileImage: {
        width: 54,
        height: 54,
        borderRadius: 50,
        shadowColor: Color.black,
    },
    recomendedRoomImage: {
        width: 126,
        height: 126,
        borderRadius: 10
    }
})


// back up homeRules and amenities

{/* <View style={{ flexDirection: 'row' }}>
<IconImage
    path={require('./../src/hostel/icon/handup.png')}
/>
<Text>
    {room?.kitchen ? "Kitchen available" : 'Kitchen not available'}
</Text>
</View> */}



{/* <View style={{ flexDirection: 'row' }}>
                            <IconImage
                                path={require('./../src/hostel/icon/handup.png')}
                            />
                            <Text>
                                {room?.airCondition ? "AC available" : 'AC not available'}
                            </Text>
                         </View> */}


//     <View style={{ flexDirection: 'row' }}>
//     <IconImage
//         path={require('./../src/hostel/icon/handup.png')}
//     />
//     <Text>
//         {room?.balcony ? "balcony available" : 'balcony not available'}
//     </Text>
// </View>

//     <View style={{ flexDirection: 'row' }}>
//     <IconImage
//         path={require('./../src/hostel/icon/handup.png')}
//     />
//     <Text>
//         {room?.rhouse?.hasWifi ? "wifi available" : 'wifi not available'}
//     </Text>
// </View>




//     <View style={{ flexDirection: 'row' }}>
//     <IconImage
//         path={require('./../src/hostel/icon/handup.png')}
//     />
//     <Text>
//         {room?.rhouse?.hasFood ? "food available" : 'food not available'}
//     </Text>
// </View>





//     <View style={{ flexDirection: 'row' }}>
//     <IconImage
//         path={require('./../src/hostel/icon/handup.png')}
//     />
//     <Text>
//         {room?.rhouse?.hasCCTV ? "CCTV available" : 'CCTV not available'}
//     </Text>
// </View>



//     <View style={{ flexDirection: 'row' }}>
//     <IconImage
//         path={require('./../src/hostel/icon/handup.png')}
//     />
//     <Text>
//         {room?.rhouse?.hasLockInPeriod ? "Lock In Period available" : 'no lock in period'}
//     </Text>
// </View>




{/* <View style={{ flexDirection: 'row' }}>
                            <IconImage
                                path={require('./../src/hostel/icon/handup.png')}
                            />
                            <Text>
                                {room?.rhouse?.drinking ? "drinking allow" : 'drinking not allow'}
                            </Text>
                        </View> */}

{/* <View style={{ flexDirection: 'row' }}>
                            <IconImage
                                path={require('./../src/hostel/icon/handup.png')}
                            />
                            <Text>
                                {room?.rhouse?.depositMoney ? "need security money" : 'security money not needed'}
                            </Text>
                        </View> */}

{/* <View style={{ flexDirection: 'row' }}>
                            <IconImage
                                path={room?.privateBathroom ? require('./../src/hostel/yes.png') : require('./../src/hostel/no.png')}
                            />
                            <Text>
                                {room?.privateBathroom ? "privateBathroom available" : 'privateBathroom not available'}
                            </Text>
                        </View> */}

{/* <View style={{ flexDirection: 'row' }}>
                            <IconImage
                                path={require('./../src/hostel/icon/handup.png')}
                            />
                            <Text>
                                {room?.rhouse?.oppositeGender ? "opposite Gender allow" : 'opposite Gender not allow'}
                            </Text>
                        </View> */}

{/* <View style={{ flexDirection: 'row' }}>
                            <IconImage
                                path={require('./../src/hostel/icon/handup.png')}
                            />
                            <Text>
                                {room?.rhouse?.doYouLiveHere ? "owner lived with family" : 'owner not lived with family '}
                            </Text>
                        </View> */}