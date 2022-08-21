import {
  View, StyleSheet, ScrollView, Text, ImageBackground, Pressable, Button,
  Dimensions
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Home/Header';

import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import { getAllHouses, loadUser } from '../redux/Actions/userActions';

import { getDistance } from 'geolib';

import Seach from '../Test/Seach';
import axios from 'axios';
import { domain } from '../Util/Address';

const locationIcon = <Octicons name='location' size={15} color='#c9c9c9' />
const bedIcon = <Ionicons name='bed-outline' size={15} color='#212D31' />
const rupeeicon = <FontAwesome name='rupee' size={20} color='#212D31' />
const FilterIcon = <Ionicons name='filter-sharp' size={30} color='black' />
const DistanceIcon = <MaterialCommunityIcons name='map-marker-distance' size={15} color='#212D31' />




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Allhouse({ navigation }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllHouses())
  }, [])


  const { allhouse, loading } = useSelector((state) => state.allhouse)
  const { user } = useSelector((state) => state.user)


  const [data, setData] = useState()

  const filterValues = {
    "allroom": {
      start: 0,
      end: 9999,
      name: "All House"
    },

    "below500": {
      start: 0,
      end: 499,
      name: "Below 500"
    },

    "500to1000": {
      start: 500,
      end: 1000,
      name: "500 To 1000"
    },

    "1000to1500": {
      start: 1000,
      end: 1500,
      name: "1000 To 1500"
    },


    "1000to2000": {
      start: 1000,
      end: 2000,
      name: "1000 To 2000"
    },

    "2000to2500": {
      start: 2000,
      end: 2500,
      name: "2000 To 2500"
    },

    "2000to3000": {
      start: 2000,
      end: 3000,
      name: "2000 To 3000"
    },

    "3000to4000": {
      start: 3000,
      end: 4000,
      name: "3000 To 4000"
    },

    "Above4000": {
      start: 4000,
      end: 99999,
      name: "Above 4000"
    }

  }
  const [currentKey, setCurrentKey] = useState("All House")



  const allroom2 = async () => {
    let data = [];
    await axios.get(domain + "api/v1/allhouse", { withCredentials: true }).then(res => {
      res.data.house.forEach(element => {
        element.rooms.forEach(room => {
          room.name = element.name + "(" + room.name + ")"
          room.photos.unshift({ url: element.pictures[0].url })
          room.coordinate = element.loc

          data.push(room)
        })
      });
    }).catch(err => console.error(err))

    return data

  }

  useEffect(() => {
    allroom2().then(res => {
      setData(res)
    })
  }, [user])



  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }


  // price sort
  const price = (pricOne, priceTwo, currentKey) => {

    try {
      allroom2().then(res => {
        const ress = res.filter(item => item.price <= pricOne && item.price >= priceTwo)
        setData(ress)

      })
    } catch (error) {
      console.log(error.message)
    }


    setCurrentKey(currentKey)

  }




  // working
  const lowToHigh = (data) => {
    const result = data.sort((a, b) => a.price - b.price)
    setData(result)

  }

  // get distance
  const userCorrdinate = user?.college?.coordinate.split(',')

  const distanceHandle = (houseLat, houselong) => {
    const distance = getDistance(
      { latitude: houseLat, longitude: houselong },
      { latitude: userCorrdinate[0], longitude: userCorrdinate[1] }
    );

    return distance
  }





  // console.log(userCorrdinate[0])
  return (
    <View style={styles.container}>

      {/* <Button
        title='okk'
        onPress={lowToHigh}
      /> */}

    

      {/* header */}
      <Header name={user.name} profilephoto={user.avatar} />


      {/* ...............house filter................. */}
      <View style={styles.containerfilter}>

        <Text style={styles.filterText}>{FilterIcon}</Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Object.keys(filterValues).map((key, props) => (

            <Pressable onPress={() => price(filterValues[key].end, filterValues[key].start, filterValues[key].name)}
              key={key} style={(currentKey === filterValues[key].name) ? styles.activeFilterValues : styles.filterValue}>

              <Text style={{ fontSize: 15, fontWeight: '900', color: (currentKey === filterValues[key].name) ? "white" : "#111111" }} > {filterValues[key].name} </Text>
            </Pressable>
          ))}
        </ScrollView>

      </View>

      <ScrollView showsVerticalScrollIndicator={false} >
        <View >
          {
            data && data.map((props => (
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



                  </ImageBackground>
                }



                <View style={styles.textContainer}>
                  <View style={{ flex: 0.9 }}>
                    <Text style={styles.text} ellipsizeMode="clip" numberOfLines={1}>
                      ({props.name})
                    </Text>
                    {user.userType == "student" ?
                      <Text style={styles.locationtxt}>
                        {DistanceIcon} {distanceHandle(props?.coordinate?.coordinates?.[0], props?.coordinate?.coordinates?.[1])} Meater from
                        {" " + user.college.name}
                      </Text> :
                      <Text style={{ ...styles.locationtxt, color: "grey" }}>
                        {locationIcon} Haldia
                      </Text>}

                  </View>
                  <Text style={styles.roomtxt}> {bedIcon}  {props.availableBeds}Beds</Text>
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


// ................... backup................

/// scrorll view houselist

{/* <ScrollView showsVerticalScrollIndicator={false} >
<View style={styles.card}>
  <ImageBackground
    style={styles.image}
    source={{
      uri: "https://psgroup.in/blog/wp-content/uploads/2020/11/AURUS_AMP-banner-image-1.jpg"
    }}
    resizeMode='cover'
  >

    <Text style={styles.priceTxt}>
      {rupeeicon}1000<Text style={styles.monthTxt}>/Month</Text>
    </Text>
  </ImageBackground>



  <View style={styles.textContainer}>
    <View>
      <Text style={styles.text}>
        House name
      </Text>
      <Text style={styles.locationtxt}>
        {locationIcon} kakdwip
      </Text>

    </View>
    <Text style={styles.roomtxt}> {bedIcon} 5Beds</Text>
  </View>
</View>

<View style={styles.card}>
  <ImageBackground
    style={styles.image}
    source={{
      uri: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }}
    resizeMode='cover'
  >

    <Text style={styles.priceTxt}>
      {rupeeicon}1000<Text style={styles.monthTxt}>/Month</Text>
    </Text>
  </ImageBackground>



  <View style={styles.textContainer}>
    <View>
      <Text style={styles.text}>
        House name
      </Text>
      <Text style={styles.locationtxt}>
        {locationIcon} kakdwip
      </Text>

    </View>
    <Text style={styles.roomtxt}> {bedIcon} 5Beds</Text>
  </View>
</View>

<View style={styles.card}>
  <ImageBackground
    style={styles.image}
    source={{
      uri: "https://media-cdn.tripadvisor.com/media/photo-s/18/1c/39/9a/oyo-11731-sterling-guest.jpg"
    }}
    resizeMode='cover'
  >

    <Text style={styles.priceTxt}>
      {rupeeicon}1000<Text style={styles.monthTxt}>/Month</Text>
    </Text>
  </ImageBackground>



  <View style={styles.textContainer}>
    <View>
      <Text style={styles.text}>
        House name
      </Text>
      <Text style={styles.locationtxt}>
        {locationIcon} kakdwip
      </Text>

    </View>
    <Text style={styles.roomtxt}> {bedIcon} 5Beds</Text>
  </View>
</View>

<View style={{ height: 100 }}>

</View>

</ScrollView> */}



///,,,,,,,,,,,,,,,,,,,,,,,,,,,,,


