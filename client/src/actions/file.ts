import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Interface } from "readline";
import { IFile } from "../reducers/file";
// const url = "https://ecommsidd.onrender.com/auth/";
const url = "http://localhost:3000/auth/";

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
      return { isFetched: true, message: "successfil", data: data.files };
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
