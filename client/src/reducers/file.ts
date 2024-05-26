import { createSlice } from "@reduxjs/toolkit";
import {
  IResponse,
  fetch
} from "../actions/file";
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { RootState } from "../store";


export interface IFile {
  content: string;
  name: string;
  updatedAt:Date;
  id:number;
}

export interface IStateF{
  value: IResponse
}

const initialState :IStateF={
  value:{
    data:[],
    isFetched:false,
    message:""
  }
}

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IStateF>) => {
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.value = action.payload;
    });

  },
});

// export const { fetch } = fileSlice.actions;

export const getFiles = (state: RootState) => state.files.value;

export default fileSlice.reducer;