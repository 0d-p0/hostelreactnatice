import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },



  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogoutUserRequest: (state) => {
    state.loading = true;
  },
  LogoutUserSuccess: (state) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  LogoutUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },

  //   clearErrors: (state) => {
  //     state.error = null;
  //   },
});


export const usersHouse = createReducer(initialState, {
  userhouseRequest: (state) => {
    state.loading = true;
  },
  userhouseSuccess: (state, action) => {
    state.loading = false;
    state.house = action.payload;
  },
  userhouseFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

});


export const allHouse = createReducer(initialState, {
  allHouseRequest: (state) => {
    state.loading = true;
  },
  allHouseSuccess: (state, action) => {
    state.loading = false;
    state.allhouse = action.payload;
  },
  allHouseFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

});

export const valuechange = createReducer({ c: 1, ru: 1 }, {

  ValueRequest: (state) => {
    state.c += 1
  },

  roomUpdate: (state) => {
    state.ru += 1
  }
})


export const uploadImage = createReducer(initialState, {
  uploadimgRequest: (state) => {
    state.loading = true;
  },
  uploadimgSuccess: (state, action) => {
    state.loading = false;
    state.uploadimg = action.payload;
  },
  uploadimgFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
})

export const getLocaion = createReducer(initialState, {
  locationRequest: (state) => {
    state.loading = true;
  },

  loacationGettingSuccess: (state, action) => {
    state.loading = false;
    state.location = action.payload;
    state.status = action.status
  },
  loacationGettingFail: (state, action) => {
    state.loading = false;
    state.location = action.payload;
    state.status = action.status
  }
})