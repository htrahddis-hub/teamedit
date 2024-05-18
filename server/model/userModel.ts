import mongoose, { Model } from "mongoose";
import { Types } from 'mongoose';
import { IFile } from "./fileModel";

export interface IUser {
  email:string;
  password:string;
  Fname:string;
  Lname:string;
  token?:string;
  file?:Types.ObjectId[]|IFile[];
}

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  Fname: {
    type: String,
    required: true
  },
  Lname: {
    type: String,
    required: true
  },
  token: {
    type: String
  },
  file: [{ type : Types.ObjectId, ref: 'file' }],
  
});

const UserModel = mongoose.model<IUser>('user', UserSchema);

export default UserModel;