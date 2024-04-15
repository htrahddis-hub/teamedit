import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  login,
  authorize,
  logout,
} from "../actions/user";
import { IUser } from "../pages/login";
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { RootState } from "../store";


export interface IAuthenication {
  auth: boolean,
  isSignedin: boolean,
  email: string,
  message?: string
}


const initialState: IAuthenication = {
  auth: false,
  isSignedin: false,
  email: "",

}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IAuthenication>) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(authorize.fulfilled, (state, action) => {
      state = action.payload;
    });
    // builder.addCase(resetPassword.fulfilled, (state, action) => {
    //   state.value = action.payload;
    // });
    // builder.addCase(forgotPassword.fulfilled, (state, action) => {
    //   state.value = action.payload;
    // });
    builder.addCase(logout.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

// export const { Authorize, Login, Logout, Signup } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;