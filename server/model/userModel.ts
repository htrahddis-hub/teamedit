import mongoose, { Model } from "mongoose";

interface IUser {
    email:string;
    password:string;
    Fname:string;
    Lname:string;
    token?:string;
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
  }
});

const UserModel = mongoose.model<IUser>('user', UserSchema);

export default UserModel;