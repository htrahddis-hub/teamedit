import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IAuthenication } from "../../../client/src/reducers/user";


const url = import.meta.env.VITE_URL;


export interface IUser {
  email: string;
  password: string;
  token?: string;
  Lname?: string;
  Fname?: string;
  confirmpassword?: string;
}

export const signup = createAsyncThunk("user/signup", async (user: IUser): Promise<IAuthenication> => {
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

export const login = createAsyncThunk("user/login", async (user: IUser): Promise<IAuthenication> => {
  try {
    const { data } = await axios.post(url + "login", user);
    if (data.message == "successful") {
      const token = data.token;
      const d = new Date();
      d.setTime(d.getTime() + 20 * 24 * 60 * 60 * 1000);
      const expires = "expires=" + d.toUTCString();
      document.cookie = `token=${token}; ${expires}; path=/;`;
      return { isSignedin: false, email: user.email, message: "Successsful", auth: true };
    }
    else {
      return { isSignedin: false, email: user.email, message: "Invalid Email or password", auth: false };
    }
  } catch (err) {
    return { isSignedin: false, email: user.email, message: "wrong Email or password", auth: false };
  }
});

export const authorize = createAsyncThunk("user/authorize", async () => {
  try {
    const token = decodeURIComponent(document.cookie);
    const token1 = token.substring(6);
    const { data } = await axios.post(url + "verify", {}, { headers: { 'authorization': `Bearer ${token1}` } });
  
    if (data.message === "successful") {
      return { isSignedin: false, email: data.email, message: "Successful", auth: true };
    }
    else {
      return { isSignedin: false, email: "", message: "Failure", auth: false };
    }

  } catch (err) {
    return { isSignedin: false, email: "", message: "Failure", auth: false };
  }
});

// export const forgotPassword = createAsyncThunk(
//   "user/forgotPassword",
//   async (user) => {
//     try {
//       const data = await axios.post(url + "fpwd", user);
//       return { auth: false, message: data.data.message, otpSend: true };
//     } catch (err) {
//       return { auth: false, message: err.response.data.message, otpSend: false };
//     }
//   }
// );

// export const resetPassword = createAsyncThunk(
//   "user/resetPassword",
//   async (user) => {
//     try {
//       const data = await axios.post(url + "rpwd", user);
//       return { auth: true, message: data.data.message, isReset: true };
//     } catch (err) {
//       return { auth: true, message: err.response.data.message, isReset: false };
//     }
//   }
// );

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return { isSignedin: false, email: "", message: "Logged out", auth: false };
  } catch (err) {
    console.log(err);
    return { isSignedin: false, email: "", message: "Error", auth: true }
  }
});