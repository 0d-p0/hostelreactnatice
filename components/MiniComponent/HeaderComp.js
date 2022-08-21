import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../../Util/Color'
import IconImage from './IconImage'
import getAuthUser from '../Hooks/getAuthUser'

const HeaderComp = ({ navigation,route }) => {
    let routeName=route?.name
    const {user}=getAuthUser()
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ backgroundColor: Color.red, color: "white", fontSize: 15, padding: 3, fontFamily: "NotoSansMedium", marginRight: 5 }}>
                    HOSTEL TOSTEL
                </Text>
                <IconImage path={require('../../src/hostel/icon/black/ring.png')} width={20} height={25} />
            </View>

     {  (user?.userType == 'student')    &&
      <View style={{ display: 'flex', flexDirection: 'row' }}>


                <Pressable
                    onPress={() => navigation.navigate('Home')}
                    style={{borderBottomWidth:(routeName == 'Home')?2:0,borderBottomColor:"#0066FF"}}
                >
                    <IconImage path={require('../../src/hostel/icon/black/feed.png')} width={30} height={25} />
                </Pressable>
                <Text>
                    {"   "}
                </Text>

                <Pressable
                onPress={() => navigation.navigate('WishList')}
                    style={{borderBottomWidth:(routeName == 'WishList')?2:0,borderBottomColor:"#0066FF"}}
                >
                    <IconImage path={require('../../src/hostel/icon/black/love.png')} width={25} height={25} />
                </Pressable>

                <Text>
                    {"   "}
                </Text>

                <Pressable
                    onPress={() => navigation.navigate('userProfile')}
                    style={{borderBottomWidth:(routeName == 'userProfile')?2:0,borderBottomColor:"#0066FF"}}
                >
                    <IconImage path={require('../../src/hostel/icon/black/profile.png')} width={25} height={25} />
                </Pressable>

            </View>
}
        </View>
    )
}

export default HeaderComp

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    }

})