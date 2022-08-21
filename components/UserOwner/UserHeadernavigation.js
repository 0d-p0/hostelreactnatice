import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../../Util/Color'
import IconImage from '../MiniComponent/IconImage'

const UserHeadernavigation = ({navigation}) => {
    return (
        <View style={{padding:10,backgroundColor:"white"}}>
            <View style={{flexDirection:'row',justifyContent:'space-between' }}>

            <Pressable 
             onPress={()=>navigation.navigate("Home")}
            >
                {/* <Text  style={{ backgroundColor: Color.black, color: "white", fontSize: 15, padding: 3, fontFamily: "NotoSansMedium", marginRight: 5,borderRadius:4 }}>  </Text> */}

                <IconImage
                    path={require('../../src/hostel/icon/black/left.png')}
                    height={30}
                    width={30}
                />
            </Pressable>

                <Text style={{ backgroundColor: Color.red, color: "white", fontSize: 15, padding: 3, fontFamily: "NotoSansMedium", }}>
                    HOSTEL TOSTEL
                </Text>
            </View>
        </View>
    )
}

export default UserHeadernavigation

const styles = StyleSheet.create({})