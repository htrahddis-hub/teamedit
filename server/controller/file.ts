import FileModel, { IFile } from "../model/fileModel";
import UserModel from "../model/userModel";
import { MiddlewareOptions } from "mongoose";


export async function createFileSocket(filename: string, user: string): Promise<string> {
  try {
    const User = await UserModel.findOne({ email: user });
    if (User) {
      const file: IFile = { content: "", name: filename, authors: [] }
      file.authors.push(User._id);
      const File = (await FileModel.create(file));
      if (File) {
        User.file?.push(File._id);
        User.save();
        return JSON.stringify({ filename: File.name, message: "successful" });
      }
    }
    return JSON.stringify({ filename: "", message: "failure" });
  }
  catch (err) {
    console.log(err);
    
    return JSON.stringify({ email: "", message: "failure" });
  }
}

export async function fetchFiles(email:string):Promise<IFile[]> {
  try{
    const User = await UserModel.findOne({ email: email });
    User?.populate('file');
    console.log(User?.file);
    if(User?.file)
      return User.file;
    else
      return 
  } catch(err){
    console.log(err);
    
  }
}