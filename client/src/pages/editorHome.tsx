import React from "react";
import { Manager } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../store";
import { getUser } from "../reducers/user";
import EditorSocket from "../components/editorSocket";
import { Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { getFiles } from "../reducers/fileList";
import { Navbar } from "../components/partials/Navbar";
import { IFile } from "../reducers/file";
import { getFile } from "../reducers/file";
import { fetchFile } from "../actions/file";


const url = import.meta.env.VITE_URL;

export default function EditorHome() {

  const [file, setFile] = React.useState<IFile>({
    content: "",
    name: "",
    updatedAt: new Date(),
    createdAt: new Date(),
    id: 0,
    author: []
  });

  const user = useAppSelector(getUser);
  const File = useAppSelector(getFile);
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const manager = new Manager(url, {
    autoConnect: false,
    query: { 'myusername_key': user.email },
  });
  const socket = manager.socket("/");

  React.useEffect(() => {
    socket.connect();
    dispatch(fetchFile(parseInt(id)));

    return () => {
      socket.close();
      // console.log('disconnected');
    }
  }, []);

  // const sendop = {}

  // const [fileLoaded, setFileLoaded] = React.useState<boolean>(false);
  // const [filename, setFilename] = React.useState<string>('test');

  // const createFile = (name: string) => {
  //   // console.log("here");
  //   socket.emit('createFile', { fileName: name, user: user.email });
  // }


  // const handleClick = () => {
  //   socket.emit('check', { i: 'did' })

  // };

  // const handleClick1 = () => {
  //   socket.disconnect();
  // }

  // const handleClick2 = () => {
  //   socket.connect();
  // }


  // const handleChange = () => {
  //   setFileLoaded((prev) => {
  //     return !prev;
  //   })
  // };


  return (
    <div style={{ backgroundColor: '#dad7d7', height: '100%' }}>
      <Navbar name={File?File.name:""} />
      <EditorSocket user={user.email} socket={socket} filename={'filename'} />
    </div>
    // <div style={{ marginLeft: '10px' }}>
    //   <h1>Editor team</h1>
    //   
    //   <button onClick={handleClick}>message</button>
    //   <button onClick={handleClick1}>disconnect</button>
    //   <button onClick={handleClick2}>connect</button>
    // </div>
  );
}
