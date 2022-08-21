import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Allhouse from '../Allhouse';
import Profile from '../Profile';
import AddHouse from '../AddHouse';
import Login from '../Home'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Seach from '../../Test/Seach';
import { useSelector } from 'react-redux';
import WishList from '../User/WishList';
import TestAllHouse from '../User/TestAllHouse';

import RoomDetailsCard from '../MiniComponent/RoomDetailsCard';
import Color from '../../Util/Color';
import UserRoomDetails from '../UserOwner/UserRoomDetails';
import AddNewRoom from '../AddNewRoom';
import getAuthUser from '../Hooks/getAuthUser';

const Tab = createBottomTabNavigator();



const HomeFill = ({ color, size }) => { return (<Icon name="home" size={size} color={color} />) }
    ;
const Home = ({ color, size }) => { return (<Icon name="home-outline" size={size} color={color} />) };
const AddIcon = ({ color, size }) => { return (<Icon name="plus" size={size} color={color} />) };
const ProfileIcon = ({ color, size }) => { return (<FontAwesome name="user-o" size={size} color={color} />) };
const ProfileFillIcon = ({ color, size }) => { return (<FontAwesome name="user" size={size} color={color} />) };

const Bookmark = ({ color, size }) => {
    return (<FontAwesome name="bookmark"
        size={size} color={color} />)
};


const Bottom = () => {



    const { user } = getAuthUser()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                headerShown: false,

                tabBarStyle: {
                    display: (user?.userType == 'student') ? 'none' : (route.name != "Home") ?

                        'none' : 'flex',

                    ...styles.tabBarStyle
                },
                tabBarInactiveTintColor: "#b5b5b5",
                tabBarActiveTintColor: "#ffff"
            })
            }

        // initialRouteName="WishList"


        >
            <Tab.Screen name="Home" component={TestAllHouse}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? <View style={styles.activeButton}>
                            <HomeFill color={color} size={40} />
                        </View> :
                            <HomeFill color={color} size={40} />
                    ),
                    headerShown: false

                }}
            />

           <Tab.Screen name="NewHome" component={AddNewRoom}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={{ backgroundColor: "#e61e12", borderRadius: 50, elevation: 25, shadowColor: "gray" }}>
                            <AddIcon color={"#fff"} size={50} />
                        </View>
                    ),
                }}
            /> 




            <Tab.Screen name="Profile" component={UserRoomDetails}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? <View style={styles.activeButton}>
                            <ProfileFillIcon color={color} size={40} />
                        </View> :
                            <ProfileFillIcon color={color} size={40} />
                    ),


                }} />
        </Tab.Navigator >
    )
}

export default Bottom

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        // backgroundColor: "#0",

        bottom: 5,
        left: 15,
        right: 15,
        borderRadius: 20,
        shadowColor: "ocean",
        elevation: 5,
        height: 60,
    },
    activeButton: {
        backgroundColor: "#000000",
        borderRadius: 50,
        padding: 5,
        height: 50,
        width: 50,
        alignItems: 'center'
    }
})