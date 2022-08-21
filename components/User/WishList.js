import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Pressable, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDistance } from 'geolib';


import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { domain } from '../../Util/Address';
import axios from 'axios';
import { loadUser } from '../../redux/Actions/userActions';

const locationIcon = <Octicons name='location' size={15} color='#c9c9c9' />
const bedIcon = <Ionicons name='bed-outline' size={15} color='#212D31' />
const rupeeicon = <FontAwesome name='rupee' size={20} color='#212D31' />
const FilterIcon = <Ionicons name='filter-sharp' size={30} color='black' />
const DistanceIcon = <MaterialCommunityIcons name='map-marker-distance' size={15} color='#212D31' />

const HeartFillIcon = <Ionicons name='heart' size={40} color="red" />
const HeartIcon = <Ionicons name='heart-outline' size={40} color="white" />

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WishList = ({ navigation }) => {
  const dispatch = useDispatch()
  let { allhouse, loading } = useSelector((state) => state.allhouse)
  const { user } = useSelector((state) => state.user)
   const {c}=useSelector((state)=>state.value)

  const [rooms, SetRooms] = useState()
  const [like, setLike] = useState(false)


  const allroom2 = async () => {
    let data = [];
    await axios.get(domain + "api/v1/allhouse", { withCredentials: true }).then(res => {
      res.data.house.forEach(element => {
        element.rooms.forEach(room => {
          if (user?.wishList.includes(room._id)) {
            room.name = element.name + "(" + room.name + ")"
            room.photos.unshift({ url: element.pictures[0].url })
            room.coordinate = element.loc

            data.push(room)
          }
        })
      });
    }).catch(err => console.error(err))

    return data

  }

  useEffect(() => {
    allroom2().then(res => {
      SetRooms(res)
    })
  }, [user,c])

  // useEffect(() => {
  //   dispatch(loadUser())
  // }, [])
  // get distance
  const userCorrdinate = user?.college?.coordinate.split(',')

  const distanceHandle = (houseLat, houselong) => {
    const distance = getDistance(
      { latitude: houseLat, longitude: houselong },
      { latitude: userCorrdinate[0], longitude: userCorrdinate[1] }
    );

    return distance
  }

  const handelLike = async (id) => {
    axios.get(domain + "api/v1/addwhishlist/" + id, { withCredentials: true }).then(res => {
      console.log(res.data)
      dispatch(loadUser())
      setLike(!like)
    }).catch(err => { console.log(err) })

  }

  const userlikecheck = (id) => {
    const result = user?.wishList.includes(id)
    return result
  }

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.container}>
          {
            rooms && rooms.map((props => (
              <Pressable key={props._id} style={styles.card} onPress={() => navigation.navigate('RoomDetails', {
                room: props
              })}>

                {(props.photos != undefined) &&
                  <ImageBackground
                    style={styles.image}
                    source={{
                      uri: props?.photos?.[1].url
                    }}
                    resizeMode='cover'

                  >
                    {/* price text */}
                    <Text style={styles.priceTxt}>
                      {rupeeicon}{props.price}<Text style={styles.monthTxt}>/Month</Text>
                    </Text>

                    <Pressable
                      onPress={() => handelLike(props._id)}
                      style={{ position: 'absolute', right: 2, top: 10 }}>

                      {userlikecheck(props._id) ? HeartFillIcon : HeartIcon}
                    </Pressable>

                  </ImageBackground>}



                <View style={styles.textContainer}>
                  <View style={{ flex: 0.9 }}>
                    <Text style={styles.text} ellipsizeMode="clip" numberOfLines={1}>
                      ({props.name})
                    </Text>
                    {user.userType == "student" ?
                      <Text style={styles.locationtxt}>
                        {DistanceIcon} {distanceHandle(props?.coordinate?.coordinates?.[0], props?.coordinate?.coordinates?.[1])} Meater from college
                      </Text> :
                      <Text style={{ ...styles.locationtxt, color: "grey" }}>
                        {locationIcon} Haldia
                      </Text>}

                  </View>
                  <Text style={styles.roomtxt}> {bedIcon} {props.totalBeds}Beds</Text>
                </View>
              </Pressable>
            )))
          }

        </View>

        <View style={{ height: 100 }}>

        </View>
      </ScrollView>
    </View>
  )
}

export default WishList

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
    height: (windowWidth / (2 / 1)),
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
  containerfilter: {
    display: 'flex',
    flexDirection: 'row'
  },
  filterText: {
    fontSize: 25,
    paddingLeft: 10,
    marginRight: 10
  },

  filterValue: {

    padding: 10,
    margin: 5,
    backgroundColor: "#ffff",
    borderRadius: 10,
    shadowColor: "gray",
    elevation: 5,
    marginRight: 5
  },
  activeFilterValues: {
    padding: 10,
    margin: 5,
    backgroundColor: "#138911",
    color: "white",
    borderRadius: 10,
    shadowColor: "gray",
    elevation: 5,
    marginRight: 5
  }
});
