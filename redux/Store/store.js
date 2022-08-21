import {configureStore}  from '@reduxjs/toolkit' 
import { allHouse, getLocaion, uploadImage, userReducer, usersHouse, valuechange } from '../Reducers/userReducers'


export  const store = configureStore({
    reducer:{user:userReducer,
             house:usersHouse,
             allhouse:allHouse,
             uploadImg:uploadImage,
             location:getLocaion,
             value:valuechange 
    }
})