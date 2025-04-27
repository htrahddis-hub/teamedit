import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFile,
  updateFile
} from "../actions/file";
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { RootState } from "../store";
import { Delta } from "quill/core";


export interface IAuthor {
  email: string;
  id: number,
  firstname: string,
  lastname: string
}

export interface IFile {
  content: string;
  name: string;
  updatedAt: string;
  createdAt: string;
  id: number;
  author?: IAuthor[]
}

export interface IStateF {
  value: IFile,
  message: string
}
const date = new Date();

const initialState: IStateF = {
  value: {
    content: '{}',
    name: "",
    updatedAt: date.toISOString(),
    createdAt: date.toISOString(),
    id: 0,
    author: []
  },
  message: ""
}

const fileSlice = createSlice({
  name: "fileList",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IStateF>) => {
    builder.addCase(fetchFile.fulfilled, (state, action) => {
      state.value = action.payload.value;
    });
    builder.addCase(updateFile.fulfilled, (state, action) => {
      if (action.payload.message === 'successful')
        var prev= JSON.parse(state.value.content);
        var change = JSON.parse(action.payload.content);
        const prevDelta = new Delta(prev);
        const changeDelta = new Delta(change);
        state.value = {...state.value,content:JSON.stringify(prevDelta.compose(changeDelta))};
    });
  },
});

// export const { fetch } = fileSlice.actions;

export const getFile = (state: RootState) => state.file.value;

export default fileSlice.reducer;