import React from "react";
import { Delta } from "quill/core";
import { Manager } from "socket.io-client";
import Editor from "../components/editor";
import { useAppSelector } from "../store";
import { getUser } from "../reducers/user";
import EditorSocket from "../components/editorSocket";


export default function EditorHome() {

  const user = useAppSelector(getUser);
  const manager = new Manager("http://localhost:3000", {
    autoConnect: false,
    query: { 'myusername_key': user.email },
  });
  const socket = manager.socket("/");
  const [ops, setOps] = React.useState<Delta>();


  React.useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    }
  }, []);

  const sendop={}

  const [fileLoaded, setFileLoaded] = React.useState<boolean>(false);
  const [filename, setFilename] = React.useState<string>('test');


  const message = (delta: Delta) => {
    socket.emit('message', { delta, user: user.email, filename: filename });
    // console.log('it fired');
  }

  const createFile = (name: string) => {
    // console.log("here");
    socket.emit('createFile', { fileName: name, user: user.email });
  }


  const handleClick = () => {
    socket.emit('check', { i: 'did' })

  };

  const handleClick1=()=>{
    socket.disconnect();
  }

  const handleClick2=()=>{
    socket.connect();
  }


  const handleChange = () => {
    setFileLoaded((prev) => {
      return !prev;
    })
  };


  return (
    <div style={{ marginLeft: '10px' }}>
      <h1>Editor team</h1>
      <EditorSocket user={user.email} socket={socket} filename={filename} />
      <button onClick={handleClick}>message</button>
      <button onClick={handleClick1}>disconnect</button>
      <button onClick={handleClick2}>connect</button>
    </div>
  );
}
