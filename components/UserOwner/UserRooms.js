import { StyleSheet, Text, View, ImageBackground, Dimensions,Pressable } from 'react-native'
import React from 'react'
import IconImage from '../MiniComponent/IconImage'

const width = Dimensions.get('window').width

const UserRooms = ({index,photoUrl,navigation,room,setOption}) => {
  return (
    <View
       key={index}
     style={{ height: 140, width: (width / 2) - 15, marginBottom: 10 }}>
      <ImageBackground
        imageStyle={styles.roomImage}
        source={{ uri:photoUrl }}
      >

        <View style={{alignItems:'flex-end',padding:8}} >
          <Pressable 
           onPress={()=>navigation.navigate("updateRoom",{
            room
           })}
          style={{backgroundColor:"white",padding:6,borderRadius:50}}>
            <IconImage
              path={require('../../src/hostel/icon/pencil.png')}
            />
          </Pressable>
        </View>


      </ImageBackground>

    </View>
  )
}

export default UserRooms

const styles = StyleSheet.create({
  roomImage: {
    width: (width / 2) - 15,
    height: 140,
    borderRadius: 10,

  }
})