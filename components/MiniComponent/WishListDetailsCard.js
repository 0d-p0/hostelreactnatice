import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import IconImage from './IconImage'
import Color from '../../Util/Color'

// homescreen rooms

const WishListDetailsCard = ({ props, navigation,house,owner }) => {
    const { name, price, photos, totalBeds, availableBeds } = props
    return (
        <Pressable
            onPress={() =>
                navigation.navigate('RoomDetails', {
                    room: props
                })}
         key={props?._id} style={styles.cardContainer}>
            {/* /\..............Image................... */}
            <View style={{ flex: 0.5 }}>
                <Image
                    style={styles.image}
                    source={{
                        uri: photos?.[0]?.url
                    }}
                    resizeMethod='resize'
                    resizeMode="cover"
                />
            </View>

            {/* /\..............room details................... */}
            <View style={{ flex: 0.5, display: "flex", flexDirection: 'column', justifyContent: "space-between" }}>
                <View>
                    <Text style={styles.text}>
                        <IconImage path={require("../../src/hostel/icon/black/building4.png")}
                        />  {props?.rhouse?.name} {name}
                    </Text>

                    <Text style={styles.text}><IconImage path={require("../../src/hostel/icon/black/location.png")} /> distance from college
                    </Text>

                    <Text style={{ ...styles.text, color: Color.grey, fontSize: 10 }}>
                        <IconImage path={require("../../src/hostel/icon/black/tick.png")} /> total beds {totalBeds} available beds {availableBeds}
                    </Text>

                    <Text style={{ ...styles.text }}>
                        <Text style={{ backgroundColor: Color.green, color: "white", borderRadius: 10 }} >
                            {""} {props?.rhouse?.genderType} {" "}
                        </Text>  </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>
                        <IconImage path={require("../../src/hostel/icon/black/rupee.png")} />{price}
                        <Text style={{ color: Color.grey }}>
                            {""} / bed
                        </Text>

                    </Text>

                    <Pressable
                        onPress={() =>
                            navigation.navigate('RoomDetails', {
                                room: props
                            })
                        }
                    >
                        <Text style={{ ...styles.text, backgroundColor: Color.red, color: "white", padding: 3, borderRadius: 6, textAlign: 'center' }}>see details </Text>
                    </Pressable>
                </View>

            </View>
        </Pressable>
    )
}

export default WishListDetailsCard

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
        // width: windowWidth - 20,
        height: "auto",
        backgroundColor: "#ffff",
        borderRadius: 10,
        shadowColor: Color.black,
        elevation: 5,
        padding: 5,
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',

    },

    image: {
        width: "auto",
        height: 143,
        borderRadius: 10
    },
    text: {
        margin: 4,
        fontSize: 12,
        color: Color.black,
        fontWeight: '900'
    }
})

