import mongoose from "mongoose";
import { Types } from 'mongoose';
import { IUser } from "./userModel";

export interface IFile {
  content: string;
  name: string;
  authors: Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<IFile>({

  content: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  authors: {
    type: [{ type: Types.ObjectId, ref: 'user', required: true }]
  }
});

const FileModel = mongoose.model<IFile>('file', UserSchema);

export default FileModel;