import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Modal, Button, Linking, Pressable, ToastAndroid } from 'react-native'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { domain } from '../../Util/Address';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { valueChange } from '../../redux/Actions/userActions';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const locationIcon = <Octicons name='location' size={15} color='#c9c9c9' />
const bedIcon = <Ionicons name='bed-outline' size={15} color='#212D31' />
const rupeeicon = <FontAwesome name='rupee' size={20} color='#212D31' />

const HeartFillIcon = <Ionicons name='heart' size={40} color="red" />
const HeartIcon = <Ionicons name='heart-outline' size={40} color="black" />

const DotIcon = ({ color }) => { return (<Octicons name='dot-fill' color={color} size={20} />) }

const RoomDetails = ({ route }) => {
  const dispatch = useDispatch()
  const { room } = route.params
  const [like, setLike] = useState(false)

  const { user } = useSelector((state) => state.user)

  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);


  // Use the index
  useEffect(() => {
    userlikecheck()

  }, []);

  const handelLike = async (id) => {
    setLike(!like)
    await axios.get(domain + "api/v1/addwhishlist/" + id, { withCredentials: true }).then(res => {
      console.log(res.data)
      dispatch(valueChange())
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

  // for direction 
  const roomLocation = room?.coordinate?.coordinates?.[0] + "," + room?.coordinate?.coordinates?.[1]


  const Dotstyle = () => {

    return (
      <View style={{
        display: 'flex', flexDirection: 'row', backgroundColor: "#111111",
        borderRadius: 8, opacity: 0.8, paddingHorizontal: 5
      }}>
        {room.photos.map((prop, dex) => (
          <View key={dex} >
            <Text style={{ color: (index == dex) ? "white" : "green", }}> <DotIcon color={(index == dex) ? "white" : "grey"} /> </Text>
          </View>

        ))}
      </View>
    )
  }

  return (
    <View style={{ ...styles.cointainer, bottom: 10 }}>

      <View style={{ bottom: -15 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled onScroll={onScroll}
          scrollEventThrottle={200}
          directionalLockEnabled="fast"
        >
          {room && room.photos.map((props, index) => (
            <View key={index}>

              <Image
                style={styles.images}
                source={{
                  uri: props.url
                }}
              />



            </View>
          ))}

        </ScrollView>
        <View style={{ top: -30, alignItems: 'center' }}>
          <Dotstyle />
        </View>

      </View>



      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ borderRadius: 20 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
            <View>
              <Text style={styles.text}>
                {room.name}
              </Text>
              <Text style={styles.locationtxt}>
                {locationIcon} haldia
              </Text>
            </View>
            <Pressable onPress={() => handelLike(room._id)}>

              {like ? HeartFillIcon : HeartIcon}
            </Pressable>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.priceTxt}>
              {rupeeicon}{room.price}<Text style={styles.monthTxt}>/month</Text>
            </Text>

            <Text style={styles.roomtxt}> {bedIcon} {room.availableBeds}Beds</Text>
          </View>
          <Text style={{ fontWeight: 'bold', color: '#393939', fontSize: 20, marginLeft: 15 }}>
            Details
          </Text>

          <Text style={styles.detailsText}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </Text>
        </View>

        <Button
          title='Get The Direction'
          onPress={() => Linking.openURL("https://www.google.com/maps/dir/?api=1&destination=" + roomLocation)}
          color='#769'
        />

      </ScrollView>
    </View>
  )
}

export default RoomDetails

const styles = StyleSheet.create({
  cointainer: {
    backgroundColor: '#ffff',
    paddingTop: -10,
    padding: 10,
    height: "100%"
  },
  images: {
    width: screenWidth - 30,
    height: screenHeight / 2,
    margin: 5,
    borderRadius: 20,
    // backgroundColor: "red",


  },
  text: {
    fontSize: 20,
    fontFamily: "NotoSansRegular",
    color: '#212D31',
    marginLeft: 10
  },

  priceTxt: {
    fontSize: 20,
    margin: 10,
    padding: 5,
    fontFamily: 'NotoSansRegular',
    color: '#191917',

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
    justifyContent: 'space-between'
  },

  locationtxt: {
    fontFamily: 'NotoSansLight',
    fontSize: 15,
    color: '#c9c9c9',
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

  },

  detailsText: {
    marginHorizontal: 15
  }


})