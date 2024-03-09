import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  userData: undefined,
  isBusiness: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.userData = action.payload;
      state.isBusiness = action.payload.isBusiness || false;
      state.isAdmin = action.payload.isAdmin || false;
    },
    logout(state) {
      state.loggedIn = false;
      state.isBusiness = false;
      state.isAdmin = false;
      state.userData = undefined;
    },
    updateUserProfile(state, action) {
      const updatedUserProfile = {
        ...state.userData,
        ...action.payload,
      };
      if (action.payload.name) {
        updatedUserProfile.name = action.payload.name;
      }
      if (action.payload.email) {
        updatedUserProfile.email = action.payload.email;
      }
      if (action.payload.phone) {
        updatedUserProfile.phone = action.payload.phone;
      }
      state.userData = updatedUserProfile;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
