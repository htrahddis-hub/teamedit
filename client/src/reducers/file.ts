import { createSlice } from "@reduxjs/toolkit";
import {
  fetch,
} from "../actions/file";
import { IUser } from "../pages/login";
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { RootState } from "../store";


export interface IFile {
  content: string;
  name: string;
  authors: string;
}

export interface IState {
  value: IFile[]
}

const initialState: IState = {
  value: []
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IState>) => {
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.value.push(action.payload);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(authorize.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    // builder.addCase(resetPassword.fulfilled, (state, action) => {
    //   state.value = action.payload;
    // });
    // builder.addCase(forgotPassword.fulfilled, (state, action) => {
    //   state.value = action.payload;
    // });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

// export const { Authorize, Login, Logout, Signup } = userSlice.actions;

export const getUser = (state: RootState) => state.user.value;

export default userSlice.reducer;