import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

import Ionicons from "react-native-vector-icons/Ionicons"


const MainHeader = ({name,logout,home,show}) => {
    return (
        <View style={styles.container}>
            <Ionicons name='arrow-back' size={30} color="black" onPress={home} />
            
            <Text style={styles.name}> {name} </Text>

        {show &&    <Button
                title='Logout'
                color="red"
                onPress={logout}
            />}

            
        </View>
    )
}

export default MainHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 60,
        width: '100%',
        padding:13,
        display:'flex',
        flexDirection:'row',
  justifyContent:'space-between'
       }
,

name:{
    fontWeight:"900",
    fontSize:25,
    fontFamily:'NotoSansMedium',
    color:'#191917'
}
})