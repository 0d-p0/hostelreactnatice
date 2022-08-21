import { Pressable, StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComp from '../MiniComponent/HeaderComp'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

import { domain } from '../../Util/Address'
import IconImage from '../MiniComponent/IconImage'
import Color from '../../Util/Color'
import RoomDetailsCard from '../MiniComponent/RoomDetailsCard'

const { width, height } = Dimensions.get('window')

const WishList = ({ navigation, route }) => {
  const { c } = useSelector((state) => state.value)
  
  const [rooms, setRooms] = useState()


  const getWishListHouse = async () => {
    await axios.get(domain + 'api/v1/getuserwishlist').then((res) => {
      const result = res.data.rooms.map((props) => {
        const room = props.rooms.map((item) => {
          item.rhouse = props.rhouse
          item.owner = props.owner
          return item
        })
        return room
      })
      setRooms(result[0])

    }).catch(err => console.error(err))
  }

  useEffect(() => {
    getWishListHouse()
    console.log("runn")
  }, [c])

  const renderItem = ({ item }) => (
    <RoomDetailsCard props={item} navigation={navigation} />
  );

  const priceSortByHigh = () => {
    const price = rooms.sort((a, b) => { return a.price - b.price })
    console.log(price)
    setRooms(price)
  }

  const priceSortByLow = () => {
    const price = rooms.sort((a, b) => { return b.price - a.price })
    console.log(price)

    setRooms(price)
  }


  return (
    <View style={{ backgroundColor: 'white', height: height }}>
      <HeaderComp navigation={navigation} route={route} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

        <View style={{ flexDirection: 'row', top: 5 }}>
          <IconImage
            path={require('../../src/hostel/icon/black/trend.png')}
            width={20}
            height={20}
          />

          <Text style={{ fontSize: 15, color: Color.black, fontWeight: '900' }}>
            WishList
          </Text>

        </View>

        {/* <Pressable
          onPress={() => getWishListHouse(true)}
          style={{ flexDirection: 'row', borderWidth: 1, borderColor: Color.grey, borderRadius: 4, backgroundColor: "white", padding: 5 }}>
          <IconImage
            path={require('../../src/hostel/icon/black/tag.png')}
            width={15}
            height={25}
          />

          <Text style={{ fontSize: 15, color: Color.black, fontWeight: '900' }}>
            {''} High to Low
          </Text>

        </Pressable>

        <Pressable
          onPress={() => getWishListHouse(false)}
          style={{ flexDirection: 'row', borderWidth: 1, borderColor: Color.grey, borderRadius: 4, padding: 5, backgroundColor: "white" }}>
          <IconImage
            path={require('../../src/hostel/icon/black/tag.png')}
            width={15}
            height={25}
          />

          <Text style={{ fontSize: 15, color: Color.black, fontWeight: '900' }}>
            {''} Low to High
          </Text>

        </Pressable> */}

      </View>

   { rooms &&  <View style={{ height: height - 100 }}>
        {rooms && (
          <FlatList
            data={rooms}
            renderItem={renderItem}
            keyExtractor={(props) => props._id}
          />
        )}

      </View>}

      <Pressable 
       onPress={()=>navigation.navigate('Home')}
       >
        {!rooms&& (
          <IconImage
            path={require('../../src/assets/gifs/wishlist.gif')}
            height={400}
            width={350}
          />
        )}

      </Pressable>

      


    </View>
  )
}

export default WishList

const styles = StyleSheet.create({})