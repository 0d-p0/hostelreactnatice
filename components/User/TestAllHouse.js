import {
  View, StyleSheet, Text, Dimensions,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Pressable
} from 'react-native'
import React, { useState } from 'react'

import { useSelector } from 'react-redux';


import { allRoom } from '../Hooks/allRoom';
import RoomDetailsCard from '../MiniComponent/RoomDetailsCard';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomMarker from './CustomMarker';
import Color from '../../Util/Color';
import HeaderComp from '../MiniComponent/HeaderComp';
import IconImage from '../MiniComponent/IconImage';
import { useEffect } from 'react';
import getAuthUser from '../Hooks/getAuthUser';
import getFirstRooms from '../Hooks/getFirstRooms';




const windowWidth = Dimensions.get('window').width;
const windowHight = Dimensions.get('window').height;


export default function TestAllHouse({ navigation, route }) {

  const { user } = getAuthUser()

  const { tempRooms } = getFirstRooms()

  const [pageNo, setPageNo] = useState(1)

  // const { user } = useSelector((state) => state.user)

  const [currentKey, setCurrentKey] = useState("All House")


  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("Boy");


  // get distance
  // const userCorrdinate = user?.college?.coordinate.split(',')




  const renderItem = ({ item }) => (
    <RoomDetailsCard props={item} navigation={navigation} />
  );

  const [multiSliderValue, setMultiSliderValue] = useState([100, 10000]);

  const [sliderValues, setSliderValues] = useState([100, 10000])

  const [bed, setBeds] = useState()

  const nextPage = () => {
    if (hasMore) {
      setPageNo(pageNo + 1)
    }
  }

  const { loading, rooms, setRooms, roomlength, hasMore, setHasMore } = allRoom(pageNo, multiSliderValue[0], multiSliderValue[1], bed, gender)



  const renderLoader = () => {
    return (
      <View style={{ marginBottom: 100 }}>
        <View>
          {loading && <ActivityIndicator size={"large"} color="blue" />}
        </View>

        {!hasMore && !loading &&
          <Text style={{ fontWeight: '900', fontSize: 18, textAlign: "center" }}>
            You are end of the result
          </Text>
        }

      </View>
    )
  }

  const renderEmpty = () => {
    return (
      <View>
        {!loading && <Text style={{ fontWeight: '900', fontSize: 18, textAlign: "center" }}> no House available </Text>}
      </View>
    )
  }

  // useEffect(() => {
  //   console.log("page number update")


  // }, [pageNo])

  const multiSliderValuesChange = values => {
    setMultiSliderValue(values)
    setRooms([])
    setPageNo(1)
  };

  const onValuesChange = value => setSliderValues(value)

  const choseGender = (value) => {
    setRooms([])
    setPageNo(1)
    setOpen(!open)
    setGender(value)
  }

  return (
    <View style={{ backgroundColor: 'white' }} >
      {/*......... render header component........... */}

      <HeaderComp navigation={navigation} route={route} />
      {/*......... render price filter ........... */}
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.pricefilter}> Price Filter </Text>

        <MultiSlider
          selectedStyle={{
            backgroundColor: 'red',
          }}
          unselectedStyle={{
            backgroundColor: 'silver',
          }}
          containerStyle={{
            height: 50,
            width: windowWidth,
            alignItems: 'center'
          }}
          trackStyle={{
            height: 7,
            borderRadius: 10
          }}
          customMarker={CustomMarker}
          values={[multiSliderValue[0], multiSliderValue[1]]}
          sliderLength={250}

          onValuesChange={onValuesChange}
          step={500}
          onValuesChangeFinish={multiSliderValuesChange}
          min={100}
          max={10000}
          minMarkerOverlapDistance={10}
        />

        <View style={{ display: 'flex', flexDirection: 'row', width: 300, justifyContent: 'space-between', top: -15 }}>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ top: 4 }}>
              <IconImage path={require('../../src/hostel/icon/black/rupee.png')} />
            </View>

            <Text>
              {sliderValues?.[0]}
            </Text>

          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ top: 4 }}>
              <IconImage path={require('../../src/hostel/icon/black/rupee.png')} />
            </View>
            <Text>
              {sliderValues?.[1]}
            </Text>
          </View>
        </View>

      </View>
      {/*......... render room filter ........... */}
      <View style={{ display: 'flex', flexDirection: "row", margin: 10 }}>

        <Pressable
          onPress={() => {
            setBeds()
            setRooms([])
            setPageNo(1)
          }}
        >
          <Text style={{ color: Color.black, fontWeight: '600', fontSize: 15, top: 5, borderBottomColor: Color.red, borderBottomWidth: (bed == null) ? 2 : 0 }}> Room shared </Text>
        </Pressable>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

          <Pressable>
            <Text style={{ ...styles.roomfilter, borderBottomColor: Color.red, borderBottomWidth: (bed == "private") ? 2 : 0 }}> Private </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setBeds(2)
              setRooms([])
              setPageNo(1)
            }}
          >
            <Text style={{ ...styles.roomfilter, borderBottomColor: Color.red, borderBottomWidth: (bed == 2) ? 2 : 0 }}> 2bed </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setBeds(3), setRooms([])
              setPageNo(1)
            }}
          >
            <Text style={{ ...styles.roomfilter, borderBottomColor: Color.red, borderBottomWidth: (bed == 3) ? 2 : 0 }} > 3bed </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setBeds(4), setRooms([])
              setPageNo(1)
            }}
          >
            <Text style={{ ...styles.roomfilter, borderBottomColor: Color.red, borderBottomWidth: (bed == 4) ? 2 : 0 }}> 4bed </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setBeds("4Plus"), setRooms([])
              setPageNo(1)
            }}>
            <Text style={{ ...styles.roomfilter, borderBottomColor: Color.red, borderBottomWidth: (bed == "4Plus") ? 2 : 0 }}> 4+ </Text>
          </Pressable>

        </ScrollView>

      </View>


      {/*......... render drop down........... */}
      <View>

        {!open && <View style={{ marginLeft: 10, alignItems: 'flex-start' }}>
          <Pressable
            onPress={() => setOpen(!open)}
            style={{ flexDirection: 'row', backgroundColor: "#D9D9D9", borderRadius: 8, padding: 5, }}>
            <Text >
              {gender} only {""}
            </Text>
            <View style={{ marginTop: 5 }}>
              <IconImage path={require('../../src/hostel/icon/black/arrowDown.png')} />
            </View>
          </Pressable>
        </View>}

        {open && <View style={{ marginLeft: 10, alignItems: 'flex-start', backgroundColor: "#D9D9D9", padding: 10, width: 80, borderRadius: 10 }}>
          <Pressable
            onPress={() => choseGender("Boy")}
          >
            <Text style={{ fontSize: 15, color: Color.black, fontWeight: '900' }}>
              Boy only
            </Text>
          </Pressable>

          <View style={{ borderWidth: 2, width: 60, marginTop: 5 }}>
          </View>
          <Pressable
            onPress={() => choseGender("Girl")}
            style={{ marginTop: 5 }} >
            <Text style={{ fontSize: 15, color: Color.black, fontWeight: '900' }}>
              Girl only
            </Text>
          </Pressable>

        </View>
        }
      </View>

      {/*......... render rooms length........... */}
      {<View style={{ alignItems: 'flex-end', marginRight: 20 }}>

        <Text style={{ fontWeight: "600", color: '#999999', fontSize: 12 }}> {roomlength} rooms  available</Text>
      </View>}

      {/*......... render rooms........... */}
      <View style={{ height: windowHight - 250 }}>

        {(roomlength == undefined) &&
          (
            <FlatList
              data={tempRooms}
              renderItem={renderItem}
              keyExtractor={(props) => props._id}
            />
          )
        }

        {rooms && (
          <FlatList
            data={rooms}
            renderItem={renderItem}
            keyExtractor={(props) => props._id}
            onEndReached={nextPage}
            ListFooterComponent={renderLoader}
            ListEmptyComponent={renderEmpty}
          />
        )}

      </View>


    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    // padding: 10,
    height: '100%',
    backgroundColor: '#fafafa',
    paddingEnd: 20,
  },

  pricefilter: {
    color: Color.black,
    fontWeight: 'bold',
    top: 2
  },

  roomfilter: {
    color: Color.black,
    fontSize: 18,
    fontWeight: '900'
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


