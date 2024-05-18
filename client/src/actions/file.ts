import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Interface } from "readline";
import { IAuthenication } from "../reducers/user";
// const url = "https://ecommsidd.onrender.com/auth/";
const url = "http://localhost:3000/auth/";

export interface IFile {
  email: string;
  password: string;
  token?: string;
  Lname?: string;
  Fname?: string;
  confirmpassword?: string;
}

export const fetch = createAsyncThunk("user/signup", async (user: IFile): Promise<IAuthenication> => {
  try {
    const { data } = await axios.post(url + "signup", user);
    if (data === "successful")
      return { isSignedin: true, email: user.email, message: "successfil", auth: false };
    else if (data === "User Already exist")
      return { isSignedin: false, email: user.email, message: "This E-mail id is already registered", auth: false };
    else
      return { isSignedin: false, email: user.email, message: "Invalid Email or password", auth: false };
  } catch (err) {
    console.log(err);
    return {
      isSignedin: false,
      email: user.email,
      message: "Error",
      auth: false
    };
  }
});
