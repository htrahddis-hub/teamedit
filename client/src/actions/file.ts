import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IStateF } from "../reducers/file";
import { Delta } from "quill/core";

export interface IAction {
  content: string;
  message: string;
}

const url = import.meta.env.VITE_URL;

export const fetchFile = createAsyncThunk("file/create", async (fileId: number): Promise<IStateF> => {
  try {
    const token = decodeURIComponent(document.cookie);
    const token1 = token.substring(6);
    const { data } = await axios.get(`${url}fetchfilebyid/${fileId}`, { headers: { 'authorization': `Bearer ${token1}` } });

    if (data.message === "successful")
      return { value: data.value, message: "successful" };
    else if (data.message === "Failed")
      return {
        value: {
          content: '',
          name: '',
          updatedAt: '',
          createdAt: '',
          id: 0,
        }, message: "Failed to fetch"
      };
    else
      return {
        value: {
          content: '',
          name: '',
          updatedAt: '',
          createdAt: '',
          id: 0,
        }, message: "Failed to fetch"
      };
  } catch (err) {
    console.log(err);
    return {
      value: {
        content: '',
        name: '',
        updatedAt: '',
        createdAt: '',
        id: 0,
      }, message: "Failed to fetch"
    };
  }
});

export const updateFile = createAsyncThunk("file/update", async (content: string): Promise<IAction> => {
  try {
    return { content: content, message: 'successful' }
  } catch (err) {
    return { content: '{}', message: 'failed' };
  }
});
