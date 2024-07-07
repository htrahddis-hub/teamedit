import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Interface } from "readline";
import { IFile } from "../reducers/file";
const url = "https://teamedit.onrender.com/auth/";
// const url = "http://localhost:3000/auth/";

export interface IResponse {
  data: IFile[];
  isFetched: boolean;
  message: string;
}


export const fetch = createAsyncThunk("file/fetch", async (): Promise<IResponse> => {
  try {
    let token = decodeURIComponent(document.cookie);
    const token1 = token.substring(6);
    const { data } = await axios.get(url + "fetchfiles", { headers: { 'authorization': `Bearer ${token1}` } });

    if (data.message === "successful")
      return { isFetched: true, message: "successful", data: data.files };
    else if (data.message === "Failed")
      return { isFetched: false, message: "Failed to fetch", data: [] };
    else
      return { isFetched: false, message: "Failed to fetch", data: [] };
  } catch (err) {
    console.log(err);
    return {
      isFetched: false, message: "Failed to fetch", data: []
    };
  }
});

export const create = createAsyncThunk("file/create", async (fileName: string): Promise<IResponse> => {
  try {
    let token = decodeURIComponent(document.cookie);
    const token1 = token.substring(6);
    const { data } = await axios.post(url + "createfile", { fileName: fileName }, { headers: { 'authorization': `Bearer ${token1}` } });

    if (data.message === "successful")
      return { data: [data.file], isFetched: true, message: "successful" };
    else if (data.message === "Failed")
      return { data: [], isFetched: false, message: "Failed to fetch" };
    else
      return { isFetched: false, message: "Failed to fetch", data: [] };
  } catch (err) {
    console.log(err);
    return {
      isFetched: false, message: "Failed to fetch", data: []
    };
  }
});
