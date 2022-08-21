/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Children, useEffect, useState } from 'react';
 import {
   View, Text,
   StyleSheet,
   Image
 } from 'react-native';
 
 
 import { NavigationContainer } from '@react-navigation/native';
 import { useDispatch, useSelector } from 'react-redux';
 
 
 import { getAllHouses, loadUser, valueChange } from './redux/Actions/userActions'
 
 
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import {
   GoogleSignin,
 } from '@react-native-google-signin/google-signin';
 
 
 import Home from './components/Home'
 import Bottom from './components/Navigation/Bottom'
 
 
 import NetInfo from "@react-native-community/netinfo";
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import StudentDetails from './components/BoardingScreen/StudentDetails';
 import WhoYouAre from './components/BoardingScreen/WhoYouAre';
 import UserHouse from './components/User/UserHouse';
 import UpdateHouse from './components/User/UpdateHouse';
 import RoomDetails from './components/RoomDetails';
 import TestAllHouse from './components/User/TestAllHouse';
 import UserRoomDetails from './components/UserOwner/UserRoomDetails';
 import RoomDetailsAndUpdate from './components/UserOwner/RoomDetailsAndUpdate';
 import HomeRules from './components/UserOwner/HomeRules';
 import UserRooms from './components/UserOwner/UserRooms';
 import LogInScreen from './components/BoardingScreen/LogInScreen';
 import getAuthUser from './components/Hooks/getAuthUser';
 import UserProfile from './components/NormalUser/UserProfile';
 import axios from 'axios';
 import { domain } from './Util/Address';
 import WishList from './components/NormalUser/WishList';
 import { allHouse } from './redux/Reducers/userReducers';
 
 
 
 
 
 const App = () => {
   const Stack = createNativeStackNavigator();
 
   const [usertype, setUserType] = useState("")
 
   // const loading = false
   const { c } = useSelector((state) => state.value)
 
   const { allhouse } = useSelector((state) => state.allhouse)
 
 
   // render in every connection state change
   useEffect(() => {
     const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
       const offline = !(state.isConnected && state.isInternetReachable);
       setOfflineStatus(offline ? "offline" : "online");
     });
     return () => removeNetInfoSubscription()
 
   }, []);
 
   const dispatch = useDispatch()
   // const { isAuthenticated, loading, user, error } = useSelector((state) => state.user);
 
   const { user, loading } = getAuthUser()
 
 
   const [isOffline, setOfflineStatus] = useState("none");
 
   //Load user
 
 
 
   useEffect(() => {
     // load user only if the internet is on
 
     // if (isOffline === "online") {
     //   try {
     //     dispatch(loadUser())
     //     //dispatch(getAllHouses)
     //   } catch (error) {
 
     //   }
     // }
 
     const checkUser = async () => {
       await axios.get(domain + "api/v1/me").catch((err) => {
         if (err.message == "Request failed with status code 401") {
           GoogleSignin.signOut();
           AsyncStorage.removeItem('@storage_Key')
           dispatch(valueChange())
         }
       })
     }
 
     if (user) {
       checkUser()
 
     }
 
   }, [isOffline]) /// render every time when [isOfline] value change
 
 
   const firstGetAllHouse = async () => {
     await axios({
       method: "Get",
       url: domain + "api/v1/allrooms",
       params: { page: 1, sprice: 100, lprice: 10000, genderType: "Boy" },
     }).then((res) => {
       AsyncStorage.setItem('@rooms_key', JSON.stringify(res.data.rooms))
     }).catch((err) => console.error(err))
 
   }
 
   useEffect(() => {
     dispatch(getAllHouses())
     firstGetAllHouse()
   }, [])
 
 
 
   // render ofline view
   if (isOffline === "offline") {
     return (
       <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
         <Image
           style={{ width: "100%", height: "100%", flex: 0.7 }}
           source={require("./src/assets/gifs/offline.gif")}
           resizeMode="contain"
         />
         <Text style={{ borderColor: "grey", borderWidth: 1, borderRadius: 8, width: "95%", textAlign: 'center', fontWeight: 'bold', color: "black", margin: 10, fontSize: 20 }}>
           Try again later </Text>
       </View>
     )
   }
 
   // render Loading View
   if (loading) {
     return (
       <View style={{ alignItems: 'center', backgroundColor: "#FFFFFF" }} >
         <Image
           style={{ width: "100%", height: "100%" }}
           source={require("./src/assets/gifs/loadingFiles.gif")}
           resizeMode="contain"
         />
 
       </View>
     )
   }
 
 
   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName='MainHome'>
         <Stack.Screen
           name="MainHome"
           component={!user ? LogInScreen : Bottom}
           options={{ headerShown: false }}
         />
         <Stack.Screen options={{ headerShown: false }} name='demo' component={WhoYouAre} />
 
         <Stack.Screen options={{ headerShown: false }} name='studentDetails' component={StudentDetails} />
         <Stack.Screen
           options={{ headerShown: false }}
           name="RoomDetails" component={RoomDetails} />
 
         <Stack.Screen name='UserHouse' component={UserHouse} />
         <Stack.Screen name='UpdateHouse' component={UpdateHouse} />
 
         <Stack.Screen name='updateRoom' component={RoomDetailsAndUpdate} />
 
 
         <Stack.Screen
           options={{ headerShown: false }}
           name='userProfile' component={UserProfile} />
 
         <Stack.Screen
           options={{ headerShown: false }}
           name='WishList' component={WishList} />
 
 
 
       </Stack.Navigator>
     </NavigationContainer>
 
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 
 export default App;
 