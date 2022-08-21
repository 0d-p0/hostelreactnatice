import { StyleSheet, Text, View, Pressable, ImageBackground, Dimensions, Button } from 'react-native'
import React from 'react'

import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const locationIcon = <Octicons name='location' size={15} color='#c9c9c9' />
const bedIcon = <Ionicons name='bed-outline' size={15} color='#212D31' />
const rupeeicon = <FontAwesome name='rupee' size={20} color='#212D31' />
const FilterIcon = <Ionicons name='filter-sharp' size={30} color='black' />
const DistanceIcon = <MaterialCommunityIcons name='map-marker-distance' size={15} color='#212D31' />

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeStyle = ({ props, user, goto, update, deleteRoom }) => {
    return (
        <View>
            <Pressable key={props._id} style={styles.card} onPress={goto}>

                {(props.photos != undefined) &&
                    <ImageBackground
                        style={styles.image}
                        source={{
                            uri: props.photos[0].url
                        }}
                        resizeMode='cover'

                    >

                        <Text style={styles.priceTxt}>
                            {rupeeicon}{props.price}<Text style={styles.monthTxt}>/Month</Text>
                        </Text>

                        <View style={{
                            display: 'flex', flexDirection: 'row',
                            justifyContent: 'space-between', marginHorizontal: 10, position: "absolute", bottom: 2, width: windowWidth - 50
                        }}>
                            <Button
                                title='update'
                                onPress={update}
                            />

                            <Button
                                title='delete'
                                color={"red"}
                                onPress={deleteRoom}
                            />
                        </View>
                    </ImageBackground>}



                <View style={styles.textContainer}>
                    <View style={{ flex: 0.9 }}>
                        <Text style={styles.text} ellipsizeMode="clip" numberOfLines={1}>
                            {props.name}
                        </Text>
                        {user.userType == "student" ? <Text style={styles.locationtxt}>
                            {DistanceIcon}  {testloc(props?.coordinate?.coordinates?.[0], props?.coordinate?.coordinates?.[1])} Meater from college
                        </Text> : <Text style={{ ...styles.locationtxt, color: "grey" }}>
                            {locationIcon} Haldia
                        </Text>}

                    </View>
                    <Text style={styles.roomtxt}> {bedIcon} {props.totalBeds}Beds</Text>
                </View>


            </Pressable>

        </View>
    )
}

export default HomeStyle

const styles = StyleSheet.create({

    container: {
        padding: 10,
        height: '100%',
        backgroundColor: '#fafafa',
        paddingEnd: 20,
    },
    card: {
        margin: 10,
        // width: windowWidth - 20,
        height: "auto",
        backgroundColor: "#ffff",
        borderRadius: 10,
        shadowColor: "blue",
        elevation: 14,
        padding: 5,

    },
    image: {
        height: windowHeight / 4,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        borderColor: '#fafafa',
        borderWidth: 1

    },
    text: {
        fontSize: 20,
        fontFamily: "NotoSansRegular",
        color: '#212D31',
        marginLeft: 10,

    },

    priceTxt: {
        fontSize: 20,
        margin: 10,
        padding: 5,
        fontFamily: 'NotoSansRegular',
        color: '#191917',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#f7f7f7',
        borderRadius: 8

    },
    monthTxt: {
        fontSize: 15,
        fontFamily: 'NotoSansLight',
        justifyContent: 'center',
        color: '#a2a2a2',
    },

    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },

    locationtxt: {
        fontFamily: 'NotoSansLight',
        fontSize: 15,
        color: 'black',
        marginLeft: 10,
    },
    roomtxt: {
        fontFamily: 'NotoSansMedium',
        fontSize: 15,
        padding: 5,
        margin: 10,
        backgroundColor: '#f7f7f7',
        borderRadius: 5,
        color: '#a2a2a2',
        paddingTop: 12
    },


});