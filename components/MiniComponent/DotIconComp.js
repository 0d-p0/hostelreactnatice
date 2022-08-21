import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import Octicons from 'react-native-vector-icons/Octicons';


const DotIcon = ({ color }) => { return (<Octicons name='dot-fill' color={color} size={20} />) }

const DotIconComp = ({room,index2}) => {
  return (
    <View style={{
        display: 'flex', flexDirection: 'row', backgroundColor: "#111111",
        borderRadius: 8, opacity: 0.8, paddingHorizontal: 5
    }}>
        {room.photos.map((prop, dex) => (
            <View key={dex} >
                <Text style={{ color: (index2 == dex) ? "white" : "green", }}> <DotIcon color={(index2 == dex) ? "white" : "grey"} /> </Text>
            </View>

        ))}
    </View>
  )
}

export default DotIconComp

const styles = StyleSheet.create({})