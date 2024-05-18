import React from "react";
import Editor from "../components/editor";
import { useAppSelector } from "../store";
import { getUser } from "../reducers/user";
import { Delta } from "quill/core";
import { Manager } from "socket.io-client";
import File from "../components/file";


export interface IOperation {
  insert?: string,
  delete?: string
}


export interface IOps {
  ops: IOperation[]
}


export default function Home() {

  const user = useAppSelector(getUser);
  const [fileLoaded, setFileLoaded] = React.useState<string>('');
  const [filename, setFilename] = React.useState<string>('');

  const manager = new Manager("http://localhost:3000", {
    autoConnect: false,
    query: { 'myusername_key': user.email },
  });
  const socket = manager.socket("/");

  React.useEffect(() => {
    console.log("hello");

    socket.connect();
    return () => {
      socket.disconnect();
    }
  });

  const message = (delta: Delta) => {
    socket.emit('message', { ...delta, user: user.email });
  }

  const createFile = (name: string) => {

    console.log("here");
    
    socket.emit('createFile', { fileName: name, user: user.email });
  }

  
  const handleClick = () => {
    
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.value);
  };


  return (
    <div>
      <h1>Editor team</h1>
      <p>enter the file to open</p>
      <input value={filename} onChange={handleChange} required />
      <button onClick={handleClick}>Open File</button>
      <File createFile={createFile} />
      <Editor user={user.email} message={message} />
    </div>
  );
}
