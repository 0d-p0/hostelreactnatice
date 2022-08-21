import axios from "axios";
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  PermissionsAndroid,
} from 'react-native'
import { domain } from "../../Util/Address";
import setAuthUser from "../../components/Hooks/setAuthUser";
import getAuthUser from "../../components/Hooks/getAuthUser";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {


  try {
    dispatch({
      type: "LoadUserRequest",
    });

    // const { data } = await axios.get(domain + "api/v1/me")
    let data

    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    if (jsonValue != null) {
      // setUser(JSON.parse(jsonValue))
      // setLoading(false)
      console.log("runn in reducer")
      data = jsonValue
      console.log("get user 2")
    }



    dispatch({
      type: "LoadUserSuccess",
      payload: data,
    });


  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: "eror load user",
    });

  }
};

export const logoutUser = () => async (dispatch) => {

  try {
    dispatch({
      type: "LogoutUserRequest",
    });


    axios.get("http://localhost:4000/logout", { withCredentials: true });


    await AsyncStorage.removeItem('@storage_Key')
    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};


export const getuserhouse = () =>
  async (dispatch) => {
    try {
      dispatch({
        type: "userhouseRequest",
      });

      const { data } = await axios.get("http://localhost:4000/api/v1/userhouse", { withCredentials: true });

      dispatch({
        type: "userhouseSuccess",
        payload: data.house,
      });
    } catch (error) {
      dispatch({
        type: "userhouseFailure",
        payload: error.response.data.message,
      });
    }
  };


export const getAllHouses = () =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allHouseRequest",
      });

      let { data } = await axios({
        method: "Get",
        url: domain + "api/v1/allrooms",
        params: { page: 1, sprice: 100, lprice: 10000, genderType: "Boy" },


      });

      dispatch({
        type: "allHouseSuccess",
        payload: data.rooms
      });
    } catch (error) {
      dispatch({
        type: "allHouseFailure",
        payload: error.response.data.message,
      });
    }
  };


export const uploadImage = (photo) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "uploadimgRequest",
      });

      const { data } = await axios.post("http://192.168.0.9:4000/profile-upload-single", {
        photo
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }, { withCredentials: true })

      dispatch({
        type: "uploadimgSuccess",
        payload: data.house,
      });
    } catch (error) {
      dispatch({
        type: "uploadimgFailure",
        payload: error.response.data.message,
      });
    }
  }


export const loginWithGoogle = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.get("/api/v1/androidlogin");

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};



export const getLocation = () => async (dispatch) => {


  // const { data } = await axios.get("/api/v1/androidlogin");
  try {
    dispatch({
      type: "locationRequest",
    });
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //To Check, If Permission is granted
      Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          console.log('You are Here');

          //getting the Longitude from the location json
          const currentLongitude =
            JSON.stringify(position.coords.longitude);

          //getting the Latitude from the location json
          const currentLatitude =
            JSON.stringify(position.coords.latitude);
          console.log(position)
          //Setting Longitude state
          console.log(currentLongitude);
          //Setting Longitude state
          console.log(currentLatitude);

          dispatch({
            type: "loacationGettingSuccess",
            payload: [currentLatitude, currentLongitude],
            status: "You are Here"

          });
        },
        (error) => {
          console.log(error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 1000
        },
      );
    } else {
      console.log('Permission Denied');
      dispatch({
        type: "loacationGettingSuccess",
        status: "Permission Denied",
      });
    }
  } catch (err) {
    console.warn(err);
    dispatch({
      type: "loacationGettingFail",
      status: err,
    });
  }
}


export const valueChange = () => async (dispatch) => {
  dispatch({
    type: "ValueRequest"
  })
}


export const roomUpdate = () => async (dispatch) => {
  dispatch({
    type: "roomUpdate"
  })
}
