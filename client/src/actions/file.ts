import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Interface } from "readline";
import { IFile } from "../reducers/file";
// const url = "https://ecommsidd.onrender.com/auth/";
const url = "http://localhost:3000/auth/";


export const fetch = createAsyncThunk("user/signup", async (file: IFile): Promise<IFile> => {
  try {
    const { data } = await axios.post(url + "signup", file);
    if (data === "successful")
      return { isFetched: true, name: data?.name, message: "successfil", content: data.content };
    else if (data === "Failed")
      return { isFetched: false, name: "", message: "Failed to fetch", content: "" };
    else
      return { isFetched: false, name: "", message: "Failed to fetch", content: "" };
  } catch (err) {
    console.log(err);
    return {
      isFetched: false, name: "", message: "Failed to fetch", content: ""
    };
  }
});
